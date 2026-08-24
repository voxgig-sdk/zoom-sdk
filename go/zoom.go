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
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewMeetingEntityFunc = func(client *core.ZoomSDK, entopts map[string]any) core.ZoomEntity {
		return entity.NewMeetingEntity(client, entopts)
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
var NewTestFeature = feature.NewTestFeature
