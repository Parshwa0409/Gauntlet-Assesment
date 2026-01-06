from abc import ABC, abstractmethod


class PolicyAndComplianceChecker(ABC):
    def __init__(self, resource: str):
        """
        resource: string representing the type, e.g., "EC2" or "S3"
        policy: dict representing policy rules
        """
        self.resource = resource

    @abstractmethod
    def determine_policy(self):
        """
        Determine compliance for the resource.
        Must be implemented by subclasses.
        """
        pass
