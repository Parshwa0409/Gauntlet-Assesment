from utils.policy_compliace.policy_compliance_checker import PolicyAndComplianceChecker


# 2️⃣ EC2 Implementation
class EC2PolicyAndComplianceChecker(PolicyAndComplianceChecker):

    def __init__(self, is_public: bool = False, is_running: bool = False):
        self.resource = "EC2"
        self.is_public = is_public
        self.is_running = is_running
        super().__init__(self.resource)

    def determine_policy(self):
        """
        Example EC2 compliance logic.
        """
        # Example: HIGH risk if policy has "public_access" rule
        if self.is_running and self.is_public:
            return {"risk_level": "HIGH", "compliance_status": "FAIL"}
        else:
            return {"risk_level": "LOW", "compliance_status": "PASS"}

