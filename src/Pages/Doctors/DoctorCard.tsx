import {
    Card,
    CardContent,
    Typography,
    Box,
    Rating,
    Chip,
    Divider,
    Avatar,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import type { Doctor } from "../../types/doctor";
import DoctorReviews from "./DoctorReviews";


interface DoctorCardProps {
    doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    const avatarLetter =
        doctor.lastName?.[0] || doctor.firstName?.[0] || doctor.fullName?.[0] || "M";
    const hasCompletedVisit = false; // placeholder until real visit validation is wired

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: "0px 8px 30px rgba(46,107,255,0.15)",
                    transform: "translateY(-4px)",
                },
            }}
        >
            <CardContent sx={{ p: 3, flexGrow: 1 }}>
                {/* Doctor Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: "#2E6BFF",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                        }}
                    >
                        {avatarLetter}
                    </Avatar>
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                            {doctor.firstName} {doctor.lastName}
                        </Typography>
                        <Chip
                            label={doctor.specialty}
                            size="small"
                            sx={{
                                bgcolor: "rgba(46,107,255,0.1)",
                                color: "#2E6BFF",
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                </Box>

                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Rating value={doctor.rating} precision={0.1} readOnly size="small" />
                    <Typography
                        variant="body2"
                        sx={{ ml: 1, fontWeight: 600, color: "#1B2430" }}
                    >
                        {doctor.rating.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 0.5, color: "rgba(0,0,0,0.6)" }}>
                        ({doctor.reviewsCount} recensioni)
                    </Typography>
                </Box>

                {/* Address */}
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}>
                    <LocationOnIcon
                        sx={{ fontSize: 20, color: "rgba(0,0,0,0.6)", mr: 1, mt: 0.2 }}
                    />
                    <Box>
                        <Typography variant="body2" sx={{ color: "#1B2430" }}>
                            {doctor.address}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.6)" }}>
                            {doctor.city}
                        </Typography>
                    </Box>
                </Box>

                {/* Contact Info */}
                {doctor.phone && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <PhoneIcon
                            sx={{ fontSize: 18, color: "rgba(0,0,0,0.6)", mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)" }}>
                            {doctor.phone}
                        </Typography>
                    </Box>
                )}

                {doctor.email && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <EmailIcon
                            sx={{ fontSize: 18, color: "rgba(0,0,0,0.6)", mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)" }}>
                            {doctor.email}
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <DoctorReviews
                    doctorId={doctor.id}
                    canReview={hasCompletedVisit}
                />
            </CardContent>
        </Card>
    );
}
