from fastapi import FastAPI
from schema.request import RequestSchema
from services.map_s3 import MapS3
from utils.faker_data import FakerData
from services.map_ec2 import MapEC2
app = FastAPI()
faker_data = FakerData()


@app.get("/")
async def root():
    return {"status": "ok"}


@app.post("/api/v1/scan")
async def scan(request: RequestSchema):
    resource_info = []
    resource_info.extend(MapEC2.map_response())
    resource_info.extend(MapS3.map_response())
    return {"status": "ok", "data": resource_info}
