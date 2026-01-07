import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SummaryCard = ({ title, value, color }) => (
    <Paper
        elevation={3}
        sx={{
            p: 2,
            textAlign: 'center',
            color: '#fff',
            background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
        }}
    >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {value}
        </Typography>
        <Typography variant="subtitle1">{title}</Typography>
    </Paper>
);

const Summary = ({ summaryStats }) => {
    const defaultStats = {
        total_assets_scanned: 0,
        total_high_risk_assets: 0,
    };

    const stats = summaryStats || defaultStats;

    return (
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <SummaryCard title="Total Assets Scanned" value={stats.total_assets_scanned} color="#667eea" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SummaryCard title="Total 'High Risk' Assets" value={stats.total_high_risk_assets} color="#ef5350" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Summary;