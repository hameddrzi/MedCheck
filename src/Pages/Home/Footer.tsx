import { Box, Typography, Container, Link } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0A0F1F",
        color: "white",
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo + description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "12px",
                  backgroundColor: "#2E6BFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 1.5,
                  color: "white",
                }}
              >
                <HealthAndSafetyRoundedIcon fontSize="small" />
              </Box>
              <Typography variant="h6" fontWeight={700}>
                MedCheck
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.7)", maxWidth: 280 }}
            >
              Pre-valutazione dei sintomi e consulto medico rapido online.
            </Typography>
          </Grid>

          {/* Services */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 2, fontSize: "1rem" }}
            >
              Servizi
            </Typography>

            <Link href="#" underline="none" sx={linkStyle}>
              Pre-valutazione sintomi
            </Link>
            <Link href="#" underline="none" sx={linkStyle}>
              Consulto medico online
            </Link>
            <Link href="#" underline="none" sx={linkStyle}>
              Ricerca medici
            </Link>
          </Grid>

          {/* Support */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 2, fontSize: "1rem" }}
            >
              Supporto
            </Typography>

            <Link href="#" underline="none" sx={linkStyle}>
              Come funziona
            </Link>
            <Link href="#" underline="none" sx={linkStyle}>
              FAQ
            </Link>
            <Link href="#" underline="none" sx={linkStyle}>
              Contatti
            </Link>
          </Grid>

          {/* Legal */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 2, fontSize: "1rem" }}
            >
              Legale
            </Typography>


            <Link href="#" underline="none" sx={linkStyle}>
              Termini di servizio
            </Link>
            <Link href="#" underline="none" sx={linkStyle}>
              Cookie Policy
            </Link>
          </Grid>
        </Grid>

        {/* separator */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            mt: { xs: 6, md: 8 },
            pt: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}
          >
            © 2025 MedCheck. Tutti i diritti riservati.
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.5)", maxWidth: 600 }}
          >
            Questo servizio non sostituisce una visita medica professionale. In
            caso di emergenza, contattare il pronto soccorso o il 118.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

const linkStyle = {
  display: "block",
  color: "rgba(255,255,255,0.7)",
  fontSize: "0.9rem",
  mb: 1.2,
  transition: "0.2s",
  "&:hover": { color: "white" },
};
