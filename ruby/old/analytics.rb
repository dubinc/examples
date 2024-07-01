require 'dub'

s = ::OpenApiSDK::Dub.new

s.config_security(
  ::OpenApiSDK::Shared::Security.new(
    token: ENV['DUB_API_KEY'],
  )
)

req = ::OpenApiSDK::Operations::RetrieveAnalyticsRequest.new(
  link_id: "clmnr6jcc0005l308q9v56uz1",
  interval: ::OpenApiSDK::Operations::Interval::SEVEND,
  group_by: ::OpenApiSDK::Operations::GroupBy::TIMESERIES
)
    
res = s.analytics.retrieve(req)

puts res.raw_response.body