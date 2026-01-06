import Alert from '@mui/material/Alert';

export default function ErrorAlert({ error }) {
  // Only render if error exists
  if (!error) {
    return null;
  }

  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {error}
    </Alert>
  );
}
