package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAccountEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewAccountPlanEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewAccountSettingEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewBillingEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewCloudRecordingEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewDashboardEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewDeviceEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewDomainsListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewGroupEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewGroupMemberListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewImChatEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewImGroupEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewImGroupListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewMeetingEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewMeetingInstanceEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewMeetingInvitationEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewMeetingRegistrantListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewPacEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewPollEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewQosEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewRecordingEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewRecordingSettingEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewReportEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewTrackingFieldEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewTspEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewUserEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewUserAssistantsListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewUserPermissionEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewUserSchedulersListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewUserSettingEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewWebhookEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewWebinarEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewWebinarInstanceEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewWebinarPanelistListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewWebinarRegistrantListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

var NewZoomRoomListEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

