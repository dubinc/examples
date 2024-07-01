require 'dub'

s = ::OpenApiSDK::Dub.new

s.config_security(
  ::OpenApiSDK::Shared::Security.new(
    token: ENV['DUB_API_KEY'],
  )
)

req = ::OpenApiSDK::Operations::UpsertLinkRequest.new(
  request_body: ::OpenApiSDK::Operations::UpsertLinkRequestBody.new(
    url: "https://google.com",
  ),
)

res = s.links.upsert(req)

puts res.raw_response.body