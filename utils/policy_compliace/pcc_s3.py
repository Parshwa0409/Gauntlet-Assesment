from utils.policy_compliace.policy_compliance_checker import PolicyAndComplianceChecker


class S3PolicyAndComplianceChecker(PolicyAndComplianceChecker):

    def __init__(self, is_public: bool = False, is_encrypted: bool = False, is_versioning_enabled: bool = False,
                 is_logging_enabled: bool = False):
        self.resource = "S3"
        self.is_public = is_public
        self.is_encrypted = is_encrypted
        self.is_versioning_enabled = is_versioning_enabled
        self.is_logging_enabled = is_logging_enabled
        super().__init__(self.resource)

    def determine_policy(self):
        """
        Example S3 compliance_status logic.
        """
        compliance_status = "PASS"
        risk_level = "LOW"

        if self.is_public and not self.is_encrypted:
            risk = "High"
        else:
            risk = "Low"

        if self.is_public or not self.is_encrypted or not self.is_versioning_enabled or not self.is_logging_enabled:
            compliance_status = "FAIL"

        return {"risk_level": risk_level, "compliance_status": compliance_status}
