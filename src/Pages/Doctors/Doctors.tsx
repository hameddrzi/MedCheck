import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import DoctorCard from "./DoctorCard";
import { fetchDoctors } from "../../api/doctorsApi";
import type { Doctor } from "../../types/doctor";

export default function Doctors() {
    const [searchTerm, setSearchTerm] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("all");
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; //se componente UnMounted ma ancora API non da risposta, evita di setState

        const loadDoctors = async () => {
            setLoading(true);
            setError(null);
            try {
                const { doctors: fetchedDoctors } = await fetchDoctors({ size: 100 });
                if (isMounted) {
                    setDoctors(fetchedDoctors); // mette i nomi dei dottori in seDoctors
                }
            } catch (err) {
                if (isMounted) {
                    setError("Errore nel caricamento dei medici. Riprova più tardi.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false); // se falisce o riuscire => chiude tutto
                }
            }
        };

        loadDoctors();
        return () => {
            isMounted = false;
        };
    }, []);

    // get speciality e crea new array e cancella dopplicate speciality
    const specialties = useMemo(
        () => Array.from(new Set(doctors.map((doctor) => doctor.specialty))),
        [doctors]
    );

    // Filter doctors
    const filteredDoctors = doctors.filter((doctor) => {
        const loweredSearch = searchTerm.toLowerCase();
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        const matchesSearch =
            fullName.includes(loweredSearch) ||
            doctor.city.toLowerCase().includes(loweredSearch) ||
            doctor.specialty.toLowerCase().includes(loweredSearch);

        const matchesSpecialty =
            specialtyFilter === "all" || doctor.specialty === specialtyFilter;

        return matchesSearch && matchesSpecialty;
    });

    return (
        <>
            <Header />
            <Box
                sx={{
                    pt: { xs: 4, md: 6 },
                    pb: { xs: 8, md: 12 },
                    background:
                        "radial-gradient(circle at 10% 10%, rgba(46,107,255,0.08), transparent 35%), radial-gradient(circle at 90% 20%, rgba(46,107,255,0.05), transparent 35%), #fff",
                    minHeight: "100vh",
                }}
            >
                <Container maxWidth="lg">
                    {/* Header Section */}
                    <Box sx={{ mb: 5 }}>
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                mb: 2,
                                fontSize: { xs: "2rem", md: "2.5rem" },
                                color: "#1B2430",
                            }}
                        >
                            I Nostri Medici
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgba(15,23,42,0.75)",
                                fontSize: "1.05rem",
                                maxWidth: 700,
                            }}
                        >
                            Trova il medico più adatto alle tue esigenze. Tutti i nostri
                            professionisti sono qualificati e pronti ad aiutarti.
                        </Typography>
                    </Box>

                    {/* Search and Filter Section */}
                    <Box sx={{ mb: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    placeholder="Cerca per nome, città o specialità..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: "rgba(0,0,0,0.5)" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 2,
                                            backgroundColor: "white",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Specialità</InputLabel>
                                    <Select
                                        value={specialtyFilter}
                                        label="Specialità"
                                        onChange={(e) => setSpecialtyFilter(e.target.value)}
                                        sx={{
                                            borderRadius: 2,
                                            backgroundColor: "white",
                                        }}
                                    >
                                        <MenuItem value="all">Tutte le specialità</MenuItem>
                                        {specialties.map((specialty) => (
                                            <MenuItem key={specialty} value={specialty}>
                                                {specialty}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Results Count */}
                    <Typography
                        variant="body2"
                        sx={{ mb: 3, color: "rgba(0,0,0,0.6)", fontWeight: 500 }}
                    >
                        {loading
                            ? "Caricamento medici..."
                            : `${filteredDoctors.length} medic${
                                  filteredDoctors.length === 1 ? "o" : "i"
                              } trovat${filteredDoctors.length === 1 ? "o" : "i"}`}
                    </Typography>

                    {error && (
                        <Box
                            sx={{
                                mb: 3,
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: "rgba(244, 67, 54, 0.08)",
                                color: "#c62828",
                                fontWeight: 600,
                            }}
                        >
                            {error}
                        </Box>
                    )}

                    {/* Doctors Grid */}
                    <Grid container spacing={3} sx={{ opacity: loading ? 0.6 : 1 }}>
                        {loading
                            ? Array.from({ length: 6 }).map((_, idx) => (
                                  <Grid item xs={12} md={6} lg={4} key={idx}>
                                      <Box
                                          sx={{
                                              height: "100%",
                                              borderRadius: 3,
                                              backgroundColor: "#f5f7fb",
                                              boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
                                              p: 3,
                                          }}
                                      />
                                  </Grid>
                              ))
                            : filteredDoctors.map((doctor) => (//manda ogni dottore
                                  <Grid item xs={12} md={6} lg={4} key={doctor.id}>
                                      <DoctorCard doctor={doctor} />{/**chiama child with props */}
                                  </Grid>
                              ))}
                    </Grid>

                    {/* No Results */}
                    {!loading && filteredDoctors.length === 0 && (
                        <Box
                            sx={{
                                textAlign: "center",
                                py: 8,
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.6)", mb: 1 }}>
                                Nessun medico trovato
                            </Typography>
                            <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.5)" }}>
                                Prova a modificare i filtri di ricerca
                            </Typography>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
}
