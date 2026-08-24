<?php
declare(strict_types=1);

// Zoom SDK Meeting entity

require_once __DIR__ . '/../utility/struct/Struct.php';
require_once __DIR__ . '/../core/Helpers.php';

use Voxgig\Struct\Struct;

class MeetingEntity
{
    private string $_name;
    private $_client;
    private $_utility;
    private array $_entopts;
    private array $_data;
    private array $_match;
    private $_entctx;
    private bool $_deleted = false;

    public function __construct($client, ?array $entopts = null)
    {
        $entopts = $entopts ?? [];
        if (!isset($entopts["active"])) {
            $entopts["active"] = true;
        } elseif ($entopts["active"] === false) {
            // keep false
        } else {
            $entopts["active"] = true;
        }

        $this->_name = "meeting";
        $this->_client = $client;
        $this->_utility = $client->get_utility();
        $this->_entopts = $entopts;
        $this->_data = [];
        $this->_match = [];

        $this->_entctx = ($this->_utility->make_context)([
            "entity" => $this,
            "entopts" => $entopts,
        ], $client->get_root_ctx());

        ($this->_utility->feature_hook)($this->_entctx, "PostConstructEntity");
    }

    public function get_name(): string
    {
        return $this->_name;
    }

    /**
     * A `remove` marks the entity deleted. The instance KEEPS the data it
     * held — a caller can still read what was removed — but it is no longer a
     * live record. See AGENTS.md "Entity operations return ENTITIES".
     *
     * The remove path below already called markDeleted(); php was the one
     * target that never declared it (cpp and swift both do), so any SDK whose
     * entities have a `remove` op raised "Call to undefined method
     * <Entity>::markDeleted()" the first time a remove succeeded. Nothing
     * caught it because the fatal only fires when that path actually runs.
     */
    public function markDeleted(): void
    {
        $this->_deleted = true;
    }

    public function deleted(): bool
    {
        return $this->_deleted;
    }

    public function make(): self
    {
        $opts = $this->_entopts;
        return new MeetingEntity($this->_client, $opts);
    }

    /**
     * @param Meeting|array $args Meeting data (assoc-array) to store.
     */
    public function data_set($args): void
    {
        if ($args) {
            $this->_data = ZoomHelpers::to_map(Struct::clone($args)) ?? [];
            ($this->_utility->feature_hook)($this->_entctx, "SetData");
        }
    }

    /**
     * @return Meeting|array The current Meeting data as an assoc-array.
     */
    public function data_get()
    {
        ($this->_utility->feature_hook)($this->_entctx, "GetData");
        return Struct::clone($this->_data);
    }

    /**
     * @param array $args Match filter (any subset of Meeting fields).
     */
    public function match_set($args): void
    {
        if ($args) {
            $this->_match = ZoomHelpers::to_map(Struct::clone($args)) ?? [];
            ($this->_utility->feature_hook)($this->_entctx, "SetMatch");
        }
    }

    /**
     * @return array The current match filter (any subset of Meeting fields).
     */
    public function match_get()
    {
        ($this->_utility->feature_hook)($this->_entctx, "GetMatch");
        return Struct::clone($this->_match);
    }

