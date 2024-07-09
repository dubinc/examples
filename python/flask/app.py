import dub
import os
from flask import Flask
from dub.models import operations

d = dub.Dub(
  token=os.environ['DUB_API_KEY'],
)

app = Flask(__name__)

# Create a short link
@app.route('/create-link', methods=['POST'])
def hello():
  res = None

  try:
    res = d.links.create(request={
      "url": "https://google/com",
    })
  except Exception as e:
    return str(e)

  if res is not None:
    return res.short_link

# Upsert a short link
@app.route('/upsert-link', methods=['POST'])
def upsert():
  res = None

  try:
    res = d.links.upsert(request={
      "url": "https://google.com",
    })
  except Exception as e:
    return str(e)

  if res is not None:
    return res.short_link

# Update a short link
@app.route('/update-link', methods=['POST'])
def update():
  res = None

  try:
    res = d.links.update(link_id="clx1gvi9o0005hf5momm6f7hj", request_body={
      "url": "https://google.uk",
    })
  except Exception as e:
    return str(e)

  if res is not None:
    return res.short_link

# Get analytics of a short link
@app.route('/analytics')
def analytics():
  res = None

  try:
    res = d.analytics.retrieve(request={
      "link_id": "clx1gvi9o0005hf5momm6f7hj",
      "interval": "7d",
      "group_by": "timeseries",
    })
  except Exception as e:
    return str(e)

  if res is not None:
    return str(res)

if __name__ == "__main__":
    app.run()

