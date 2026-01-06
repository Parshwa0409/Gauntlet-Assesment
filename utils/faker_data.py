from datetime import datetime


class FakerData:
    @staticmethod
    def generate_ec2_data():
        return {
            "Reservations": [
                {
                    "ReservationId": "r-0a1b2c3d4e5f67890",
                    "OwnerId": "1234567890",
                    "Groups": [],
                    "Instances": [
                        {
                            "InstanceId": "i-0123456789abcdef0",
                            "InstanceType": "t3.micro",
                            "ImageId": "ami-0abcdef12345",
                            "State": {
                                "Code": 16,
                                "Name": "running"
                            },
                            "PrivateDnsName": "ip-172-31-10-12.ec2.internal2",
                            "PublicDnsName": "ec2-54-210-12-34.compute-2.amazonaws.com",
                            "KeyName": "my-keypair",
                            "LaunchTime": "2025-01-01T12:00:00Z",
                            "Placement": {
                                "AvailabilityZone": "us-east-1a",
                                "Tenancy": "default"
                            },
                            "PrivateIpAddress": "172.31.10.12",
                            "PublicIpAddress": "54.210.12.34",
                            "SecurityGroups": [
                                {
                                    "GroupName": "default",
                                    "GroupId": "sg-0123abcd"
                                }
                            ],
                            "Tags": [
                                {
                                    "Key": "Name",
                                    "Value": "MyEC2Instance-2"
                                },
                                {
                                    "Key": "Environment",
                                    "Value": "Stage"
                                }
                            ]
                        }
                    ]
                },
                {
                    "ReservationId": "r-0a1b2c3d4e5f67890",
                    "OwnerId": "123456789012",
                    "Groups": [],
                    "Instances": [
                        {
                            "InstanceId": "i-0123456789abcdef0",
                            "InstanceType": "t3.micro",
                            "ImageId": "ami-0abcdef12345",
                            "State": {
                                "Code": 16,
                                "Name": "running"
                            },
                            "PrivateDnsName": "ip-172-31-10-12.ec2.internal",
                            "PublicDnsName": "ec2-54-210-12-34.compute-1.amazonaws.com",
                            "KeyName": "my-keypair",
                            "LaunchTime": "2025-01-01T12:00:00Z",
                            "Placement": {
                                "AvailabilityZone": "us-east-1a",
                                "Tenancy": "default"
                            },
                            "PrivateIpAddress": "172.31.10.12",
                            "PublicIpAddress": "54.210.12.34",
                            "SecurityGroups": [
                                {
                                    "GroupName": "default",
                                    "GroupId": "sg-0123abcd"
                                }
                            ],
                            "Tags": [
                                {
                                    "Key": "Name",
                                    "Value": "MyEC2Instance"
                                },
                                {
                                    "Key": "Environment",
                                    "Value": "Dev"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    @staticmethod
    def list_buckets():
        """
        Returns a fake list_buckets() response
        """
        return {
            "Buckets": [
                {
                    "Name": "secure-bucket",
                    "CreationDate": datetime(2024, 12, 1, 12, 0, 0)
                },
                {
                    "Name": "risky-bucket",
                    "CreationDate": datetime(2025, 1, 2, 12, 0, 0)
                },
                {
                    "Name": "dev-bucket",
                    "CreationDate": datetime(2025, 1, 5, 12, 0, 0)
                }
            ],
            "Owner": {
                "DisplayName": "alice",
                "ID": "1234567890abcdef"
            }
        }

    @staticmethod
    def get_bucket_encryption(bucket_name):
        """
        Returns a fake get_bucket_encryption() response
        """
        encryption_map = {
            "secure-bucket": {
                "ServerSideEncryptionConfiguration": {
                    "Rules": [
                        {
                            "ApplyServerSideEncryptionByDefault": {
                                "SSEAlgorithm": "AES256"
                            }
                        }
                    ]
                }
            },
            "risky-bucket": Exception("ServerSideEncryptionConfiguration not found"),
            "dev-bucket": {
                "ServerSideEncryptionConfiguration": {
                    "Rules": [
                        {
                            "ApplyServerSideEncryptionByDefault": {
                                "SSEAlgorithm": "AES256"
                            }
                        }
                    ]
                }
            }
        }

        result = encryption_map.get(bucket_name, Exception("Bucket not found"))
        if isinstance(result, Exception):
            raise result
        return result

    @staticmethod
    def get_bucket_versioning(bucket_name):
        """
        Returns a fake get_bucket_versioning() response
        """
        versioning_map = {
            "secure-bucket": {"Status": "Enabled"},
            "risky-bucket": {},  # No versioning enabled
            "dev-bucket": {"Status": "Suspended"}
        }
        return versioning_map.get(bucket_name, {})

    @staticmethod
    def get_bucket_logging(bucket_name):
        """
        Returns a fake get_bucket_logging() response
        """
        logging_map = {
            "secure-bucket": {
                "LoggingEnabled": {
                    "TargetBucket": "log-bucket",
                    "TargetPrefix": f"{bucket_name}/"
                }
            },
            "risky-bucket": {},  # Logging not enabled
            "dev-bucket": {
                "LoggingEnabled": {
                    "TargetBucket": "dev-log-bucket",
                    "TargetPrefix": f"{bucket_name}/"
                }
            }
        }
        return logging_map.get(bucket_name, {})

    @staticmethod
    def get_bucket_public_access_block(bucket_name):
        """
        Returns a fake get_public_access_block() response
        """
        public_map = {
            "secure-bucket": {
                "BlockPublicAcls": True,
                "IgnorePublicAcls": True,
                "BlockPublicPolicy": True,
                "RestrictPublicBuckets": True
            },
            "risky-bucket": {
                "BlockPublicAcls": False,
                "IgnorePublicAcls": False,
                "BlockPublicPolicy": False,
                "RestrictPublicBuckets": False
            },
            "dev-bucket": {
                "BlockPublicAcls": True,
                "IgnorePublicAcls": True,
                "BlockPublicPolicy": True,
                "RestrictPublicBuckets": True
            }
        }
        return public_map.get(bucket_name, {})
