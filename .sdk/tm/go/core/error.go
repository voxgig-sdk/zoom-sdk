package core

type ZoomError struct {
	IsZoomError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewZoomError(code string, msg string, ctx *Context) *ZoomError {
	return &ZoomError{
		IsZoomError: true,
		Sdk:              "Zoom",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ZoomError) Error() string {
	return e.Msg
}
