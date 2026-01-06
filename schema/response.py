from pydantic import BaseModel
from typing import Literal, Dict, Any

class ResponseSchema(BaseModel):
    id: str
    name: str
    type: Literal["EC2", "S3"]
    status: str
    risk_level: Literal["HIGH", "LOW"]
    compliance_status: Literal["PASS", "FAIL"]
    metadata: Dict[str, Any]
