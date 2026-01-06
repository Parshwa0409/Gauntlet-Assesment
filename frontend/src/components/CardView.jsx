import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CardView({ data }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: 3,
      }}
    >
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: '12px',
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#667eea' }}>
                {item.resource_name || item.name || `Resource ${index + 1}`}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.entries(item).map(([key, value]) => (
                  <Box key={key} sx={{ pb: 0.5 }}>
                    {typeof value === 'object' && value !== null ? (
                      <>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#666' }}>
                          {key.replace(/_/g, ' ').toUpperCase()}:
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                          {Array.isArray(value) ? (
                            <Box component="ul" sx={{ m: 0.5, pl: 2 }}>
                              {value.map((item, idx) => (
                                <Typography
                                  key={idx}
                                  component="li"
                                  variant="body2"
                                  sx={{ color: '#333' }}
                                >
                                  {typeof item === 'object' ? JSON.stringify(item) : String(item)}
                                </Typography>
                              ))}
                            </Box>
                          ) : (
                            <Box component="ul" sx={{ m: 0.5, pl: 2 }}>
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <Typography
                                  key={subKey}
                                  component="li"
                                  variant="body2"
                                  sx={{ color: '#333' }}
                                >
                                  <strong>{subKey}:</strong> {String(subValue)}
                                </Typography>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </>
                    ) : (
                      <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                        <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {String(value)}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent>
            <Typography color="textSecondary">
              No resources found
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
