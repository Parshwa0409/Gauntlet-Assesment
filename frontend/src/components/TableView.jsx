import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';

const RiskLevelChip = ({ riskLevel }) => {
    const isHighRisk = riskLevel === 'HIGH';
    return (
        <Chip
            label={riskLevel}
            color={isHighRisk ? 'error' : 'success'}
            size="small"
            sx={{
                fontWeight: 700,
                color: '#fff',
                backgroundColor: isHighRisk ? '#ef5350' : '#66bb6a',
            }}
        />
    );
};


export default function TableView({ data }) {
    const columns = ['Resource Name/ID', 'Type', 'Status', 'Risk Level'];

    return (
        <TableContainer component={Card} sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#667eea' }}>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell key={col} sx={{ color: '#fff', fontWeight: 700 }}>
                                {col}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && Array.isArray(data) && data.length > 0 ? (
                        data.map((item) => (
                            <Tooltip
                                key={item.id}
                                title={<pre>{JSON.stringify(item.metadata, null, 2)}</pre>}
                                placement="top"
                                arrow
                            >
                                <TableRow
                                    sx={{ '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.05)' } }}
                                >
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        <RiskLevelChip riskLevel={item.risk_level} />
                                    </TableCell>
                                </TableRow>
                            </Tooltip>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                                <Typography>No resources found for the current filter.</Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
