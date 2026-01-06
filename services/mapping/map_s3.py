from schema.output.request_response import RequestResponseSchema
from schema.output.resource_response import ResourceResponseSchema
from services.mapping.data_mapper import DataMapper
from utils.faker_data import FakerData
from utils.policy_compliace.pcc_s3 import S3PolicyAndComplianceChecker


class MapS3(DataMapper):
    def __init__(self, resource_data: dict = None):
        self.resource_data = resource_data
        super().__init__(self.resource_data)

    def map_resource_data(self):
        """
        Returns a list of normalized S3 bucket objects ready for policy evaluation
        """
        buckets = FakerData.list_buckets()["Buckets"]
        normalized = []

        for bucket in buckets:
            name = bucket["Name"]

            # Encryption
            try:
                FakerData.get_bucket_encryption(name)
                encryption = True
            except Exception:
                encryption = False

            # Versioning
            versioning_resp = FakerData.get_bucket_versioning(name)
            versioning = versioning_resp.get("Status") == "Enabled"

            # Logging
            logging_resp = FakerData.get_bucket_logging(name)
            logging = "LoggingEnabled" in logging_resp

            # Public
            public_resp = FakerData.get_bucket_public_access_block(name)
            public = not all(
                public_resp.get(k, False) for k in [
                    "BlockPublicAcls",
                    "IgnorePublicAcls",
                    "BlockPublicPolicy",
                    "RestrictPublicBuckets"
                ]
            )

            pcc_s3 = S3PolicyAndComplianceChecker(
                is_public=public,
                is_encrypted=encryption,
                is_versioning_enabled=versioning,
                is_logging_enabled=logging
            )
            policy_result = pcc_s3.determine_policy()

            # Build normalized object
            mapped_data = {
                "id": name,
                "name": name,
                "type": "S3",
                "status": "ACTIVE",
                "risk_level": policy_result.get("risk_level"),
                "compliance_status": policy_result.get("compliance_status"),
                "metadata": {
                    "encryption": encryption,
                    "versioning": versioning,
                    "logging": logging,
                    "public": public
                }
            }
            normalized.append(ResourceResponseSchema(**mapped_data))

        return normalized