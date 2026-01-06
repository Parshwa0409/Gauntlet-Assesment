from fastapi import FastAPI
from schema.request import RequestSchema
from utils.faker_data import FakerData
from services.map_ec2 import MapEC2
app = FastAPI()
faker_data = FakerData()


@app.get("/")
async def root():
    return {"status": "ok"}


@app.post("/api/v1/scan/ec2")
async def scan(request: RequestSchema):
    return {"status": "ok", "data": MapEC2.map_response()}

@app.post("/api/v1/scan/s3")
async def scan_s3(request: RequestSchema):
    from services.map_s3 import MapS3
    return {"status": "ok", "data": MapS3.map_response()}
