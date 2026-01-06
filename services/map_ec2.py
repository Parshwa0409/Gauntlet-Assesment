from utils.faker_data import FakerData
from schema.response import ResponseSchema
from utils.pcc_ec2 import EC2PolicyAndComplianceChecker

class MapEC2:
    def __init__(self):
        pass

    @staticmethod
    def map_response():
        ec2_reservations = FakerData.generate_ec2_data().get("Reservations", [])
        ec2_instances = [instance for reservation in ec2_reservations for instance in reservation.get("Instances", [])]
        mapped_responses = []

        for instance in ec2_instances:
            mapped_instance = dict()

            mapped_instance["id"] = instance.get("InstanceId", "")

            tags = instance.get("Tags", [])
            name_tag = next((tag.get("Value") for tag in tags if tag.get("Key") == "Name"), "Unnamed EC2 Instance")
            mapped_instance["name"] = name_tag

            mapped_instance["type"] = "EC2"

            state_name = instance.get("State", {}).get("Name", "unknown").upper()
            mapped_instance["status"] = state_name

            is_running = instance.get("State", {}).get("Name") == "running"
            has_public_ip = instance.get("PublicIpAddress") is not None

            pcc_ec2 = EC2PolicyAndComplianceChecker(is_running, has_public_ip)
            mapped_instance["risk_level"] = pcc_ec2.determine_policy().get("risk_level")
            mapped_instance["compliance_status"] = pcc_ec2.determine_policy().get("compliance_status")

            ec2_metadata = {
                "public": has_public_ip,
                "private_ip": instance.get("PrivateIpAddress", "10.0.1.5")
            }

            if has_public_ip:
                ec2_metadata["public_ip"] = instance.get("PublicIpAddress")

            mapped_instance["metadata"] = ec2_metadata

            mapped_responses.append(ResponseSchema(**mapped_instance))

        return mapped_responses