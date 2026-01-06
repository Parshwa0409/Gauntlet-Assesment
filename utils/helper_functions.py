from schema.output.request_response import RequestResponseSchema
from typing import List, Dict

from schema.output.summary_response import SummaryResponseSchema


class HelperFunctions:
    @staticmethod
    def extract_metrics(resources: List[RequestResponseSchema]) -> SummaryResponseSchema:
        total_assets_scanned = len(resources)
        total_high_risk_assets = 0
        total_buckets = 0
        high_risk_buckets = 0
        low_risk_buckets = 0
        pass_compliance = 0
        fail_compliance = 0
        total_ec2_instances = 0
        running_instances = 0
        stopped_instances = 0

        for resource in resources:
            # High-risk assets
            if resource.risk_level == "HIGH":
                total_high_risk_assets += 1
            
            # Compliance counts (all resources)
            if resource.compliance_status == "PASS":
                pass_compliance += 1
            elif resource.compliance_status == "FAIL":
                fail_compliance += 1

            # S3 bucket metrics
            if resource.type == "S3":
                total_buckets += 1
                if resource.risk_level == "HIGH":
                    high_risk_buckets += 1
                elif resource.risk_level == "LOW":
                    low_risk_buckets += 1

            # EC2 instance metrics
            if resource.type == "EC2":
                total_ec2_instances += 1
                status = resource.status.upper()
                if status == "RUNNING":
                    running_instances += 1
                elif status == "STOPPED":
                    stopped_instances += 1

        mapped_metrics = {
            "total_assets_scanned": total_assets_scanned,
            "total_high_risk_assets": total_high_risk_assets,
            "total_buckets": total_buckets,
            "high_risk_buckets": high_risk_buckets,
            "low_risk_buckets": low_risk_buckets,
            "pass_compliance": pass_compliance,
            "fail_compliance": fail_compliance,
            "total_ec2_instances": total_ec2_instances,
            "running_instances": running_instances,
            "stopped_instances": stopped_instances,
        }

        return SummaryResponseSchema(**mapped_metrics)
