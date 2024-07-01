require 'dub'

s = ::OpenApiSDK::Dub.new

s.config_security(
  ::OpenApiSDK::Shared::Security.new(
    token: "p4zAQVpvOBd8YQz5dUozZQiP",
    # token: "dub_QgcEPk1YZfCxQwjjxWYdNZw5"
    # workspaceId: "ws_clrei1gld0002vs9mzn93p8ik",
  )
)

req = ::OpenApiSDK::Operations::CreateLinkRequest.new(
  request_body: ::OpenApiSDK::Operations::CreateLinkRequestBody.new(
    url: "https://google/com"
  )
)
    
res = s.links.create(req)

# Print json response
puts res.raw_response.body


