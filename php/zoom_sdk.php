<?php
declare(strict_types=1);

// Zoom SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class ZoomSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new ZoomUtility();
        $this->_utility = $utility;

        $config = ZoomConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = ZoomHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = ZoomHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!ZoomFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, ZoomFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return ZoomUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = ZoomHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = ZoomHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = ZoomHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new ZoomSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new ZoomError($op . "_allow",
                "ZoomSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = ZoomHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = ZoomHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new ZoomError("graphql_error",
                "ZoomSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_account = null;

    // Canonical facade: $client->Account()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->account()
    // resolves here too.
    public function Account($data = null)
    {
        require_once __DIR__ . '/entity/account_entity.php';
        if ($data === null) {
            if ($this->_account === null) {
                $this->_account = new AccountEntity($this, null);
            }
            return $this->_account;
        }
        return new AccountEntity($this, $data);
    }


    private $_account_plan = null;

    // Canonical facade: $client->AccountPlan()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->account_plan()
    // resolves here too.
    public function AccountPlan($data = null)
    {
        require_once __DIR__ . '/entity/account_plan_entity.php';
        if ($data === null) {
            if ($this->_account_plan === null) {
                $this->_account_plan = new AccountPlanEntity($this, null);
            }
            return $this->_account_plan;
        }
        return new AccountPlanEntity($this, $data);
    }


    private $_account_setting = null;

    // Canonical facade: $client->AccountSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->account_setting()
    // resolves here too.
    public function AccountSetting($data = null)
    {
        require_once __DIR__ . '/entity/account_setting_entity.php';
        if ($data === null) {
            if ($this->_account_setting === null) {
                $this->_account_setting = new AccountSettingEntity($this, null);
            }
            return $this->_account_setting;
        }
        return new AccountSettingEntity($this, $data);
    }


    private $_billing = null;

    // Canonical facade: $client->Billing()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->billing()
    // resolves here too.
    public function Billing($data = null)
    {
        require_once __DIR__ . '/entity/billing_entity.php';
        if ($data === null) {
            if ($this->_billing === null) {
                $this->_billing = new BillingEntity($this, null);
            }
            return $this->_billing;
        }
        return new BillingEntity($this, $data);
    }


    private $_cloud_recording = null;

    // Canonical facade: $client->CloudRecording()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cloud_recording()
    // resolves here too.
    public function CloudRecording($data = null)
    {
        require_once __DIR__ . '/entity/cloud_recording_entity.php';
        if ($data === null) {
            if ($this->_cloud_recording === null) {
                $this->_cloud_recording = new CloudRecordingEntity($this, null);
            }
            return $this->_cloud_recording;
        }
        return new CloudRecordingEntity($this, $data);
    }


    private $_dashboard = null;

    // Canonical facade: $client->Dashboard()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->dashboard()
    // resolves here too.
    public function Dashboard($data = null)
    {
        require_once __DIR__ . '/entity/dashboard_entity.php';
        if ($data === null) {
            if ($this->_dashboard === null) {
                $this->_dashboard = new DashboardEntity($this, null);
            }
            return $this->_dashboard;
        }
        return new DashboardEntity($this, $data);
    }


    private $_device = null;

    // Canonical facade: $client->Device()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->device()
    // resolves here too.
    public function Device($data = null)
    {
        require_once __DIR__ . '/entity/device_entity.php';
        if ($data === null) {
            if ($this->_device === null) {
                $this->_device = new DeviceEntity($this, null);
            }
            return $this->_device;
        }
        return new DeviceEntity($this, $data);
    }


    private $_domains_list = null;

    // Canonical facade: $client->DomainsList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domains_list()
    // resolves here too.
    public function DomainsList($data = null)
    {
        require_once __DIR__ . '/entity/domains_list_entity.php';
        if ($data === null) {
            if ($this->_domains_list === null) {
                $this->_domains_list = new DomainsListEntity($this, null);
            }
            return $this->_domains_list;
        }
        return new DomainsListEntity($this, $data);
    }


    private $_group = null;

    // Canonical facade: $client->Group()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->group()
    // resolves here too.
    public function Group($data = null)
    {
        require_once __DIR__ . '/entity/group_entity.php';
        if ($data === null) {
            if ($this->_group === null) {
                $this->_group = new GroupEntity($this, null);
            }
            return $this->_group;
        }
        return new GroupEntity($this, $data);
    }


    private $_group_member_list = null;

    // Canonical facade: $client->GroupMemberList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->group_member_list()
    // resolves here too.
    public function GroupMemberList($data = null)
    {
        require_once __DIR__ . '/entity/group_member_list_entity.php';
        if ($data === null) {
            if ($this->_group_member_list === null) {
                $this->_group_member_list = new GroupMemberListEntity($this, null);
            }
            return $this->_group_member_list;
        }
        return new GroupMemberListEntity($this, $data);
    }


    private $_im_chat = null;

    // Canonical facade: $client->ImChat()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->im_chat()
    // resolves here too.
    public function ImChat($data = null)
    {
        require_once __DIR__ . '/entity/im_chat_entity.php';
        if ($data === null) {
            if ($this->_im_chat === null) {
                $this->_im_chat = new ImChatEntity($this, null);
            }
            return $this->_im_chat;
        }
        return new ImChatEntity($this, $data);
    }


    private $_im_group = null;

    // Canonical facade: $client->ImGroup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->im_group()
    // resolves here too.
    public function ImGroup($data = null)
    {
        require_once __DIR__ . '/entity/im_group_entity.php';
        if ($data === null) {
            if ($this->_im_group === null) {
                $this->_im_group = new ImGroupEntity($this, null);
            }
            return $this->_im_group;
        }
        return new ImGroupEntity($this, $data);
    }


    private $_im_group_list = null;

    // Canonical facade: $client->ImGroupList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->im_group_list()
    // resolves here too.
    public function ImGroupList($data = null)
    {
        require_once __DIR__ . '/entity/im_group_list_entity.php';
        if ($data === null) {
            if ($this->_im_group_list === null) {
                $this->_im_group_list = new ImGroupListEntity($this, null);
            }
            return $this->_im_group_list;
        }
        return new ImGroupListEntity($this, $data);
    }


    private $_meeting = null;

    // Canonical facade: $client->Meeting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->meeting()
    // resolves here too.
    public function Meeting($data = null)
    {
        require_once __DIR__ . '/entity/meeting_entity.php';
        if ($data === null) {
            if ($this->_meeting === null) {
                $this->_meeting = new MeetingEntity($this, null);
            }
            return $this->_meeting;
        }
        return new MeetingEntity($this, $data);
    }


    private $_meeting_instance = null;

    // Canonical facade: $client->MeetingInstance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->meeting_instance()
    // resolves here too.
    public function MeetingInstance($data = null)
    {
        require_once __DIR__ . '/entity/meeting_instance_entity.php';
        if ($data === null) {
            if ($this->_meeting_instance === null) {
                $this->_meeting_instance = new MeetingInstanceEntity($this, null);
            }
            return $this->_meeting_instance;
        }
        return new MeetingInstanceEntity($this, $data);
    }


    private $_meeting_invitation = null;

    // Canonical facade: $client->MeetingInvitation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->meeting_invitation()
    // resolves here too.
    public function MeetingInvitation($data = null)
    {
        require_once __DIR__ . '/entity/meeting_invitation_entity.php';
        if ($data === null) {
            if ($this->_meeting_invitation === null) {
                $this->_meeting_invitation = new MeetingInvitationEntity($this, null);
            }
            return $this->_meeting_invitation;
        }
        return new MeetingInvitationEntity($this, $data);
    }


    private $_meeting_registrant_list = null;

    // Canonical facade: $client->MeetingRegistrantList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->meeting_registrant_list()
    // resolves here too.
    public function MeetingRegistrantList($data = null)
    {
        require_once __DIR__ . '/entity/meeting_registrant_list_entity.php';
        if ($data === null) {
            if ($this->_meeting_registrant_list === null) {
                $this->_meeting_registrant_list = new MeetingRegistrantListEntity($this, null);
            }
            return $this->_meeting_registrant_list;
        }
        return new MeetingRegistrantListEntity($this, $data);
    }


    private $_pac = null;

    // Canonical facade: $client->Pac()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pac()
    // resolves here too.
    public function Pac($data = null)
    {
        require_once __DIR__ . '/entity/pac_entity.php';
        if ($data === null) {
            if ($this->_pac === null) {
                $this->_pac = new PacEntity($this, null);
            }
            return $this->_pac;
        }
        return new PacEntity($this, $data);
    }


    private $_poll = null;

    // Canonical facade: $client->Poll()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->poll()
    // resolves here too.
    public function Poll($data = null)
    {
        require_once __DIR__ . '/entity/poll_entity.php';
        if ($data === null) {
            if ($this->_poll === null) {
                $this->_poll = new PollEntity($this, null);
            }
            return $this->_poll;
        }
        return new PollEntity($this, $data);
    }


    private $_qos = null;

    // Canonical facade: $client->Qos()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->qos()
    // resolves here too.
    public function Qos($data = null)
    {
        require_once __DIR__ . '/entity/qos_entity.php';
        if ($data === null) {
            if ($this->_qos === null) {
                $this->_qos = new QosEntity($this, null);
            }
            return $this->_qos;
        }
        return new QosEntity($this, $data);
    }


    private $_recording = null;

    // Canonical facade: $client->Recording()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->recording()
    // resolves here too.
    public function Recording($data = null)
    {
        require_once __DIR__ . '/entity/recording_entity.php';
        if ($data === null) {
            if ($this->_recording === null) {
                $this->_recording = new RecordingEntity($this, null);
            }
            return $this->_recording;
        }
        return new RecordingEntity($this, $data);
    }


    private $_recording_setting = null;

    // Canonical facade: $client->RecordingSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->recording_setting()
    // resolves here too.
    public function RecordingSetting($data = null)
    {
        require_once __DIR__ . '/entity/recording_setting_entity.php';
        if ($data === null) {
            if ($this->_recording_setting === null) {
                $this->_recording_setting = new RecordingSettingEntity($this, null);
            }
            return $this->_recording_setting;
        }
        return new RecordingSettingEntity($this, $data);
    }


    private $_report = null;

    // Canonical facade: $client->Report()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->report()
    // resolves here too.
    public function Report($data = null)
    {
        require_once __DIR__ . '/entity/report_entity.php';
        if ($data === null) {
            if ($this->_report === null) {
                $this->_report = new ReportEntity($this, null);
            }
            return $this->_report;
        }
        return new ReportEntity($this, $data);
    }


    private $_tracking_field = null;

    // Canonical facade: $client->TrackingField()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->tracking_field()
    // resolves here too.
    public function TrackingField($data = null)
    {
        require_once __DIR__ . '/entity/tracking_field_entity.php';
        if ($data === null) {
            if ($this->_tracking_field === null) {
                $this->_tracking_field = new TrackingFieldEntity($this, null);
            }
            return $this->_tracking_field;
        }
        return new TrackingFieldEntity($this, $data);
    }


    private $_tsp = null;

    // Canonical facade: $client->Tsp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->tsp()
    // resolves here too.
    public function Tsp($data = null)
    {
        require_once __DIR__ . '/entity/tsp_entity.php';
        if ($data === null) {
            if ($this->_tsp === null) {
                $this->_tsp = new TspEntity($this, null);
            }
            return $this->_tsp;
        }
        return new TspEntity($this, $data);
    }


    private $_user = null;

    // Canonical facade: $client->User()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user()
    // resolves here too.
    public function User($data = null)
    {
        require_once __DIR__ . '/entity/user_entity.php';
        if ($data === null) {
            if ($this->_user === null) {
                $this->_user = new UserEntity($this, null);
            }
            return $this->_user;
        }
        return new UserEntity($this, $data);
    }


    private $_user_assistants_list = null;

    // Canonical facade: $client->UserAssistantsList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_assistants_list()
    // resolves here too.
    public function UserAssistantsList($data = null)
    {
        require_once __DIR__ . '/entity/user_assistants_list_entity.php';
        if ($data === null) {
            if ($this->_user_assistants_list === null) {
                $this->_user_assistants_list = new UserAssistantsListEntity($this, null);
            }
            return $this->_user_assistants_list;
        }
        return new UserAssistantsListEntity($this, $data);
    }


    private $_user_permission = null;

    // Canonical facade: $client->UserPermission()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_permission()
    // resolves here too.
    public function UserPermission($data = null)
    {
        require_once __DIR__ . '/entity/user_permission_entity.php';
        if ($data === null) {
            if ($this->_user_permission === null) {
                $this->_user_permission = new UserPermissionEntity($this, null);
            }
            return $this->_user_permission;
        }
        return new UserPermissionEntity($this, $data);
    }


    private $_user_schedulers_list = null;

    // Canonical facade: $client->UserSchedulersList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_schedulers_list()
    // resolves here too.
    public function UserSchedulersList($data = null)
    {
        require_once __DIR__ . '/entity/user_schedulers_list_entity.php';
        if ($data === null) {
            if ($this->_user_schedulers_list === null) {
                $this->_user_schedulers_list = new UserSchedulersListEntity($this, null);
            }
            return $this->_user_schedulers_list;
        }
        return new UserSchedulersListEntity($this, $data);
    }


    private $_user_setting = null;

    // Canonical facade: $client->UserSetting()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_setting()
    // resolves here too.
    public function UserSetting($data = null)
    {
        require_once __DIR__ . '/entity/user_setting_entity.php';
        if ($data === null) {
            if ($this->_user_setting === null) {
                $this->_user_setting = new UserSettingEntity($this, null);
            }
            return $this->_user_setting;
        }
        return new UserSettingEntity($this, $data);
    }


    private $_webhook = null;

    // Canonical facade: $client->Webhook()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webhook()
    // resolves here too.
    public function Webhook($data = null)
    {
        require_once __DIR__ . '/entity/webhook_entity.php';
        if ($data === null) {
            if ($this->_webhook === null) {
                $this->_webhook = new WebhookEntity($this, null);
            }
            return $this->_webhook;
        }
        return new WebhookEntity($this, $data);
    }


    private $_webinar = null;

    // Canonical facade: $client->Webinar()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webinar()
    // resolves here too.
    public function Webinar($data = null)
    {
        require_once __DIR__ . '/entity/webinar_entity.php';
        if ($data === null) {
            if ($this->_webinar === null) {
                $this->_webinar = new WebinarEntity($this, null);
            }
            return $this->_webinar;
        }
        return new WebinarEntity($this, $data);
    }


    private $_webinar_instance = null;

    // Canonical facade: $client->WebinarInstance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webinar_instance()
    // resolves here too.
    public function WebinarInstance($data = null)
    {
        require_once __DIR__ . '/entity/webinar_instance_entity.php';
        if ($data === null) {
            if ($this->_webinar_instance === null) {
                $this->_webinar_instance = new WebinarInstanceEntity($this, null);
            }
            return $this->_webinar_instance;
        }
        return new WebinarInstanceEntity($this, $data);
    }


    private $_webinar_panelist_list = null;

    // Canonical facade: $client->WebinarPanelistList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webinar_panelist_list()
    // resolves here too.
    public function WebinarPanelistList($data = null)
    {
        require_once __DIR__ . '/entity/webinar_panelist_list_entity.php';
        if ($data === null) {
            if ($this->_webinar_panelist_list === null) {
                $this->_webinar_panelist_list = new WebinarPanelistListEntity($this, null);
            }
            return $this->_webinar_panelist_list;
        }
        return new WebinarPanelistListEntity($this, $data);
    }


    private $_webinar_registrant_list = null;

    // Canonical facade: $client->WebinarRegistrantList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webinar_registrant_list()
    // resolves here too.
    public function WebinarRegistrantList($data = null)
    {
        require_once __DIR__ . '/entity/webinar_registrant_list_entity.php';
        if ($data === null) {
            if ($this->_webinar_registrant_list === null) {
                $this->_webinar_registrant_list = new WebinarRegistrantListEntity($this, null);
            }
            return $this->_webinar_registrant_list;
        }
        return new WebinarRegistrantListEntity($this, $data);
    }


    private $_zoom_room_list = null;

    // Canonical facade: $client->ZoomRoomList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->zoom_room_list()
    // resolves here too.
    public function ZoomRoomList($data = null)
    {
        require_once __DIR__ . '/entity/zoom_room_list_entity.php';
        if ($data === null) {
            if ($this->_zoom_room_list === null) {
                $this->_zoom_room_list = new ZoomRoomListEntity($this, null);
            }
            return $this->_zoom_room_list;
        }
        return new ZoomRoomListEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new ZoomSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
