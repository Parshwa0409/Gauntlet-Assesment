from fastapi import FastAPI

from schema.input.request import RequestSchema
from services.mapping.map_ec2 import MapEC2
from services.mapping.map_s3 import MapS3

app = FastAPI()


@app.get("/")
async def root():
    return {"status": "ok"}


@app.post("/api/v1/scan")
async def scan(request: RequestSchema):
    map_ec2 = MapEC2()
    map_s3 = MapS3()
    resource_info = []
    resource_info.extend(map_ec2.map_resource_data())
    resource_info.extend(map_s3.map_resource_data())

    return {"status": "ok", "data": resource_info}
