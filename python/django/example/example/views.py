import dub
import os
from dub.models import operations
from django.http import JsonResponse

d = dub.Dub(
  token=os.environ['DUB_API_KEY'],
  workspace_id=os.environ['DUB_WORKSPACE_ID'],
)

# Create a short
def create_link(request):
  res = d.links.create(request=operations.CreateLinkRequestBody(
    url='https://google.com',
  ))

  return JsonResponse({
    'short_link': res.link_schema.short_link
  })

# Upsert a short link
def upsert_link(request):
  res = d.links.upsert(request=operations.UpsertLinkRequestBody(
    url='https://google.com',
  ))

  return JsonResponse({
    'short_link': res.link_schema.short_link
  })

# Update a short link
def update_link(request):
  res = d.links.update(link_id="clx1gvi9o0005hf5momm6f7hj", request_body=operations.UpdateLinkRequestBody(
    url='https://google.uk',
  ))

  return JsonResponse({
    'short_link': res.link_schema.short_link
  })

# Get analytics of a short link
def analytics(request):
  res = d.analytics.retrieve(request=operations.RetrieveAnalyticsRequest(
    link_id="clx1gvi9o0005hf5momm6f7hj",
    interval="7d",
    group_by="timeseries",
  ))
  
  return JsonResponse(res)