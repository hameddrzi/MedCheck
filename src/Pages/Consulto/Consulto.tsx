import {
  Box,
  Button,
  Container,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import OnlinePredictionRoundedIcon from "@mui/icons-material/OnlinePredictionRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Header from "../../components/Header";
import GridLegacy from "@mui/material/GridLegacy";

const steps = ["Questionario", "Selezione Medico", "Consulto"];

const patientSummary = [
  { label: "Età", value: "87 anni" },
  { label: "Altezza", value: "170 cm" },
  { label: "Peso", value: "79 kg" },
  { label: "IMC", value: "27.3" },
];

const recommendations = [
  "Monitorare i sintomi nelle prossime 24 ore",
  "Mantenere una buona idratazione",
  "Riposo adeguato",
  "Se i sintomi persistono o peggiorano, prenotare una visita",
];

export default function Consulto() {
  const responseReceived = true; // toggle to false to show waiting UI

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 0% 0%, #f0f6ff 0%, transparent 35%), radial-gradient(circle at 100% 0%, #f0fff2 0%, transparent 35%), #f8fbff",
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 } }}>
        <Stepper
          activeStep={2}
          alternativeLabel
          sx={{
            mb: { xs: 4, md: 5 },
            "& .MuiStepLabel-label": { fontWeight: 600, color: "#1e2f53" },
            "& .Mui-completed .MuiStepLabel-label": { color: "#9aa4b5" },
            "& .MuiStepConnector-line": { borderColor: "#d7dce5" },
            "& .MuiStepIcon-root": {
              color: "#d7dce5",
              "&.Mui-active": { color: "#1662f3" },
              "&.Mui-completed": { color: "#1662f3" },
            },
          }}
        >
          {steps.map((label, idx) => (
            <Step key={label}>
              <StepLabel optional={idx > 2 ? "" : undefined}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0px 16px 40px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Header alert */}
          <Box
            sx={{
              backgroundColor: responseReceived ? "rgba(40,190,120,0.1)" : "rgba(22,98,243,0.08)",
              px: { xs: 3, md: 4 },
              py: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: responseReceived ? "#e5f7ed" : "#e8f0ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: responseReceived ? "#1fb26b" : "#1662f3",
                flexShrink: 0,
              }}
            >
              {responseReceived ? <CheckCircleOutlineRoundedIcon /> : <OnlinePredictionRoundedIcon />}
            </Box>
            <Box>
              <Typography fontWeight={800} sx={{ color: "#1e2f53" }}>
                {responseReceived ? "Situazione Non Urgente" : "Richiesta Inviata"}
              </Typography>
              <Typography sx={{ color: "#3f4b67" }}>
                {responseReceived
                  ? "Risposta ricevuta da Dr. Giuseppe Bianchi"
                  : "Il medico riceverà la tua richiesta e risponderà appena possibile"}
              </Typography>
              {responseReceived && (
                <Typography
                  sx={{
                    mt: 1,
                    display: "inline-block",
                    backgroundColor: "#e5f7ed",
                    color: "#1b8f5b",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Risposta del 9 dicembre alle ore 15:44
                </Typography>
              )}
            </Box>
          </Box>

          {/* Doctor card */}
          <Box sx={{ px: { xs: 3, md: 4 }, py: 3 }}>
            <GridLegacy container spacing={2} alignItems="center">
              <GridLegacy item xs={12} md={8}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "16px",
                      backgroundColor: "#eef4ff",
                      color: "#256bff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <LocalHospitalRoundedIcon />
                  </Box>
                  <Box>
                    <Typography fontWeight={800} sx={{ color: "#1e2f53" }}>
                      Dr. Giuseppe Bianchi
                    </Typography>
                    <Typography sx={{ color: "#5a6782" }}>Cardiologia</Typography>
                    <Typography sx={{ color: "#6d7a94" }}>Corso Venezia 42, Milano</Typography>
                  </Box>
                </Box>
              </GridLegacy>
              <GridLegacy item xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "#e5f7ed",
                    color: "#1b8f5b",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontWeight: 700,
                  }}
                >
                  Online
                </Box>
              </GridLegacy>
            </GridLegacy>
          </Box>

          <Divider />

          {/* summary */}
          <Box sx={{ px: { xs: 3, md: 4 }, py: 3 }}>
            <Typography fontWeight={700} sx={{ color: "#1e2f53", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <LocalHospitalRoundedIcon fontSize="small" sx={{ color: "#256bff" }} />
              Riepilogo Dati Inviati
            </Typography>
            <GridLegacy container spacing={3}>
              {patientSummary.map((item) => (
                <GridLegacy item xs={6} md={3} key={item.label}>
                  <Typography sx={{ color: "#6d7a94", mb: 0.5 }}>{item.label}:</Typography>
                  <Typography fontWeight={700} sx={{ color: "#1e2f53" }}>
                    {item.value}
                  </Typography>
                </GridLegacy>
              ))}
            </GridLegacy>
          </Box>

          <Divider />

          {/* waiting or response */}
          <Box sx={{ px: { xs: 3, md: 4 }, py: 4, textAlign: "center" }}>
            {responseReceived ? (
              <ResponseSection />
            ) : (
              <>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: "#eef4ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    color: "#256bff",
                  }}
                >
                  <RefreshRoundedIcon fontSize="large" />
                </Box>
                <Typography fontWeight={700} sx={{ color: "#1e2f53", mb: 1 }}>
                  In attesa di risposta...
                </Typography>
                <Typography sx={{ color: "#4c5975", mb: 1 }}>
                  Il Dr. Dr. Giuseppe Bianchi riceverà la tua richiesta e ti risponderà appena sarà online.
                </Typography>
                <Typography sx={{ color: "#6d7a94" }}>Tempo medio di risposta: 2-4 ore</Typography>
              </>
            )}
          </Box>

          <Divider />

          <Box
            sx={{
              px: { xs: 3, md: 4 },
              py: 3,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button variant="outlined" sx={{ textTransform: "none", fontWeight: 700, px: 3 }}>
              Nuova consultazione
            </Button>
            {responseReceived && (
              <Button variant="contained" sx={{ textTransform: "none", fontWeight: 700, px: 3 }}>
                Scarica riepilogo PDF
              </Button>
            )}
          </Box>
        </Box>

        <AlertNote />
      </Container>
    </Box>
  );
}

function ResponseSection() {
  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography
        sx={{
          backgroundColor: "#e5f7ed",
          border: "1px solid #c7eedf",
          color: "#1b8f5b",
          borderRadius: 2,
          px: 2,
          py: 1.5,
          mb: 2,
        }}
      >
        Sulla base dei sintomi descritti, la situazione non sembra richiedere intervento urgente.
      </Typography>

      <Typography fontWeight={700} sx={{ color: "#1e2f53", mb: 1 }}>
        Raccomandazioni:
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {recommendations.map((rec) => (
          <Box key={rec} sx={{ display: "flex", alignItems: "center", gap: 1, color: "#1e2f53" }}>
            <CheckRoundedIcon sx={{ color: "#1fb26b" }} />
            <Typography>{rec}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function AlertNote() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff8e1",
        border: "1px solid #ffe0a3",
        borderRadius: 2,
        mt: 3,
        px: 2.5,
        py: 2,
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
      }}
    >
      <ErrorOutlineRoundedIcon sx={{ color: "#e6a500" }} />
      <Box>
        <Typography fontWeight={700} sx={{ color: "#b38700" }}>
          Nota importante:
        </Typography>
        <Typography sx={{ color: "#9b7a00" }}>
          Questo consulto online non sostituisce una visita medica completa. In caso di sintomi gravi o peggioramento delle condizioni, rivolgersi
          immediatamente al pronto soccorso o contattare il 118.
        </Typography>
      </Box>
    </Box>
  );
}
