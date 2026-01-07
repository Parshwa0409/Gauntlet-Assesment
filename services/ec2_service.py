from schema.output.resource_response import ResourceResponseSchema
from utils.policy_compliance.ec2_checker import EC2PolicyAndComplianceChecker


def _is_subnet_public(ec2_client, subnet_id):
    """Check if a subnet is public."""
    if not subnet_id:
        return False
    try:
        route_tables_response = ec2_client.describe_route_tables(
            Filters=[{'Name': 'association.subnet-id', 'Values': [subnet_id]}]
        )
        for route_table in route_tables_response.get("RouteTables", []):
            for route in route_table.get("Routes", []):
                # Check for a route to an internet gateway
                if route.get("GatewayId", "").startswith("igw-") and route.get("DestinationCidrBlock") == "0.0.0.0/0":
                    return True
    except Exception as e:
        print(f"Could not check subnet {subnet_id}: {e}")
    return False


def fetch_ec2_instances(session):
    ec2_client = session.client("ec2")
    response = ec2_client.describe_instances()

    ec2_reservations = response.get("Reservations", [])
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
        subnet_id = instance.get("SubnetId")
        is_in_public_subnet = _is_subnet_public(ec2_client, subnet_id)
        is_public_facing = has_public_ip or is_in_public_subnet

        pcc_ec2 = EC2PolicyAndComplianceChecker(is_running, is_public_facing)
        mapped_instance["risk_level"] = pcc_ec2.determine_policy().get("risk_level")
        mapped_instance["compliance_status"] = pcc_ec2.determine_policy().get("compliance_status")

        ec2_metadata = {
            "public": is_public_facing,
            "private_ip": instance.get("PrivateIpAddress", "10.0.1.5")
        }

        if has_public_ip:
            ec2_metadata["public_ip"] = instance.get("PublicIpAddress")

        mapped_instance["metadata"] = ec2_metadata

        mapped_responses.append(ResourceResponseSchema(**mapped_instance))

    return mapped_responses
