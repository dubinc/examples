class LinksController < ApplicationController
  require 'dub'

  before_action :initialize_dub

  # Just for the sake of the example, we are disabling CSRF protection 
  # DO NOT DO THIS IN A REAL APPLICATION
  protect_from_forgery with: :null_session

  # create a new link on Dub
  def create
    req = ::OpenApiSDK::Operations::CreateLinkRequest.new(
      request_body: ::OpenApiSDK::Operations::CreateLinkRequestBody.new(
        url: 'https://google.com'
      )
    )

    res = @dub.links.create(req)

    render json: res.raw_response.body
  end

  # upsert a link (Create if it doesn't exist, Update if it does)
  def upsert
    req = ::OpenApiSDK::Operations::UpsertLinkRequest.new(
      request_body: ::OpenApiSDK::Operations::UpsertLinkRequestBody.new(
        url: "https://google.com",
      ),
    )

    res = @dub.links.upsert(req)

    render json: res.raw_response.body
  end

  # update a link on Dub
  def update
    req = ::OpenApiSDK::Operations::UpdateLinkRequest.new(
      link_id: 'clx1gvi9o0005hf5momm6f7hj',
      request_body: ::OpenApiSDK::Operations::UpdateLinkRequestBody.new(
        url: 'https://google.uk'
      )
    )

    res = @dub.links.update(req)

    render json: res.raw_response.body
  end

  # retrieve analytics for a link
  def analytics
    req = ::OpenApiSDK::Operations::RetrieveAnalyticsRequest.new(
      link_id: "clx1gvi9o0005hf5momm6f7hj",
      interval: ::OpenApiSDK::Operations::Interval::SEVEND,
      group_by: ::OpenApiSDK::Operations::GroupBy::TIMESERIES
    )
  
    res = @dub.analytics.retrieve(req)

    render json: res.raw_response.body
  end

  private

  def initialize_dub
    @dub = ::OpenApiSDK::Dub.new
    @dub.config_security(
      ::OpenApiSDK::Shared::Security.new(
        token: ENV['DUB_API_KEY']
      )
    )
  end
end
