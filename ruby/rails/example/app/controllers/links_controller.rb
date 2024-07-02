class LinksController < ApplicationController
  require 'dub'

  before_action :initialize_dub

  def create_link
    begin
      req = ::OpenApiSDK::Operations::CreateLinkRequest.new(
        request_body: ::OpenApiSDK::Operations::CreateLinkRequestBody.new(
          url: 'https://google.com'
        )
      )
      res = @dub.links.create(req)
    rescue StandardError => e
      render plain: e.message and return
    end

    if res.link_schema
      puts res.raw_response.body
      render plain: res.link_schema.short_link
    end
  end

  def upsert_link
    begin
      res = @dub.links.upsert(
        request: {
          url: 'https://google.com'
        }
      )
    rescue StandardError => e
      render plain: e.message and return
    end

    if res.link_schema
      render plain: res.link_schema.short_link
    end
  end

  def update_link
    begin
      res = @dub.links.update(
        link_id: 'clx1gvi9o0005hf5momm6f7hj',
        request_body: {
          url: 'https://google.uk'
        }
      )
    rescue StandardError => e
      render plain: e.message and return
    end

    if res.link_schema
      render plain: res.link_schema.short_link
    end
  end

  def analytics
    begin
      res = @dub.analytics.retrieve(
        request: {
          link_id: 'clx1gvi9o0005hf5momm6f7hj',
          interval: '7d',
          group_by: 'timeseries'
        }
      )
    rescue StandardError => e
      render plain: e.message and return
    end

    if res.one_of
      render plain: res.one_of
    end
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
