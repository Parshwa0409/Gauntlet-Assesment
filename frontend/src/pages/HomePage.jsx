
import { useState } from 'react';
import OutlinedCard from '../components/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Footer from '../components/Footer';
import ButtonGroup from '@mui/material/ButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function HomePage() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [footerStats, setFooterStats] = useState(null);
    const [viewMode, setViewMode] = useState('card');
    const [credentials, setCredentials] = useState({
        access_key_id: '',
        secret_access_key: '',
        region: '',
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleCheckStatus = async () => {
        if (!credentials.access_key_id || !credentials.secret_access_key || !credentials.region) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);
        setOpenModal(false);

        try {
            const result = await fetch('http://localhost:8000/api/v1/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!result.ok) {
                throw new Error('Failed to fetch status');
            }

            const data = await result.json();
            setResponse(data);
            
            // Extract summary stats from API response
            if (data.summary) {
                setFooterStats(data.summary);
            }
            resetForm();
        } catch (err) {
            setError(err.message || 'An error occurred');
            resetForm();
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCredentials({
            access_key_id: '',
            secret_access_key: '',
            region: '',
        });
    };

    return (
        <>
        <Container maxWidth={false} sx={{ width: '95%', py: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                    onClick={handleOpenModal}
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

                {response && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            onClick={() => setViewMode('card')}
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
                            onClick={() => setViewMode('table')}
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
                )}
            </Box>

            {/* Credentials Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
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
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Enter your AWS Access Key ID"
                        />
                        <TextField
                            label="Secret Access Key"
                            name="secret_access_key"
                            value={credentials.secret_access_key}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="e.g., us-east-1"
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseModal} variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCheckStatus}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {error && !openModal && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {response && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        Scan Results
                    </Typography>

                    {/* Card View */}
                    {viewMode === 'card' && (
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
                            {response.data && Array.isArray(response.data) && response.data.length > 0 ? (
                                response.data.map((item, index) => (
                                    <Card
                                        key={index}
                                        sx={{
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
                    )}

                    {/* Table View */}
                    {viewMode === 'table' && (
                        <TableContainer component={Card} sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#667eea' }}>
                                    <TableRow>
                                        {response.data && response.data.length > 0 &&
                                            Object.keys(response.data[0]).map((key) => (
                                                <TableCell key={key} sx={{ color: '#fff', fontWeight: 700, fontSize: '14px', padding: '16px' }}>
                                                    {key.replace(/_/g, ' ').toUpperCase()}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {response.data && Array.isArray(response.data) && response.data.length > 0 ? (
                                        response.data.map((item, index) => (
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
                                                    const lowerKey = key.toLowerCase();
                                                    const lowerValue = String(value).toLowerCase();
                                                    
                                                    // Determine text color based on risk and compliance status
                                                    let statusColor = '#333';
                                                    
                                                    if (lowerKey.includes('risk')) {
                                                        if (lowerValue.includes('high')) {
                                                            statusColor = '#ef5350';
                                                        } else if (lowerValue.includes('low')) {
                                                            statusColor = '#66bb6a';
                                                        }
                                                    } else if (lowerKey.includes('compliance') || lowerKey.includes('pass') || lowerKey.includes('fail')) {
                                                        if (lowerValue === 'pass' || lowerValue.includes('complian')) {
                                                            statusColor = '#66bb6a';
                                                        } else if (lowerValue === 'fail' || lowerValue.includes('non-complian')) {
                                                            statusColor = '#ef5350';
                                                        }
                                                    }
                                                    
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
                    )}
                </Box>
            )}
        </Container>
        {footerStats && <Footer footerStats={footerStats} />}
        </>
    );
}