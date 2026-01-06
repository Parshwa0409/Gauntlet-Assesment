from abc import ABC, abstractmethod

class DataMapper(ABC):
    def __init__(self, resource_data: dict):
        """
        resource: string representing the type, e.g., "EC2" or "S3"
        policy: dict representing policy rules
        """
        self.resource_data = resource_data

    @abstractmethod
    def map_resource_data(self):
        """
        Determine compliance for the resource.
        Must be implemented by subclasses.
        """
        pass
