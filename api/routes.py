from fastapi import APIRouter, Depends

from api.dependencies import get_aws_session
from services.ec2_service import fetch_ec2_instances
from services.s3_service import fetch_s3_buckets
from utils.helper_functions import HelperFunctions

router = APIRouter()

@router.post("/scan")
def scan_aws(aws_session = Depends(get_aws_session)):
    ec2_data = fetch_ec2_instances(aws_session)

    s3_data = fetch_s3_buckets(aws_session)

    combined = ec2_data + s3_data

    summary = HelperFunctions().extract_metrics(combined)

    return {"status": "ok", "data": combined, "summary": summary}
