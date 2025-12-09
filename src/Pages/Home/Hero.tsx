import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import doctorImg from "../../assets/home/Drimg.jpeg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const stats = [
    { value: "1500+", label: "Medici disponibili" },
    { value: "2-4h", label: "Tempo medio risposta" },
    { value: "98%", label: "Utenti soddisfatti" },
  ];

  return (
    <Box
      sx={{
        pt: { xs: 6, md: 10 },
        pb: { xs: 10, md: 14 },
        background:
          "radial-gradient(circle at 10% 10%, rgba(46,107,255,0.08), transparent 35%), radial-gradient(circle at 90% 20%, rgba(46,107,255,0.05), transparent 35%), #fff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
          <Button
            variant="outlined"
            sx={{
              mb: 2.5,
              borderColor: "#2E6BFF",
              color: "#2E6BFF",
              fontWeight: 600,
              textTransform: "none",
              px: 2.5,
            }}
          >
            Consulto Medico Online
          </Button>

          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.35rem" } }}
          >
            Non sai se i tuoi sintomi richiedono una visita medica?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "rgba(15,23,42,0.75)",
              fontSize: "1.05rem",
              maxWidth: 560,
            }}
          >
            MedCheck ti aiuta a capire il livello di urgenza dei tuoi sintomi e
            ti mette in contatto con medici qualificati della tua zona per un
            consulto rapido.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ alignItems: { xs: "stretch", sm: "center" } }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />}
              sx={{
                px: 3,
                py: 1.3,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0px 14px 30px rgba(46,107,255,0.25)",
              }}
              onClick={() => navigate("/questionario")}
            >
              Inizia la Pre-valutazione
            </Button>
            <Button
              variant="outlined"
              sx={{
                px: 3,
                py: 1.3,
                fontWeight: 600,
                textTransform: "none",
                borderColor: "rgba(46,107,255,0.3)",
                color: "#1B2430",
                backgroundColor: "white",
              }}
            >
              Scopri di più
            </Button>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 6 }}
            sx={{ mt: 6 }}
          >
            {stats.map((item) => (
              <Box key={item.value}>
                <Typography variant="h5" fontWeight={800}>
                  {item.value}
                </Typography>
                <Typography sx={{ color: "rgba(15,23,42,0.65)" }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>

          <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              maxWidth: 540,
              ml: { md: "auto" },
            }}
          >
            <Box
              component="img"
              src={doctorImg}
              alt="Dott.ssa e paziente"
              sx={{
                width: "100%",
                borderRadius: 4,
                boxShadow: "0px 20px 60px rgba(0,0,0,0.15)",
                display: "block",
              }}
            />

            <Card
              sx={{
                position: "absolute",
                right: { xs: 12, md: -24 },
                bottom: { xs: -24, md: -28 },
                borderRadius: 3,
                boxShadow: "0px 10px 35px rgba(0,0,0,0.16)",
                minWidth: 220,
              }}
            >
              <CardContent sx={{ display: "flex", gap: 1.5, alignItems: "center", py: 2 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "12px",
                    backgroundColor: "rgba(46,107,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2E6BFF",
                  }}
                >
                  <CheckCircleRoundedIcon color="success" fontSize="medium" />
                </Box>
                <Box>
                  <Typography fontWeight={700}>Consulto completato</Typography>
                  <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)" }}>
                    con Dr. Rossi
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
