import { Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

export default function Features() {
  const items = [
    {
      title: "Consulto Rapido",
      text: "Ricevi una risposta da un medico qualificato senza lunghe attese.",
      icon: FlashOnRoundedIcon,
    },
    {
      title: "Sicuro e Riservato",
      text: "I tuoi dati medici sono protetti e trattati con la massima riservatezza.",
      icon: ShieldRoundedIcon,
    },
    {
      title: "Medici Qualificati",
      text: "Connettiti con medici certificati nella tua zona geografica.",
      icon: Groups2RoundedIcon,
    },
    {
      title: "Pre-valutazione Accurata",
      text: "Comprendi il livello di urgenza dei tuoi sintomi prima della visita.",
      icon: FavoriteBorderRoundedIcon,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 7, md: 9 },
        textAlign: "center",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 } }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: "#1a2b4f" }}>
          Perché scegliere MedCheck
        </Typography>

        <Typography
          sx={{
            maxWidth: 720,
            mx: "auto",
            mb: { xs: 5, md: 7 },
            color: "#3c4a65",
          }}
        >
          Un servizio pensato per aiutarti a gestire meglio la tua salute,
          riducendo ansia e accessi non necessari alle strutture sanitarie
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <Box sx={{ textAlign: "center", px: { xs: 1, md: 2 } }}>
                  <Box
                    sx={{
                      width: 62,
                      height: 62,
                      borderRadius: "18px",
                      backgroundColor: "#eaf2ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                      color: "#2e6bff",
                    }}
                  >
                    <Icon fontSize="medium" />
                  </Box>
                  <Typography fontWeight={700} sx={{ mb: 1, color: "#1e2f53" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#475775" }}>{item.text}</Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
