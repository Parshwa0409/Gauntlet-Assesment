const Summary = ({ summaryStats }) => {
    const defaultStats = {
        total_assets_scanned: 0,
        total_high_risk_assets: 0,
        fail_compliance: 0,
        total_ec2_instances: 0,
        total_buckets: 0,
    };

    const stats = summaryStats || defaultStats;

    return (
        <footer className="summary-bar">
            <div className="summary-content">
                <p className="summary-title">Summary</p>
                <div className="summary-stats">
                    <span>Total Assets: <strong>{stats.total_assets_scanned}</strong></span>
                    <span>High Risk: <strong>{stats.total_high_risk_assets}</strong></span>
                    <span>Failing Compliance: <strong>{stats.fail_compliance}</strong></span>
                    <span>EC2 Instances: <strong>{stats.total_ec2_instances}</strong></span>
                    <span>S3 Buckets: <strong>{stats.total_buckets}</strong></span>
                </div>
            </div>
        </footer>
    );
};

export default Summary;