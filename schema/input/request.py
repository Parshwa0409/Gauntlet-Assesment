from pydantic import BaseModel


class RequestSchema(BaseModel):
    access_key_id: str
    secret_access_key: str
    region: str = "us-east-1"

    def to_dict(self):
        return {
            "access_key_id": self.access_key_id,
            "secret_access_key": self.secret_access_key,
            "region": self.region
        }
