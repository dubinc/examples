require 'dub'

s = ::OpenApiSDK::Dub.new

s.config_security(
  ::OpenApiSDK::Shared::Security.new(
    token: ENV['DUB_API_KEY'],
  )
)

req = ::OpenApiSDK::Operations::UpdateLinkRequest.new(
  link_id: "cly2p8onm000cym8200nfay7l",
  request_body: ::OpenApiSDK::Operations::UpdateLinkRequestBody.new(
    url: "https://google.us",
  ),
)
    
res = s.links.update(req)

puts res.raw_response.body