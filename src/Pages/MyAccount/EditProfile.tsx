import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    CircularProgress,
    Alert
} from "@mui/material";
import { type UserProfile, updateUser } from "../../api/dashboard";

interface EditProfileProps {
    user: UserProfile;
    onUpdate: (updatedUser: UserProfile) => void;
    onCancel: () => void;
}

export default function EditProfile({ user, onUpdate, onCancel }: EditProfileProps) {
    const [formData, setFormData] = useState<Partial<UserProfile>>({
        firstName: user.firstName,
        lastName: user.lastName,
        mobileNumber: user.mobileNumber,
        codiceFiscale: user.codiceFiscale,
        birthDate: user.birthDate,
        heightCm: user.heightCm,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Sanitize data: convert empty strings to null for optional fields
            const payload = {
                ...formData,
                heightCm: formData.heightCm ? Number(formData.heightCm) : null,
                birthDate: formData.birthDate || null,
                // Ensure mandatory fields are at least empty string if null (though required prop on input handles this usually)
                firstName: formData.firstName,
                lastName: formData.lastName,
                mobileNumber: formData.mobileNumber,
                codiceFiscale: formData.codiceFiscale
            };

            const updated = await updateUser(user.id, payload);
            setSuccess(true);
            onUpdate(updated);
            // Optional: auto-return to dashboard after delay or let user choose
        } catch (err) {
            console.error(err);
            setError("Errore nell'aggiornamento dei dati. Riprova.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: '#fff', boxShadow: '0px 4px 20px rgba(0,0,0,0.02)' }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                Modifica Dati Personali
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Dati aggiornati con successo!</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Nome"
                            name="firstName"
                            fullWidth
                            value={formData.firstName || ""}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Cognome"
                            name="lastName"
                            fullWidth
                            value={formData.lastName || ""}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Codice Fiscale"
                            name="codiceFiscale"
                            fullWidth
                            value={formData.codiceFiscale || ""}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Numero di Telefono"
                            name="mobileNumber"
                            fullWidth
                            value={formData.mobileNumber || ""}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Data di Nascita"
                            name="birthDate"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={formData.birthDate || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Altezza (cm)"
                            name="heightCm"
                            type="number"
                            fullWidth
                            value={formData.heightCm || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button onClick={onCancel} disabled={loading} color="inherit">
                        Annulla
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? "Salvataggio..." : "Salva Modifiche"}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
