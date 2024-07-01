require 'dub'

s = ::OpenApiSDK::Dub.new

s.config_security(
  ::OpenApiSDK::Shared::Security.new(
    token: ENV['DUB_API_KEY'],
  )
)

req = ::OpenApiSDK::Operations::CreateLinkRequest.new(
  request_body: ::OpenApiSDK::Operations::CreateLinkRequestBody.new(
    url: "https://google.com"
  )
)
    
res = s.links.create(req)

puts res.raw_response.body