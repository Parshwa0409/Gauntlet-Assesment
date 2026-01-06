
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Summary from '../components/Summary';
import CredentialsModal from '../components/CredentialsModal';
import ViewToggle from '../components/ViewToggle';
import ErrorView from '../components/ErrorView';
import CardView from '../components/CardView';
import TableView from '../components/TableView';
import { FormControlLabel, Switch } from '@mui/material';
import InitialView from '../components/InitialView';

export default function HomePage() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [summaryStats, setSummaryStats] = useState(null);
    const [viewMode, setViewMode] = useState('card');
    const [showOnlyHighRisk, setShowOnlyHighRisk] = useState(false);
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
                setSummaryStats(data.summary);
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

    const filteredData = response ? (showOnlyHighRisk ? response.data.filter(item => item.risk_level === 'HIGH') : response.data) : [];

    const handleRetry = () => {
        setError(null);
        handleOpenModal();
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Control Bar */}
                {response && !error && (
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 4,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        borderBottom: '1px solid #e0e0e0',
                        pb: 2
                    }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showOnlyHighRisk}
                                    onChange={(e) => setShowOnlyHighRisk(e.target.checked)}
                                    color="warning"
                                />
                            }
                            label="Show High Risk Only"
                        />
                        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                    </Box>
                )}

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

                {/* Main Content */}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
                    {error && !loading ? (
                        <ErrorView error={error} onRetry={handleRetry} />
                    ) : response ? (
                        <>
                            {/* Card View */}
                            {viewMode === 'card' && <CardView data={filteredData} />}

                            {/* Table View */}
                            {viewMode === 'table' && <TableView data={filteredData} />}
                        </>
                    ) : (
                        <InitialView onCheckStatus={handleOpenModal} loading={loading} />
                    )}
                </Box>
            </Container>
            {summaryStats && <Summary summaryStats={summaryStats} />}
        </>
    );
}