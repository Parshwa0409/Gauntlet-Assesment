
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Footer from '../components/Footer';
import CredentialsModal from '../components/CredentialsModal';
import CheckStatusButton from '../components/CheckStatusButton';
import ViewToggle from '../components/ViewToggle';
import ErrorAlert from '../components/ErrorAlert';
import CardView from '../components/CardView';
import TableView from '../components/TableView';

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
                {/* Control Bar: Check Status Button + View Toggle */}
                <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', justifyContent: 'space-between' }}>
                    <CheckStatusButton onClick={handleOpenModal} loading={loading} />
                    {response && <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />}
                </Box>

                {/* Credentials Modal */}
                <CredentialsModal 
                    open={openModal}
                    credentials={credentials}
                    error={error}
                    onClose={handleCloseModal}
                    onChange={handleInputChange}
                    onSubmit={handleCheckStatus}
                    loading={loading}
                />

                {/* Error Alert (only show if not in modal) */}
                {error && !openModal && <ErrorAlert error={error} />}

                {/* Scan Results */}
                {response && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                            Scan Results
                        </Typography>

                        {/* Card View */}
                        {viewMode === 'card' && <CardView data={response.data} />}

                        {/* Table View */}
                        {viewMode === 'table' && <TableView data={response.data} />}
                    </Box>
                )}
            </Container>
            {footerStats && <Footer footerStats={footerStats} />}
        </>
    );
}