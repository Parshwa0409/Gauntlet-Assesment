from utils.faker_data import FakerData
from schema.response import ResponseSchema

class MapEC2:
    def __init__(self):
        pass

    @staticmethod
    def map_response():
        ec2_instances = FakerData.generate_ec2_data().get("Reservations", [])[0].get("Instances", [])
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

            if is_running and has_public_ip:
                mapped_instance["risk_level"] = "HIGH"
                mapped_instance["compliance_status"] = "FAIL"
            else:
                mapped_instance["risk_level"] = "LOW"
                mapped_instance["compliance_status"] = "PASS"

            ec2_metadata = {
                "public": bool(has_public_ip),
                "private_ip": instance.get("PrivateIpAddress", "10.0.1.5")
            }

            if has_public_ip:
                ec2_metadata["public_ip"] = instance.get("PublicIpAddress")

            mapped_instance["metadata"] = ec2_metadata

            mapped_responses.append(ResponseSchema(**mapped_instance))

        return mapped_responses