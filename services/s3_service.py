from botocore.exceptions import ClientError

from schema.output.resource_response import ResourceResponseSchema
from utils.policy_compliance.s3_checker import S3PolicyAndComplianceChecker


def fetch_s3_buckets(session):
    s3 = session.client("s3")
    bucket_list = s3.list_buckets()["Buckets"]
    normalized = []

    for bucket in bucket_list:
        name = bucket["Name"]

        # Encryption
        try:
            s3.get_bucket_encryption(Bucket=name)
            encryption = True
        except ClientError as e:
            if e.response['Error']['Code'] == 'ServerSideEncryptionConfigurationNotFoundError':
                encryption = False
            else:
                # Re-raise the exception if it's a different error
                raise

        # Versioning
        versioning_resp = s3.get_bucket_versioning(Bucket=name)
        versioning = versioning_resp.get("Status") == "Enabled"

        # Logging
        logging_resp = s3.get_bucket_logging(Bucket=name)
        logging = "LoggingEnabled" in logging_resp

        # Public
        public = True  # default assume public
        try:
            public_resp = s3.get_public_access_block(Bucket=name)
            config = public_resp.get("PublicAccessBlockConfiguration", {})
            public = not all(
                config.get(k, False) for k in [
                    "BlockPublicAcls",
                    "IgnorePublicAcls",
                    "BlockPublicPolicy",
                    "RestrictPublicBuckets"
                ]
            )
        except ClientError as e:
            if e.response['Error']['Code'] != "NoSuchPublicAccessBlockConfiguration":
                print(f"Warning: Could not get public access block for {name}, treating as public")

        pcc_s3 = S3PolicyAndComplianceChecker(
            is_public=public,
            is_encrypted=encryption,
            is_versioning_enabled=versioning,
            is_logging_enabled=logging
        )
        policy_result = pcc_s3.determine_policy()

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
