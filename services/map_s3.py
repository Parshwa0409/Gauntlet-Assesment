from utils.faker_data import FakerData

class MapS3:
    def __init__(self):
        pass

    @staticmethod
    def map_response():
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
            public = not all(public_resp.get(k, False) for k in [
                "BlockPublicAcls",
                "IgnorePublicAcls",
                "BlockPublicPolicy",
                "RestrictPublicBuckets"
            ])

            # Build normalized object
            normalized.append({
                "id": name,
                "name": name,
                "type": "S3",
                "status": "available",
                "risk_level": None,  # to be computed by policy
                "compliance_status": None,  # to be computed by policy
                "metadata": {
                    "encryption": encryption,
                    "versioning": versioning,
                    "logging": logging,
                    "public": public
                }
            })

        return normalized