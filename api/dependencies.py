import boto3
from fastapi import HTTPException

from schema.input.request import RequestSchema


def get_aws_session(data: RequestSchema):
    try:
        session = boto3.Session(
            aws_access_key_id=data.access_key_id,
            aws_secret_access_key=data.secret_access_key,
            region_name=data.region
        )

        session.client("sts").get_caller_identity()

        return session
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