    /**
     * Feature #4: run `action` through the full pipeline and yield result
     * items, so the `streaming` feature's incremental output is reachable from
     * a generated entity (a normal op call materialises the whole result).
     * `callopts` parameterises the call:
     *   - inbound (download): yield items/chunks (from the streaming feature
     *     when active, else the materialised items);
     *   - outbound (upload): an iterable `body` in callopts is attached to the
     *     request so the transport can stream the payload;
     *   - `ctrl` (pipeline control) and `signal` (cancellation) honoured.
     */
    public function stream(string $action, ?array $args = null, ?array $callopts = null): \Generator
    {
        $utility = $this->_utility;
        $callopts = $callopts ?? [];
        $signal = $callopts['signal'] ?? null;

        $ctrl = is_array($callopts['ctrl'] ?? null) ? $callopts['ctrl'] : [];
        $ctrl['stream'] = $callopts;

        $ctxmap = [
            "opname" => $action,
            "ctrl" => $ctrl,
            "match" => $this->_match,
            "data" => $this->_data,
        ];
        if (is_array($args)) {
            foreach ($args as $k => $v) {
                $ctxmap[$k] = $v;
            }
        }

        $ctx = ($utility->make_context)($ctxmap, $this->_entctx);

        // Outbound: expose the caller's iterable payload so the request builder
        // / transport can stream it as the request body.
        $body = $callopts['body'] ?? null;
        if ($body !== null) {
            $ctx->reqdata['body$'] = $body;
            $ctx->meta['stream_out'] = $body;
        }

        $aborted = function () use ($signal): bool {
            if ($signal === null) {
                return false;
            }
            if (is_callable($signal)) {
                return (bool)$signal();
            }
            if (is_object($signal) && isset($signal->aborted)) {
                return (bool)$signal->aborted;
            }
            return false;
        };

        ($utility->feature_hook)($ctx, "PrePoint");
        [$point, $err] = ($utility->make_point)($ctx);
        $ctx->out["point"] = $point;
        if ($err) {
            return;
        }

        ($utility->feature_hook)($ctx, "PreSpec");
        [$spec, $err] = ($utility->make_spec)($ctx);
        $ctx->out["spec"] = $spec;
        if ($err) {
            return;
        }

        ($utility->feature_hook)($ctx, "PreRequest");
        [$resp, $err] = ($utility->make_request)($ctx);
        $ctx->out["request"] = $resp;
        if ($err) {
            return;
        }

        ($utility->feature_hook)($ctx, "PreResponse");
        [$resp2, $err] = ($utility->make_response)($ctx);
        $ctx->out["response"] = $resp2;
        if ($err) {
            return;
        }

        ($utility->feature_hook)($ctx, "PreResult");
        [$result, $err] = ($utility->make_result)($ctx);
        $ctx->out["result"] = $result;
        if ($err) {
            return;
        }

        ($utility->feature_hook)($ctx, "PreDone");

        $result = $ctx->result;

        // Inbound: prefer the streaming feature's incremental generator; else
        // fall back to the materialised items so stream always yields.
        $streamfn = ($result !== null && isset($result->stream) && is_callable($result->stream))
            ? $result->stream : null;
        if ($streamfn !== null) {
            foreach ($streamfn() as $item) {
                if ($aborted()) {
                    return;
                }
                yield $item;
            }
            return;
        }

        $data = ($utility->done)($ctx);
        if (is_array($data) && array_is_list($data)) {
            $items = $data;
        } elseif ($data === null) {
            $items = [];
        } else {
            $items = [$data];
        }
        foreach ($items as $item) {
            if ($aborted()) {
                return;
            }
            yield $item;
        }
    }

    
    /**
     * Load a single Meeting.
     *
     * @param MeetingLoadMatch|array|null $reqmatch Match criteria (id/query
     *   fields) as an assoc-array; a typed MeetingLoadMatch names the shape.
     * @param mixed $ctrl Optional per-call control overrides.
     * @return Meeting|array The loaded Meeting as an assoc-array at the
     *   SDK boundary; throws ZoomError on failure (item-5 convention).
     */
    public function load(?array $reqmatch = null, $ctrl = null): mixed
    {
        $utility = $this->_utility;
        $ctx = ($utility->make_context)([
            "opname" => "load",
            "ctrl" => $ctrl,
            "match" => $this->_match,
            "data" => $this->_data,
            "reqmatch" => $reqmatch,
        ], $this->_entctx);

        return $this->_run_op($ctx, function () use ($ctx) {
            if ($ctx->result) {
                if ($ctx->result->resmatch) {
                    $this->_match = $ctx->result->resmatch;
                }
                if ($ctx->result->resdata) {
                    $this->_data = ZoomHelpers::to_map(Struct::clone($ctx->result->resdata)) ?? [];
                }
            }
        });
    }



    
    /**
     * List Meeting items matching the given filter.
     *
     * @param MeetingListMatch|array|null $reqmatch Match filter (any subset
     *   of Meeting fields) as an assoc-array; MeetingListMatch names the shape.
     * @param mixed $ctrl Optional per-call control overrides.
     * @return Meeting[]|array A list of Meeting items as assoc-arrays at
     *   the SDK boundary; throws ZoomError on failure (item-5 convention).
     */
    public function list(?array $reqmatch = null, $ctrl = null): mixed
    {
        $utility = $this->_utility;
        $ctx = ($utility->make_context)([
            "opname" => "list",
            "ctrl" => $ctrl,
            "match" => $this->_match,
            "data" => $this->_data,
            "reqmatch" => $reqmatch,
        ], $this->_entctx);

        return $this->_run_op($ctx, function () use ($ctx) {
            if ($ctx->result) {
                if ($ctx->result->resmatch) {
                    $this->_match = $ctx->result->resmatch;
                }
            }
        });
    }



    
    /**
     * Create a new Meeting.
     *
     * @param MeetingCreateData|array|null $reqdata Body data as an assoc-array;
     *   a typed MeetingCreateData names the shape.
     * @param mixed $ctrl Optional per-call control overrides.
     * @return Meeting|array The created Meeting as an assoc-array at the
     *   SDK boundary; throws ZoomError on failure (item-5 convention).
     */
    public function create(?array $reqdata = null, $ctrl = null): mixed
    {
        $utility = $this->_utility;
        $ctx = ($utility->make_context)([
            "opname" => "create",
            "ctrl" => $ctrl,
            "match" => $this->_match,
            "data" => $this->_data,
            "reqdata" => $reqdata,
        ], $this->_entctx);

        return $this->_run_op($ctx, function () use ($ctx) {
            if ($ctx->result) {
                if ($ctx->result->resdata) {
                    $this->_data = ZoomHelpers::to_map(Struct::clone($ctx->result->resdata)) ?? [];
                }
            }
        });
    }



    
    /**
     * Update an existing Meeting.
     *
     * @param MeetingUpdateData|array|null $reqdata Body data as an assoc-array;
     *   a typed MeetingUpdateData names the shape.
     * @param mixed $ctrl Optional per-call control overrides.
     * @return Meeting|array The updated Meeting as an assoc-array at the
     *   SDK boundary; throws ZoomError on failure (item-5 convention).
     */
    public function update(?array $reqdata = null, $ctrl = null): mixed
    {
        $utility = $this->_utility;
        $ctx = ($utility->make_context)([
            "opname" => "update",
            "ctrl" => $ctrl,
            "match" => $this->_match,
            "data" => $this->_data,
            "reqdata" => $reqdata,
        ], $this->_entctx);

        return $this->_run_op($ctx, function () use ($ctx) {
            if ($ctx->result) {
                if ($ctx->result->resmatch) {
                    $this->_match = $ctx->result->resmatch;
                }
                if ($ctx->result->resdata) {
                    $this->_data = ZoomHelpers::to_map(Struct::clone($ctx->result->resdata)) ?? [];
                }
            }
        });
    }



    
    /**
     * Remove an Meeting matching the given criteria.
     *
     * @param MeetingRemoveMatch|array|null $reqmatch Match criteria (id/query
     *   fields) as an assoc-array; MeetingRemoveMatch names the shape.
     * @param mixed $ctrl Optional per-call control overrides.
     * @return Meeting|array The removed Meeting as an assoc-array at the
     *   SDK boundary; throws ZoomError on failure (item-5 convention).
     */
    public function remove(?array $reqmatch = null, $ctrl = null): mixed
    {
        $utility = $this->_utility;
        $ctx = ($utility->make_context)([
            "opname" => "remove",
            "ctrl" => $ctrl,
            "match" => $this->_match,
            "data" => $this->_data,
            "reqmatch" => $reqmatch,
        ], $this->_entctx);

        return $this->_run_op($ctx, function () use ($ctx) {
            if ($ctx->result) {
                if ($ctx->result->resmatch) {
                    $this->_match = $ctx->result->resmatch;
                }
                if ($ctx->result->resdata) {
                    $this->_data = ZoomHelpers::to_map(Struct::clone($ctx->result->resdata)) ?? [];
                }
            }
        });
    }



