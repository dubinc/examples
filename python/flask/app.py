import dub
from flask import Flask
from dub.models import operations

d = dub.Dub(
  token=os.environ['DUB_API_KEY'],
  workspace_id=os.environ['DUB_WORKSPACE_ID'],
)

app = Flask(__name__)

# Create a short link
@app.route('/create-link')
def hello():
  res = None

  try:
    res = d.links.create(request=operations.CreateLinkRequestBody(
       url='https://google.com',
       tag_id="2"
    ))
  except Exception as e:
    return str(e)

  if res.link_schema is not None:
    return res.link_schema.short_link

# Upsert a short link
@app.route('/upsert-link')
def upsert():
  res = None

  try:
    res = d.links.upsert(request=operations.UpsertLinkRequestBody(
      url='https://google.com',
    ))
  except Exception as e:
    return str(e)

  if res.link_schema is not None:
    return res.link_schema.short_link

# Update a short link
@app.route('/update-link')
def update():
  res = None

  try:
    res = d.links.update(link_id="clx1gvi9o0005hf5momm6f7hj", request_body=operations.UpdateLinkRequestBody(
      url='https://google.uk',
    ))
  except Exception as e:
    return str(e)

  if res.link_schema is not None:
    return res.link_schema.short_link

# Get analytics of a short link
@app.route('/analytics')
def analytics():
  res = None

  try:
    res = d.analytics.retrieve(request=operations.RetrieveAnalyticsRequest(
      link_id="clx1gvi9o0005hf5momm6f7hj",
      interval="7d",
      group_by="timeseries",
    ))
  except Exception as e:
    return str(e)

  if res.one_of is not None:
    return res.one_of

if __name__ == "__main__":
    app.run()

