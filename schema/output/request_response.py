from pydantic import BaseModel
from typing import List

from schema.output.summary_response import SummaryResponseSchema
from schema.output.resource_response import ResourceResponseSchema


class RequestResponseSchema(BaseModel):
    summary: SummaryResponseSchema
    resources: List[ResourceResponseSchema]
