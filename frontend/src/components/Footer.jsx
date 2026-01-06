const Footer = ({ footerStats }) => {
    const defaultStats = {
        total_buckets: 0,
        high_risk_buckets: 0,
        low_risk_buckets: 0,
        pass_compliance: 0,
        fail_compliance: 0,
        total_ec2_instances: 0,
        running_instances: 0,
        stopped_instances: 0,
    };

    const stats = footerStats || defaultStats;

    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-title">Summary</p>

                <div className="footer-stats">
                    <span>Total Buckets: <strong>{stats.total_buckets}</strong></span>
                    <span>High Risk: <strong>{stats.high_risk_buckets}</strong></span>
                    <span>Low Risk: <strong>{stats.low_risk_buckets}</strong></span>
                    <span>Pass Compliance: <strong>{stats.pass_compliance}</strong></span>
                    <span>Fail Compliance: <strong>{stats.fail_compliance}</strong></span>
                    <span>Total EC2: <strong>{stats.total_ec2_instances}</strong></span>
                    <span>Running: <strong>{stats.running_instances}</strong></span>
                    <span>Stopped: <strong>{stats.stopped_instances}</strong></span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
