import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function ErrorView({ error, onRetry }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        border: '2px dashed #ef5350',
        borderRadius: '12px',
        backgroundColor: '#ffebee',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#c62828' }}>
        An Error Occurred
      </Typography>
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
      <Button
        onClick={onRetry}
        variant="contained"
        sx={{
          backgroundColor: '#ef5350',
          color: 'white',
          '&:hover': {
            backgroundColor: '#d32f2f',
          },
        }}
      >
        Retry Scan
      </Button>
    </Box>
  );
}