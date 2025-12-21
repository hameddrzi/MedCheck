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
import { useState } from "react";
import Header from "../../components/Header";
import DoctorCard from "./DoctorCard";
import { mockDoctors } from "./mockDoctors";

export default function Doctors() {
    const [searchTerm, setSearchTerm] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("all");

    // Get unique specialties
    const specialties = Array.from(
        new Set(mockDoctors.map((doctor) => doctor.specialty))
    );

    // Filter doctors
    const filteredDoctors = mockDoctors.filter((doctor) => {
        const matchesSearch =
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

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
                        {filteredDoctors.length} medic{filteredDoctors.length === 1 ? "o" : "i"}{" "}
                        trovat{filteredDoctors.length === 1 ? "o" : "i"}
                    </Typography>

                    {/* Doctors Grid */}
                    <Grid container spacing={3}>
                        {filteredDoctors.map((doctor) => (
                            <Grid item xs={12} md={6} lg={4} key={doctor.id}>
                                <DoctorCard doctor={doctor} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* No Results */}
                    {filteredDoctors.length === 0 && (
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
