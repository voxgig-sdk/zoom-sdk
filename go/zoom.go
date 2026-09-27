package voxgigzoomsdk

import (
	"github.com/voxgig-sdk/zoom-sdk/go/core"
	"github.com/voxgig-sdk/zoom-sdk/go/entity"
	"github.com/voxgig-sdk/zoom-sdk/go/feature"
	_ "github.com/voxgig-sdk/zoom-sdk/go/utility"
)

// Type aliases preserve external API.
type ZoomSDK = core.ZoomSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ZoomEntity = core.ZoomEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ZoomError = core.ZoomError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAccountEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewAccountEntity(client, entopts)
	}
	core.NewAccountPlanEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewAccountPlanEntity(client, entopts)
	}
	core.NewAccountSettingEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewAccountSettingEntity(client, entopts)
	}
	core.NewBillingEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewBillingEntity(client, entopts)
	}
	core.NewCloudRecordingEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewCloudRecordingEntity(client, entopts)
	}
	core.NewDashboardEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewDashboardEntity(client, entopts)
	}
	core.NewDeviceEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewDeviceEntity(client, entopts)
	}
	core.NewDomainsListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewDomainsListEntity(client, entopts)
	}
	core.NewGroupEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewGroupEntity(client, entopts)
	}
	core.NewGroupMemberListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewGroupMemberListEntity(client, entopts)
	}
	core.NewImChatEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewImChatEntity(client, entopts)
	}
	core.NewImGroupEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewImGroupEntity(client, entopts)
	}
	core.NewImGroupListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewImGroupListEntity(client, entopts)
	}
	core.NewMeetingEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewMeetingEntity(client, entopts)
	}
	core.NewMeetingInstanceEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewMeetingInstanceEntity(client, entopts)
	}
	core.NewMeetingInvitationEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewMeetingInvitationEntity(client, entopts)
	}
	core.NewMeetingRegistrantListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewMeetingRegistrantListEntity(client, entopts)
	}
	core.NewPacEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewPacEntity(client, entopts)
	}
	core.NewPollEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewPollEntity(client, entopts)
	}
	core.NewQosEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewQosEntity(client, entopts)
	}
	core.NewRecordingEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewRecordingEntity(client, entopts)
	}
	core.NewRecordingSettingEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewRecordingSettingEntity(client, entopts)
	}
	core.NewReportEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewReportEntity(client, entopts)
	}
	core.NewTrackingFieldEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewTrackingFieldEntity(client, entopts)
	}
	core.NewTspEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewTspEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewUserEntity(client, entopts)
	}
	core.NewUserAssistantsListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewUserAssistantsListEntity(client, entopts)
	}
	core.NewUserPermissionEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewUserPermissionEntity(client, entopts)
	}
	core.NewUserSchedulersListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewUserSchedulersListEntity(client, entopts)
	}
	core.NewUserSettingEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewUserSettingEntity(client, entopts)
	}
	core.NewWebhookEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewWebhookEntity(client, entopts)
	}
	core.NewWebinarEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewWebinarEntity(client, entopts)
	}
	core.NewWebinarInstanceEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewWebinarInstanceEntity(client, entopts)
	}
	core.NewWebinarPanelistListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewWebinarPanelistListEntity(client, entopts)
	}
	core.NewWebinarRegistrantListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewWebinarRegistrantListEntity(client, entopts)
	}
	core.NewZoomRoomListEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewZoomRoomListEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewZoomSDK = core.NewZoomSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewZoomSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ZoomSDK  { return NewZoomSDK(nil) }
func Test() *ZoomSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
