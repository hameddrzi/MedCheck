import { Box, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Paper } from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';

export default function SymptomForm() {
    return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: '#fff', boxShadow: '0px 4px 20px rgba(0,0,0,0.02)', mt: 4 }}>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#1B2430', mb: 1 }}>
                Questionario Sintomi
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', mb: 4 }}>
                Compilare con attenzione tutte le informazioni richieste. Questi dati aiuteranno il medico a fornire un consulto accurato.
            </Typography>

            {/* Dati Personali */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Box sx={{ bgcolor: '#E0E7FF', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <PersonRoundedIcon sx={{ color: '#2E6BFF', fontSize: 20 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} sx={{ color: '#1B2430' }}>
                        Dati Personali
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Nome" required variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Cognome" required variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                    </Grid>

                    {/* Codice Fiscale - Requested Field */}
                    <Grid item xs={12}>
                        <TextField fullWidth label="Codice Fiscale" required variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel>Sesso *</InputLabel>
                            <Select label="Sesso *" defaultValue="" sx={{ borderRadius: 2 }}>
                                <MenuItem value="M">Maschio</MenuItem>
                                <MenuItem value="F">Femmina</MenuItem>
                                <MenuItem value="O">Altro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Età" type="number" required variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Altezza (cm)" type="number" required variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Peso (kg)" type="number" required variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                    </Grid>
                </Grid>
            </Box>

            {/* Stile di Vita */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Box sx={{ bgcolor: '#E0E7FF', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <FitnessCenterRoundedIcon sx={{ color: '#2E6BFF', fontSize: 20 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} sx={{ color: '#1B2430' }}>
                        Stile di Vita
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Livello di attività fisica *</InputLabel>
                            <Select label="Livello di attività fisica *" defaultValue="" sx={{ borderRadius: 2 }}>
                                <MenuItem value="sedentary">Sedentario</MenuItem>
                                <MenuItem value="light">Leggero</MenuItem>
                                <MenuItem value="moderate">Moderato</MenuItem>
                                <MenuItem value="active">Attivo</MenuItem>
                                <MenuItem value="very_active">Molto Attivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* Storia Clinica */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Box sx={{ bgcolor: '#E0E7FF', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <LocalHospitalRoundedIcon sx={{ color: '#2E6BFF', fontSize: 20 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} sx={{ color: '#1B2430' }}>
                        Storia Clinica
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox sx={{ color: '#2E6BFF', '&.Mui-checked': { color: '#2E6BFF' } }} />}
                            label={<Typography fontWeight={500} sx={{ color: '#1B2430' }}>Ho una storia clinica di patologie pregresse</Typography>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Farmaci attualmente in uso"
                            multiline
                            rows={3}
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
