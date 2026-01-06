from pydantic import BaseModel


class SummaryResponseSchema(BaseModel):
    total_buckets: int
    high_risk_buckets: int
    low_risk_buckets: int
    pass_compliance: int
    fail_compliance: int
    total_ec2_instances: int
    running_instances: int
    stopped_instances: int
