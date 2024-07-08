require "sinatra"
require "dub"

set :port, 3000
set :bind, "0.0.0.0"

before do
  $dub = ::OpenApiSDK::Dub.new
  $dub.config_security(
    ::OpenApiSDK::Shared::Security.new(
      token: ENV['DUB_API_KEY'],
    )
  )
end

# Create a link on Dub
post "/links" do
  req = ::OpenApiSDK::Operations::CreateLinkRequest.new(
    request_body: ::OpenApiSDK::Operations::CreateLinkRequestBody.new(
      url: 'https://google.com'
    )
  )

  res = $dub.links.create(req)

  content_type :json
  res.raw_response.body
end

# Upsert a link (Create if it doesn't exist, Update if it does)
put "/links" do
  req = ::OpenApiSDK::Operations::UpsertLinkRequest.new(
    request_body: ::OpenApiSDK::Operations::UpsertLinkRequestBody.new(
      url: "https://google.com",
    ),
  )

  res = $dub.links.upsert(req)

  content_type :json
  res.raw_response.body
end

# Update a link on Dub
patch "/links" do
  req = ::OpenApiSDK::Operations::UpdateLinkRequest.new(
    link_id: "clyci5h0w000511sjmu0tyjv9", # Replace with your link_id
    request_body: ::OpenApiSDK::Operations::UpdateLinkRequestBody.new(
      url: 'https://google.uk'
    )
  )

  res = $dub.links.update(req)

  content_type :json
  res.raw_response.body
end

# Retrieve analytics for a link
get "/analytics" do
  req = ::OpenApiSDK::Operations::RetrieveAnalyticsRequest.new(
    link_id: "clx1gvi9o0005hf5momm6f7hj", # Replace with your link_id
    interval: ::OpenApiSDK::Operations::Interval::SEVEND,
    group_by: ::OpenApiSDK::Operations::GroupBy::TIMESERIES
  )

  res = $dub.analytics.retrieve(req)

  content_type :json
  res.raw_response.body
end
