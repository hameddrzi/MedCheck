import { Box, Typography, Button, Container } from "@mui/material";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #2E6BFF 0%, #1B53E5 100%)",
        py: { xs: 8, md: 12 },
        textAlign: "center",
        color: "white",
      }}
    >
      <Container maxWidth="md">
        {/* آیکن ECG */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
            }}
          >
            <MonitorHeartRoundedIcon sx={{ fontSize: 32 }} />
          </Box>
        </Box>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ mb: 2, fontSize: { xs: "1.8rem", md: "2.25rem" } }}
        >
          Hai sintomi che ti preoccupano?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: { xs: 6, md: 8 },
            fontSize: "1.2rem",
            opacity: 0.9,
          }}
        >
          Non aspettare. Ricevi subito una pre-valutazione professionale e scopri
          se è necessaria una visita medica urgente.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "#2E6BFF",
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#f1f6ff",
            },
          }}
          onClick={() => navigate("/questionario")} //naviga alla Forma
        > 
          Inizia la Pre-valutazione Gratuita
        </Button>
      </Container>
    </Box>
  );
}
