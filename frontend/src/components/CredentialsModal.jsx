import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

export default function CredentialsModal({ 
  open, 
  credentials, 
  error, 
  onClose, 
  onChange, 
  onSubmit, 
  loading 
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '18px' }}>
        Enter AWS Credentials
      </DialogTitle>
      <DialogContent sx={{ pt: 4, pb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
          <TextField
            label="Access Key ID"
            name="access_key_id"
            value={credentials.access_key_id}
            onChange={onChange}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Enter your AWS Access Key ID"
          />
          <TextField
            label="Secret Access Key"
            name="secret_access_key"
            value={credentials.secret_access_key}
            onChange={onChange}
            fullWidth
            variant="outlined"
            size="small"
            type="password"
            placeholder="Enter your AWS Secret Access Key"
          />
          <TextField
            label="Region"
            name="region"
            value={credentials.region}
            onChange={onChange}
            fullWidth
            variant="outlined"
            size="small"
            placeholder="e.g., us-east-1"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
          disabled={loading}
        >
          {loading ? 'Scanning...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
