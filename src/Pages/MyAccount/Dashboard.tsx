import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Chip, CircularProgress, IconButton, Tooltip } from "@mui/material";
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchUserAndConsultations, type UserWithConsultations, type ConsultationItem } from "../../api/dashboard";
import ReviewModal from "../../components/ReviewModal";
import EditProfile from "./EditProfile";
import { useAuth } from "../../context/AuthContext";
import type { UserProfile } from "../../api/dashboard";

const formatDateTime = (value?: string) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.toLocaleDateString("it-IT")} · ${d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
};


export default function Dashboard() {
    const { user: authUser, login, isLoading: authLoading } = useAuth();
    const [data, setData] = useState<UserWithConsultations | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Extract load function so we can reuse it for refresh
    //se utente gia fatto una richiesta, backend lo trova e  qui fa fetch tutti
    const loadConsultations = useCallback(async () => {
        if (!authUser) return;

        setLoading(true);
        setError(null);
        try {
            // We use authUser for user details, but fetch consultations freshly
            const res = await fetchUserAndConsultations(authUser.id);
            const consultations = (res.consultations || []).map((c: any): ConsultationItem => ({
                id: c.id,
                doctorName:
                    c.doctorName ||
                    `${c.doctor?.firstName ?? ""} ${c.doctor?.lastName ?? ""}`.trim() ||
                    (c.doctorId ? `Dott. #${c.doctorId}` : "-"),
                doctorSpecialty: c.doctorSpecialty || c.doctor?.specialty || "-",
                doctorCity: c.doctor?.city,
                appointmentDate: c.appointmentDate,
                appointmentTime: c.appointmentTime,
                requestDate: c.requestDate || c.createdAt || c.requestDateTime || c.requestDatetime || c.request_date_time || "",
                requestDateTime: c.requestDateTime || c.requestDatetime || c.request_date_time || "",
                problemSummary: c.problemSummary,
                doctorId: c.doctorId,
                problem: c.problemSummary || c.symptomsDescription || c.problem || "-",
            }));

            // sort by requestDateTime/appointmentDate descending (latest first)
            consultations.sort((a, b) => {
                const timeA = new Date(a.requestDateTime || a.requestDate || a.appointmentDate || "").getTime();
                const timeB = new Date(b.requestDateTime || b.requestDate || b.appointmentDate || "").getTime();
                return timeB - timeA;
            });

            const normalized: UserWithConsultations = {
                user: res.user,
                consultations,
            };
            setData(normalized);
        } catch (err) {
            setError("Errore nel caricamento delle consultazioni.");
        } finally {
            setLoading(false);
        }
    }, [authUser]);

    useEffect(() => {
        // If auth is strictly loading, wait.
        if (authLoading) return;

        // If auth finished and no user, Dashboard shouldn't really be visible (protected by parent), 
        // but if it is, we can't fetch data.
        if (!authUser) {
            // Maybe set error or just return
            return;
        }

        loadConsultations();
    }, [authUser, authLoading, loadConsultations]);

    const fullName = useMemo(() => {//memorizza il nome del utente per mostrare nel profilo
        // prioritize data.user if available, else authUser
        const u = data?.user || authUser;
        const apiName = `${u?.firstName ?? ""} ${u?.lastName ?? ""}`.trim();
        return apiName || "Ospite";
    }, [data, authUser]);

    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedDoctorForReview, setSelectedDoctorForReview] = useState<{ id: number, name: string } | null>(null);
    const [view, setView] = useState<'dashboard' | 'editProfile'>('dashboard');

    if (authLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
                <CircularProgress />
            </Box>
        );
    }

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
                <Box
                    onClick={() => setView('dashboard')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        bgcolor: view === 'dashboard' ? '#E0E7FF' : 'transparent',
                        color: view === 'dashboard' ? '#2E6BFF' : '#64748B',
                        borderRadius: 3,
                        cursor: 'pointer',
                        mb: 1,
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: view === 'dashboard' ? '#E0E7FF' : '#F1F5F9' }
                    }}
                >
                    <GridViewRoundedIcon />
                    <Typography fontWeight={600}>Dashboard</Typography>
                </Box>
                <Box
                    onClick={() => setView('editProfile')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        bgcolor: view === 'editProfile' ? '#E0E7FF' : 'transparent',
                        color: view === 'editProfile' ? '#2E6BFF' : '#64748B',
                        borderRadius: 3,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: view === 'editProfile' ? '#E0E7FF' : '#F1F5F9' }
                    }}
                >
                    <ManageAccountsRoundedIcon />
                    <Typography fontWeight={600}>Modifica dati personali</Typography>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#1B2430' }}>
                        {view === 'dashboard' ? 'Dashboard' : 'Il tuo Profilo'}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                        <Typography fontWeight={600} sx={{ color: '#1B2430' }}>
                            {fullName || "Ospite"}
                        </Typography>
                        <KeyboardArrowDownRoundedIcon sx={{ color: '#64748B' }} />
                    </Box>
                </Box>

                {view === 'dashboard' ? (
                    <>
                        {/* Welcome Card */}
                        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#fff', boxShadow: '0px 4px 20px rgba(0,0,0,0.02)' }}>
                            <Typography variant="h5" fontWeight={600} sx={{ color: '#1B2430' }}>
                                Benvenuto {fullName}
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ color: '#1B2430' }}>
                                    i tuoi appuntamento
                                </Typography>
                                <Tooltip title="Aggiorna lista">
                                    <IconButton
                                        onClick={loadConsultations}
                                        disabled={loading}
                                        sx={{
                                            color: '#2E6BFF',
                                            '&:hover': { bgcolor: 'rgba(46, 107, 255, 0.08)' }
                                        }}
                                    >
                                        <RefreshRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            {loading && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748B' }}>
                                    <CircularProgress size={18} />
                                    <Typography>Caricamento consultazioni...</Typography>
                                </Box>
                            )}

                            {error && (
                                <Typography sx={{ color: '#d32f2f', fontWeight: 600 }}>{error}</Typography>
                            )}

                            {!loading && !error && data && data.consultations && data.consultations.length === 0 && (
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 200,
                                    bgcolor: '#F8F9FA',
                                    borderRadius: 3,
                                    border: '2px dashed #E2E8F0'
                                }}>
                                    <Typography sx={{ color: '#94A3B8', fontWeight: 500 }}>
                                        Nessun appuntamento programmato
                                    </Typography>
                                </Box>
                            )}

                            {!loading && !error && (data?.consultations?.length ?? 0) > 0 && (
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                                            <TableCell>No</TableCell>
                                            <TableCell>DOCTOR</TableCell>
                                            <TableCell>PROBLEMA</TableCell>
                                            <TableCell>DATA RICHIESTA</TableCell>
                                            <TableCell>DATA APPUNTAMENTO</TableCell>
                                            <TableCell align="right">RECENSIONI</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.consultations.map((c, idx) => (
                                            <TableRow key={c.id ?? idx}>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Typography fontWeight={700}>{c.doctorName}</Typography>
                                                        <Typography variant="body2" sx={{ color: '#64748B' }}>
                                                            {c.doctorSpecialty}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{c.problemSummary || c.problem || "-"}</TableCell>
                                                <TableCell>{formatDateTime(c.requestDateTime || c.requestDate) || "-"}</TableCell>
                                                <TableCell>
                                                    {c.appointmentDate ? (
                                                        <Chip
                                                            label={`${c.appointmentDate}${c.appointmentTime ? ` · ${c.appointmentTime}` : ""}`}
                                                            size="small"
                                                            sx={{ bgcolor: '#EEF2FF', color: '#1E3A8A', fontWeight: 600 }}
                                                        />
                                                    ) : (
                                                        "-"
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        size="small"
                                                        startIcon={<RateReviewRoundedIcon />}
                                                        sx={{ textTransform: 'none' }}
                                                        onClick={() => {
                                                            // Extract doctor ID from consultation if available, or fallback
                                                            // Since API might not return doctorId directly in all DTOs, check c.doctorId or parse
                                                            // For now assuming c.doctorId exists or we can't link it.
                                                            if (c.doctorId) {
                                                                setSelectedDoctorForReview({
                                                                    id: c.doctorId,
                                                                    name: c.doctorName || ""
                                                                });
                                                                setReviewModalOpen(true);
                                                            } else {
                                                                alert("Dati del medico non completi per la recensione.");
                                                            }
                                                        }}
                                                    >
                                                        recensioni
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </Paper>
                    </>
                ) : (
                    (data?.user || authUser) && (
                        <EditProfile
                            user={(data?.user || authUser) as UserProfile}
                            onUpdate={(updated) => {
                                // update local state
                                if (data) {
                                    setData({ ...data, user: updated });
                                    // sync context
                                    login(updated as any);
                                }
                            }}
                            onCancel={() => setView('dashboard')}
                        />
                    )
                )}

            </Box>

            {/* Review Modal */}
            {selectedDoctorForReview && (
                <ReviewModal
                    open={reviewModalOpen}
                    onClose={() => setReviewModalOpen(false)}
                    doctorId={selectedDoctorForReview.id}
                    doctorName={selectedDoctorForReview.name}
                    canReview={true} // Enabled since they have a consultation
                    initialView="form" // Open directly to form
                />
            )}
        </Box>
    );
}


