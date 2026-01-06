from datetime import datetime


class FakerData:
    @staticmethod
    def generate_ec2_data():
        return {'Reservations': [{'ReservationId': 'r-021a6075b74578aa4', 'OwnerId': '334716710212', 'Groups': [],
                                  'Instances': [{'Architecture': 'x86_64', 'BlockDeviceMappings': [
                                      {'DeviceName': '/dev/xvda',
                                       'Ebs': {'AttachTime': datetime.datetime(2026, 1, 6, 12, 32, 8, tzinfo=tzutc()),
                                               'DeleteOnTermination': True, 'Status': 'attached',
                                               'VolumeId': 'vol-0445527000a30ef8f'}}],
                                                 'ClientToken': '6f805f79-8dec-4e40-8cf7-307513dbf23f',
                                                 'EbsOptimized': True, 'EnaSupport': True, 'Hypervisor': 'xen',
                                                 'NetworkInterfaces': [{'Association': {'IpOwnerId': 'amazon',
                                                                                        'PublicDnsName': 'ec2-18-219-50-14.us-east-2.compute.amazonaws.com',
                                                                                        'PublicIp': '18.219.50.14'},
                                                                        'Attachment': {
                                                                            'AttachTime': datetime.datetime(2026, 1, 6,
                                                                                                            12, 32, 7,
                                                                                                            tzinfo=tzutc()),
                                                                            'AttachmentId': 'eni-attach-0132484ac9c339671',
                                                                            'DeleteOnTermination': True,
                                                                            'DeviceIndex': 0, 'Status': 'attached',
                                                                            'NetworkCardIndex': 0}, 'Description': '',
                                                                        'Groups': [{'GroupId': 'sg-063c7399b7a115c7d',
                                                                                    'GroupName': 'launch-wizard-1'}],
                                                                        'Ipv6Addresses': [],
                                                                        'MacAddress': '0a:34:15:37:9a:d9',
                                                                        'NetworkInterfaceId': 'eni-0bb4b2f111d54917e',
                                                                        'OwnerId': '334716710212',
                                                                        'PrivateDnsName': 'ip-172-31-37-186.us-east-2.compute.internal',
                                                                        'PrivateIpAddress': '172.31.37.186',
                                                                        'PrivateIpAddresses': [{'Association': {
                                                                            'IpOwnerId': 'amazon',
                                                                            'PublicDnsName': 'ec2-18-219-50-14.us-east-2.compute.amazonaws.com',
                                                                            'PublicIp': '18.219.50.14'},
                                                                                                'Primary': True,
                                                                                                'PrivateDnsName': 'ip-172-31-37-186.us-east-2.compute.internal',
                                                                                                'PrivateIpAddress': '172.31.37.186'}],
                                                                        'SourceDestCheck': True, 'Status': 'in-use',
                                                                        'SubnetId': 'subnet-0fe768c5db866930c',
                                                                        'VpcId': 'vpc-030fbc7f75281a789',
                                                                        'InterfaceType': 'interface',
                                                                        'Operator': {'Managed': False}}],
                                                 'RootDeviceName': '/dev/xvda', 'RootDeviceType': 'ebs',
                                                 'SecurityGroups': [{'GroupId': 'sg-063c7399b7a115c7d',
                                                                     'GroupName': 'launch-wizard-1'}],
                                                 'SourceDestCheck': True,
                                                 'Tags': [{'Key': 'Name', 'Value': 'cspm-test-ec2'}],
                                                 'VirtualizationType': 'hvm',
                                                 'CpuOptions': {'CoreCount': 1, 'ThreadsPerCore': 2},
                                                 'CapacityReservationSpecification': {
                                                     'CapacityReservationPreference': 'open'},
                                                 'HibernationOptions': {'Configured': False},
                                                 'MetadataOptions': {'State': 'applied', 'HttpTokens': 'required',
                                                                     'HttpPutResponseHopLimit': 2,
                                                                     'HttpEndpoint': 'enabled',
                                                                     'HttpProtocolIpv6': 'disabled',
                                                                     'InstanceMetadataTags': 'disabled'},
                                                 'EnclaveOptions': {'Enabled': False}, 'BootMode': 'uefi-preferred',
                                                 'PlatformDetails': 'Linux/UNIX', 'UsageOperation': 'RunInstances',
                                                 'UsageOperationUpdateTime': datetime.datetime(2026, 1, 6, 12, 32, 7,
                                                                                               tzinfo=tzutc()),
                                                 'PrivateDnsNameOptions': {'HostnameType': 'ip-name',
                                                                           'EnableResourceNameDnsARecord': True,
                                                                           'EnableResourceNameDnsAAAARecord': False},
                                                 'MaintenanceOptions': {'AutoRecovery': 'default',
                                                                        'RebootMigration': 'default'},
                                                 'CurrentInstanceBootMode': 'uefi',
                                                 'NetworkPerformanceOptions': {'BandwidthWeighting': 'default'},
                                                 'Operator': {'Managed': False}, 'InstanceId': 'i-0d2af70f44d5d1749',
                                                 'ImageId': 'ami-00e428798e77d38d9',
                                                 'State': {'Code': 16, 'Name': 'running'},
                                                 'PrivateDnsName': 'ip-172-31-37-186.us-east-2.compute.internal',
                                                 'PublicDnsName': 'ec2-18-219-50-14.us-east-2.compute.amazonaws.com',
                                                 'StateTransitionReason': '', 'KeyName': 'cpsm-user-key-pair',
                                                 'AmiLaunchIndex': 0, 'ProductCodes': [], 'InstanceType': 't3.micro',
                                                 'LaunchTime': datetime.datetime(2026, 1, 6, 12, 32, 7, tzinfo=tzutc()),
                                                 'Placement': {'AvailabilityZoneId': 'use2-az3', 'GroupName': '',
                                                               'Tenancy': 'default', 'AvailabilityZone': 'us-east-2c'},
                                                 'Monitoring': {'State': 'disabled'},
                                                 'SubnetId': 'subnet-0fe768c5db866930c',
                                                 'VpcId': 'vpc-030fbc7f75281a789', 'PrivateIpAddress': '172.31.37.186',
                                                 'PublicIpAddress': '18.219.50.14'}]}],
                'ResponseMetadata': {'RequestId': '63f72f3d-630e-48d8-8f92-9546581fadf3', 'HTTPStatusCode': 200,
                                     'HTTPHeaders': {'x-amzn-requestid': '63f72f3d-630e-48d8-8f92-9546581fadf3',
                                                     'cache-control': 'no-cache, no-store',
                                                     'strict-transport-security': 'max-age=31536000; includeSubDomains',
                                                     'vary': 'accept-encoding',
                                                     'content-type': 'text/xml;charset=UTF-8', 'content-length': '5427',
                                                     'date': 'Tue, 06 Jan 2026 12:55:32 GMT', 'server': 'AmazonEC2'},
                                     'RetryAttempts': 0}}

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
