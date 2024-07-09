import dub
import os
from dub.models import operations
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


d = dub.Dub(
  token=os.environ['DUB_API_KEY'],
)

# Create a short
@require_http_methods(["POST"])
def create_link(request):
  res = d.links.create(request={
    "url": "https://google/com",
  })

  return JsonResponse({
    'short_link': res.short_link
  })

# Upsert a short link
@require_http_methods(["POST"])
def upsert_link(request):
  res = d.links.upsert(request={
    "url": "https://google.com",
  })

  return JsonResponse({
    'short_link': res.short_link
  })

# Update a short link
@require_http_methods(["POST"])
def update_link(request):
  res = d.links.update(link_id="clx1gvi9o0005hf5momm6f7hj", request_body={
    "url": "https://google.uk",
  })

  return JsonResponse({
    'short_link': res.short_link
  })

# Get analytics of a short link
def analytics(request):
  try:
    res = d.analytics.retrieve(request={
      "link_id": "clx1gvi9o0005hf5momm6f7hj",
      "interval": "7d",
      "group_by": "timeseries",
    })
  
    return JsonResponse(res)
  except Exception as e:
    return JsonResponse({"error": str(e)}, status=500)
