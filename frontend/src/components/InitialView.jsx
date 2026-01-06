import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function InitialView({ onCheckStatus, loading }) {
  return (
    <Box className="initial-view">
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#667eea' }}>
        Welcome to the Security Scanner
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Click the button below to start a scan of your AWS environment.
      </Typography>
      <Button
        onClick={onCheckStatus}
        variant="contained"
        disabled={loading}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          px: 4,
          py: 1.5,
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Scan'}
      </Button>
    </Box>
  );
}