    private function _run_op($ctx, callable $post_done): mixed
    {
        $utility = $this->_utility;

        ($utility->feature_hook)($ctx, "PrePoint");
        [$point, $err] = ($utility->make_point)($ctx);
        $ctx->out["point"] = $point;
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        ($utility->feature_hook)($ctx, "PreSpec");
        [$spec, $err] = ($utility->make_spec)($ctx);
        $ctx->out["spec"] = $spec;
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        ($utility->feature_hook)($ctx, "PreRequest");
        [$resp, $err] = ($utility->make_request)($ctx);
        $ctx->out["request"] = $resp;
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        ($utility->feature_hook)($ctx, "PreResponse");
        [$resp2, $err] = ($utility->make_response)($ctx);
        $ctx->out["response"] = $resp2;
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        ($utility->feature_hook)($ctx, "PreResult");
        [$result, $err] = ($utility->make_result)($ctx);
        $ctx->out["result"] = $result;
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        ($utility->feature_hook)($ctx, "PreDone");
        $post_done();

        $out = ($utility->done)($ctx);

        // An operation resolves to the ENTITY, not the raw data. Entities are
        // stateful: post_done has just absorbed resdata/resmatch into this
        // instance, and the caller reaches the record through data(). Two
        // structural exceptions: `list` resolves to the ARRAY of entity
        // instances make_result built, and a failed op with throwing disabled
        // hands back the error payload unchanged. `remove` additionally marks
        // the entity deleted; it KEEPS its data, so a caller can still read
        // what was removed. See AGENTS.md "Entity operations return ENTITIES".
        $opname = $ctx->op === null ? null : $ctx->op->name;

        if ($ctx->result !== null && $ctx->result->ok && $opname !== 'list') {
            if ($opname === 'remove') {
                $this->markDeleted();
            }
            return $this;
        }

        return $out;
    }
}
