import { Box, Typography, Paper } from "@mui/material";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SymptomForm from "./SymptomForm";

export default function Dashboard() {
    return (
        <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 80px)', bgcolor: '#F8F9FA' }}>
            {/* Sidebar */}
            <Box sx={{
                width: 280,
                bgcolor: '#fff',
                borderRight: '1px solid rgba(0,0,0,0.05)',
                display: { xs: 'none', md: 'block' },
                p: 3
            }}>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, letterSpacing: 1, mb: 2, display: 'block' }}>
                    MENU
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    bgcolor: '#E0E7FF',
                    color: '#2E6BFF',
                    borderRadius: 3,
                    cursor: 'pointer'
                }}>
                    <GridViewRoundedIcon />
                    <Typography fontWeight={600}>Dashboard</Typography>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#1B2430' }}>
                        Dashboard
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                        <Typography fontWeight={600} sx={{ color: '#1B2430' }}>Hamed Darzi</Typography>
                        <KeyboardArrowDownRoundedIcon sx={{ color: '#64748B' }} />
                    </Box>
                </Box>

                {/* Welcome Card */}
                <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#fff', boxShadow: '0px 4px 20px rgba(0,0,0,0.02)' }}>
                    <Typography variant="h5" fontWeight={600} sx={{ color: '#1B2430' }}>
                        Benvenuto Hamed Darzi
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #E2E8F0', px: 2, py: 1, borderRadius: 2 }}>
                        <CalendarTodayRoundedIcon sx={{ fontSize: 20, color: '#64748B' }} />
                        <Typography variant="body2" fontWeight={600} sx={{ color: '#64748B' }}>
                            {new Date().toLocaleDateString('en-GB')}
                        </Typography>
                    </Box>
                </Paper>

                {/* Appointments Section */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: '#fff', minHeight: 400, boxShadow: '0px 4px 20px rgba(0,0,0,0.02)' }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#1B2430', mb: 3 }}>
                        i tuoi appuntamento
                    </Typography>

                    {/* Placeholder for future content */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 300,
                        bgcolor: '#F8F9FA',
                        borderRadius: 3,
                        border: '2px dashed #E2E8F0'
                    }}>
                        <Typography sx={{ color: '#94A3B8', fontWeight: 500 }}>
                            Nessun appuntamento programmato
                        </Typography>
                    </Box>
                </Paper>

                {/* Symptom Questionnaire Form */}
                <SymptomForm />
            </Box>
        </Box>
    );
}
