package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewMeetingEntityFunc func(client *ZoomSDK, entopts map[string]any) ZoomEntity

