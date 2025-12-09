import Grid from "@mui/material/GridLegacy";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface StepItem {
  number: string;
  title: string;
  text: string;
}

export default function Steps() {
  const steps: StepItem[] = [
    {
      number: "1",
      title: "Compila il Questionario",
      text: "Inserisci i tuoi dati personali e descrivi i sintomi che stai avvertendo.",
    },
    {
      number: "2",
      title: "Seleziona un Medico",
      text: "Scegli un medico disponibile nella tua zona geografica.",
    },
    {
      number: "3",
      title: "Ricevi il Consulto",
      text: "Il medico valuterà i tuoi sintomi e ti fornirà indicazioni chiare.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6.5, md: 9 },
        background: "linear-gradient(180deg, #F8FBFF 0%, #F2F7FF 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 1, color: "#1a2b4f" }}
        >
          Come funziona
        </Typography>

        <Typography
          textAlign="center"
          sx={{
            mb: { xs: 5, md: 6.5 },
            color: "#3c4a65",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Tre semplici passaggi per ricevere il tuo consulto medico
        </Typography>

        <Box
          sx={{
            position: "relative",
            maxWidth: 1020,
            mx: "auto",
            px: { xs: 1, md: 1 },
          }}
        >
          {/* connecting line */}
          <Box
            sx={{
              position: "absolute",
              top: 38,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, transparent 5%, #e1e9ff 20%, #e1e9ff 80%, transparent 95%)",
              zIndex: 0,
            }}
          />

          <Grid container spacing={{ xs: 2.5, md: 3 }} justifyContent="center">
            {steps.map((step) => (
              <Grid item key={step.number} xs={12} md={4}>
                <Box
                  textAlign="left"
                  sx={{
                    px: { xs: 2.2, md: 2.8 },
                    pt: 4.5,
                    pb: 3.2,
                    borderRadius: 3,
                    boxShadow: "0px 12px 30px rgba(0,0,0,0.06)",
                    backgroundColor: "white",
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -16,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "#0d6efd",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1rem",
                      boxShadow: "0px 10px 24px rgba(13,110,253,0.32)",
                    }}
                  >
                    {step.number}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 1.2, color: "#1e2f53", fontSize: "1.05rem" }}
                  >
                    {step.title}
                  </Typography>

                  <Typography sx={{ color: "#4a5877", lineHeight: 1.55, fontSize: "0.97rem" }}>
                    {step.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
