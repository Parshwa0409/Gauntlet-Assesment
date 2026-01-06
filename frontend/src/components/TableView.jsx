import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function TableView({ data }) {
  // Helper function to determine text color based on risk/compliance status
  const getStatusColor = (key, value) => {
    const lowerKey = key.toLowerCase();
    const lowerValue = String(value).toLowerCase();
    
    if (lowerKey.includes('risk')) {
      if (lowerValue.includes('high')) {
        return '#ef5350'; // Red
      } else if (lowerValue.includes('low')) {
        return '#66bb6a'; // Green
      }
    } else if (lowerKey.includes('compliance') || lowerKey.includes('pass') || lowerKey.includes('fail')) {
      if (lowerValue === 'pass' || lowerValue.includes('complian')) {
        return '#66bb6a'; // Green
      } else if (lowerValue === 'fail' || lowerValue.includes('non-complian')) {
        return '#ef5350'; // Red
      }
    }
    
    return '#333'; // Default color
  };

  return (
    <TableContainer component={Card} sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#667eea' }}>
          <TableRow>
            {data && data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <TableCell key={key} sx={{ color: '#fff', fontWeight: 700, fontSize: '14px', padding: '16px' }}>
                  {key.replace(/_/g, ' ').toUpperCase()}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data && Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow 
                key={index} 
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                  }, 
                  transition: 'all 0.3s ease',
                  borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
                  '& .MuiTableCell-body': { padding: '16px' }
                }}
              >
                {Object.entries(item).map(([key, value]) => {
                  const statusColor = getStatusColor(key, value);
                  const cellContent = typeof value === 'object' ? JSON.stringify(value) : String(value);
                  
                  return (
                    <TableCell 
                      key={key} 
                      sx={{ 
                        color: statusColor,
                        fontWeight: statusColor !== '#333' ? 600 : 500,
                      }}
                    >
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                No resources found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
