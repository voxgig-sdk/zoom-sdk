-- Zoom SDK error

local ZoomError = {}
ZoomError.__index = ZoomError


function ZoomError.new(code, msg, ctx)
  local self = setmetatable({}, ZoomError)
  self.is_sdk_error = true
  self.sdk = "Zoom"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ZoomError:error()
  return self.msg
end


function ZoomError:__tostring()
  return self.msg
end


return ZoomError
