import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function ViewToggle({ viewMode, onViewModeChange }) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        onClick={() => onViewModeChange('card')}
        variant={viewMode === 'card' ? 'contained' : 'outlined'}
        sx={{
          background: viewMode === 'card' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
          color: viewMode === 'card' ? '#fff' : '#667eea',
          border: '2px solid #667eea',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '14px',
          px: 3,
          py: 1.2,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: viewMode === 'card' ? '0 6px 20px rgba(102, 126, 234, 0.5)' : 'none',
          '&:hover': {
            background: viewMode === 'card' 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              : 'rgba(102, 126, 234, 0.1)',
            transform: 'translateY(-2px)',
            boxShadow: viewMode === 'card' ? '0 8px 24px rgba(102, 126, 234, 0.6)' : '0 4px 12px rgba(102, 126, 234, 0.2)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        }}
      >
        📋 Card
      </Button>
      <Button
        onClick={() => onViewModeChange('table')}
        variant={viewMode === 'table' ? 'contained' : 'outlined'}
        sx={{
          background: viewMode === 'table' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
          color: viewMode === 'table' ? '#fff' : '#667eea',
          border: '2px solid #667eea',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '14px',
          px: 3,
          py: 1.2,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: viewMode === 'table' ? '0 6px 20px rgba(102, 126, 234, 0.5)' : 'none',
          '&:hover': {
            background: viewMode === 'table' 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              : 'rgba(102, 126, 234, 0.1)',
            transform: 'translateY(-2px)',
            boxShadow: viewMode === 'table' ? '0 8px 24px rgba(102, 126, 234, 0.6)' : '0 4px 12px rgba(102, 126, 234, 0.2)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        }}
      >
        📊 Table
      </Button>
    </Box>
  );
}
