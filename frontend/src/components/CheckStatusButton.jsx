import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function CheckStatusButton({ onClick, loading }) {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      variant="contained"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
        },
        transition: 'all 0.3s ease',
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: 600,
        px: 3,
        py: 1.2,
        borderRadius: '6px',
      }}
    >
      {loading ? (
        <>
          <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
          Scanning...
        </>
      ) : (
        'Check Status'
      )}
    </Button>
  );
}
