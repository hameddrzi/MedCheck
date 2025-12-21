import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Header from "../../components/Header";
import Grid from "@mui/material/GridLegacy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = ["Questionario", "Selezione Medico", "Consulto"];

export default function Questionnaire() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [formState, setFormState] = useState({
    nome: "",
    cognome: "",
    sesso: "",
    eta: "",
    altezza: "",
    peso: "",
    attivita: "",
    durataSintomi: "",
  });
  const [showErrors, setShowErrors] = useState(false);
  const inputRadiusSx = { "& .MuiOutlinedInput-root": { borderRadius: 2.5 } };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const requiredMissing =
    !formState.nome ||
    !formState.cognome ||
    !formState.sesso ||
    !formState.eta ||
    !formState.altezza ||
    !formState.peso ||
    !formState.attivita ||
    !formState.durataSintomi;

  const handleContinue = () => {
    if (requiredMissing) {
      setShowErrors(true);
      return;
    }
    sessionStorage.setItem("patientNome", formState.nome);
    sessionStorage.setItem("patientCognome", formState.cognome);
    navigate("/selezione-medico");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 0% 0%, #f0f6ff 0%, transparent 35%), radial-gradient(circle at 100% 0%, #f0fff2 0%, transparent 35%), #f8fbff",
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 } }}>
        <Stepper
          activeStep={0}
          alternativeLabel
          sx={{
            mb: { xs: 4, md: 5 },
            "& .MuiStepLabel-label": { fontWeight: 600, color: "#1e2f53" },
            "& .Mui-completed .MuiStepLabel-label": { color: "#9aa4b5" },
            "& .MuiStepConnector-line": { borderColor: "#d7dce5" },
            "& .MuiStepIcon-root": {
              color: "#d7dce5",
              "&.Mui-active": { color: "#1662f3" },
              "&.Mui-completed": { color: "#d7dce5" },
            },
          }}
        >
          {steps.map((label, idx) => (
            <Step key={label}>
              <StepLabel optional={idx > 0 ? "" : undefined}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0px 18px 45px rgba(0,0,0,0.08)",
            p: { xs: 3, md: 4 },
            maxWidth: 920,
            mx: "auto",
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            Questionario Sintomi
          </Typography>
          <Typography sx={{ mb: 4, color: "rgba(15,23,42,0.7)" }}>
            Compilare con attenzione tutte le informazioni richieste. Questi dati aiuteranno il medico a fornire un consulto accurato.
          </Typography>

          <SectionTitle icon={<LocalHospitalRoundedIcon />} title="Dati Personali" />
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome *"
                value={formState.nome}
                onChange={(e) => setFormState((s) => ({ ...s, nome: e.target.value }))}
                error={showErrors && !formState.nome}
                helperText={showErrors && !formState.nome ? "Campo obbligatorio" : ""}
                FormHelperTextProps={{ sx: { color: "#d32f2f" } }}
                sx={inputRadiusSx}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cognome *"
                value={formState.cognome}
                onChange={(e) => setFormState((s) => ({ ...s, cognome: e.target.value }))}
                error={showErrors && !formState.cognome}
                helperText={showErrors && !formState.cognome ? "Campo obbligatorio" : ""}
                FormHelperTextProps={{ sx: { color: "#d32f2f" } }}
                sx={inputRadiusSx}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={showErrors && !formState.sesso}>
                <InputLabel>Sesso *</InputLabel>
                <Select
                  label="Sesso *"
                  value={formState.sesso}
                  onChange={(e) => setFormState((s) => ({ ...s, sesso: e.target.value }))}
                  sx={inputRadiusSx}
                >
                  <MenuItem value="m">Maschio</MenuItem>
                  <MenuItem value="f">Femmina</MenuItem>
                  <MenuItem value="altro">Altro</MenuItem>
                </Select>
                {showErrors && !formState.sesso && (
                  <FormHelperText sx={{ color: "#d32f2f", mt: 0.5 }}>Campo obbligatorio</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Età *"
                placeholder="Es. 65"
                value={formState.eta}
                onChange={(e) => setFormState((s) => ({ ...s, eta: e.target.value }))}
                error={showErrors && !formState.eta}
                helperText={showErrors && !formState.eta ? "Campo obbligatorio" : ""}
                FormHelperTextProps={{ sx: { color: "#d32f2f" } }}
                sx={inputRadiusSx}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Altezza (cm) *"
                placeholder="Es. 170"
                value={formState.altezza}
                onChange={(e) => setFormState((s) => ({ ...s, altezza: e.target.value }))}
                error={showErrors && !formState.altezza}
                helperText={showErrors && !formState.altezza ? "Campo obbligatorio" : ""}
                FormHelperTextProps={{ sx: { color: "#d32f2f" } }}
                sx={inputRadiusSx}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Peso (kg) *"
                placeholder="Es. 70"
                value={formState.peso}
                onChange={(e) => setFormState((s) => ({ ...s, peso: e.target.value }))}
                error={showErrors && !formState.peso}
                helperText={showErrors && !formState.peso ? "Campo obbligatorio" : ""}
                FormHelperTextProps={{ sx: { color: "#d32f2f" } }}
                sx={inputRadiusSx}
              />
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} />

          <SectionTitle icon={<FitnessCenterRoundedIcon />} title="Stile di Vita" />
          <FormControl fullWidth sx={{ mb: 4 }} error={showErrors && !formState.attivita}>
            <InputLabel>Livello di attività fisica *</InputLabel>
            <Select
              label="Livello di attività fisica *"
              value={formState.attivita}
              onChange={(e) => setFormState((s) => ({ ...s, attivita: e.target.value }))}
              sx={inputRadiusSx}
            >
              <MenuItem value="">
                <em>Seleziona...</em>
              </MenuItem>
              <MenuItem value="sedentario">Sedentario (poco o nessun esercizio)</MenuItem>
              <MenuItem value="leggera">Leggera (esercizio 1-3 giorni/settimana)</MenuItem>
              <MenuItem value="moderata">Moderata (esercizio 3-5 giorni/settimana)</MenuItem>
              <MenuItem value="attiva">Attivo (esercizio 6-7 giorni/settimana)</MenuItem>
              <MenuItem value="molto-attivo">Molto attivo (esercizio intenso quotidiano)</MenuItem>
            </Select>
            {showErrors && !formState.attivita && (
              <FormHelperText sx={{ color: "#d32f2f", mt: 0.5 }}>Campo obbligatorio</FormHelperText>
            )}
          </FormControl>

          <Divider sx={{ mb: 3 }} />

          <SectionTitle icon={<MedicalInformationRoundedIcon />} title="Storia Clinica" />
          <Box sx={{ mb: 2 }}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Ho una storia clinica di patologie pregresse" />
          </Box>
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Farmaci attualmente in uso"
            placeholder="Elencare i farmaci che sta assumendo..."
            sx={{ mb: 4, ...inputRadiusSx }}
          />

          <Divider sx={{ mb: 3 }} />

          <SectionTitle icon={<FavoriteBorderRoundedIcon />} title="Sintomi Attuali" />
          <Box sx={{ mb: 2 }}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Ho nausea o senso di malessere generale" />
          </Box>
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Pressione sistolica (se disponibile)" placeholder="Es. 120" sx={inputRadiusSx} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Pressione diastolica (se disponibile)" placeholder="Es. 80" sx={inputRadiusSx} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {symptomOptions.map((opt) => {
              const active = selectedSymptoms.has(opt.id);
              return (
                <Grid item xs={12} sm={6} md={6} key={opt.id}>
                  <Box
                    role="button"
                    onClick={() => toggleSymptom(opt.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1.5,
                      border: `1px solid ${active ? theme.palette.primary.main : "#dfe4ed"}`,
                      borderRadius: 2,
                      px: 1.5,
                      py: 1,
                      color: active ? theme.palette.primary.main : "#3a465e",
                      backgroundColor: active ? "rgba(46,107,255,0.07)" : "white",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                      <Box sx={{ color: active ? theme.palette.primary.main : "#6d7a94", display: "flex", alignItems: "center" }}>
                        {opt.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 600 }}>{opt.label}</Typography>
                    </Box>
                    <CheckCircleOutlineRoundedIcon
                      sx={{
                        fontSize: 20,
                        color: active ? theme.palette.primary.main : "#cfd6e1",
                      }}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Descrizione dettagliata dei sintomi"
            placeholder="Descrivere quando sono iniziati i sintomi, intensità, eventuali fattori scatenanti..."
            sx={{ mb: 3, ...inputRadiusSx }}
          />

          <FormControl fullWidth sx={{ mb: 4 }} error={showErrors && !formState.durataSintomi}>
            <InputLabel>Da quanto tempo ha questi sintomi? *</InputLabel>
            <Select
              label="Da quanto tempo ha questi sintomi? *"
              value={formState.durataSintomi}
              onChange={(e) => setFormState((s) => ({ ...s, durataSintomi: e.target.value }))}
              sx={inputRadiusSx}
            >
              <MenuItem value="">
                <em>Seleziona...</em>
              </MenuItem>
              <MenuItem value="poche-ore">Poche ore</MenuItem>
              <MenuItem value="oggi">Da oggi</MenuItem>
              <MenuItem value="1-2-giorni">1-2 giorni</MenuItem>
              <MenuItem value="3-7-giorni">3-7 giorni</MenuItem>
              <MenuItem value="piu-settimana">Più di una settimana</MenuItem>
            </Select>
            {showErrors && !formState.durataSintomi && (
              <FormHelperText sx={{ color: "#d32f2f", mt: 0.5 }}>Campo obbligatorio</FormHelperText>
            )}
          </FormControl>

          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" sx={{ px: 3, py: 1.2, fontWeight: 700 }} onClick={handleContinue}>
              Continua alla selezione medico
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "8px",
          backgroundColor: "#eef4ff",
          color: "#2e6bff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Typography fontWeight={700}>{title}</Typography>
    </Box>
  );
}

const symptomOptions = [
  { id: "mal-di-testa", label: "Mal di testa", icon: <ErrorOutlineRoundedIcon /> },
  { id: "dolore-al-petto", label: "Dolore al petto", icon: <FavoriteBorderOutlinedIcon /> },
  { id: "febbre", label: "Febbre", icon: <DeviceThermostatOutlinedIcon /> },
  { id: "stanchezza", label: "Stanchezza", icon: <MonitorHeartRoundedIcon /> },
  { id: "vertigini", label: "Vertigini", icon: <ErrorOutlineRoundedIcon /> },
  { id: "mancanza-respiro", label: "Mancanza di respiro", icon: <MonitorHeartRoundedIcon /> },
];
