import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CircleIcon from "@mui/icons-material/Circle";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../../components/Header";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = ["Questionario", "Selezione Medico", "Consulto"];

type Doctor = {
  id: string;
  name: string;
  role: string;
  address: string;
  distanceKm: number;
  rating: number;
  available: boolean;
  message?: string;
  position: [number, number];
};

const doctors: Doctor[] = [
  {
    id: "rossi",
    name: "Dr. Maria Rossi",
    role: "Medicina Generale",
    address: "Via Roma 15, Milano",
    distanceKm: 0.8,
    rating: 4.8,
    available: true,
    message: "Questo medico è attualmente disponibile e potrà rispondere al tuo consulto entro poche ore.",
    position: [45.4668, 9.19],
  },
  {
    id: "bianchi",
    name: "Dr. Giuseppe Bianchi",
    role: "Cardiologia",
    address: "Corso Venezia 42, Milano",
    distanceKm: 1.2,
    rating: 4.9,
    available: true,
    message: "Questo medico è attualmente disponibile e potrà rispondere al tuo consulto entro poche ore.",
    position: [45.4725, 9.2045],
  },
  {
    id: "conti",
    name: "Dr.ssa Elena Conti",
    role: "Medicina Interna",
    address: "Piazza Duomo 8, Milano",
    distanceKm: 1.5,
    rating: 4.7,
    available: false,
    position: [45.4639, 9.191],
  },
  {
    id: "ferrari",
    name: "Dr. Marco Ferrari",
    role: "Geriatria",
    address: "Via Torino 30, Milano",
    distanceKm: 1.7,
    rating: 4.6,
    available: true,
    position: [45.4578, 9.185],
  },
];

export default function DoctorSelection() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("rossi");
  const [showMap, setShowMap] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const selected = useMemo(() => doctors.find((d) => d.id === selectedId) ?? doctors[0], [selectedId]);

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
          activeStep={1}
          alternativeLabel
          sx={{
            mb: { xs: 3, md: 4 },
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
              <StepLabel optional={idx > 1 ? "" : undefined}>{label}</StepLabel>
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
          <Box
            sx={{
              background: "linear-gradient(90deg, #0d6efd, #256bff)",
              color: "white",
              py: 2.5,
              px: { xs: 2.5, md: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton sx={{ color: "white" }} onClick={() => navigate(-1)}>
                <ArrowBackIosNewRoundedIcon />
              </IconButton>
              <Box>
                <Typography variant="h6" fontWeight={800}>
                  Seleziona un Medico
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
                  Scegli un medico disponibile nella tua zona per ricevere un consulto
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "white",
                textTransform: "none",
              }}
              startIcon={<MapRoundedIcon />}
              onClick={() => setShowMap((v) => !v)}
            >
              {showMap ? "Nascondi Mappa" : "Mostra Mappa"}
            </Button>
          </Box>

          <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <TextField
              fullWidth
              placeholder="Milano"
              InputProps={{
                startAdornment: <LocationOnOutlinedIcon sx={{ mr: 1, color: "#63708a" }} />,
                endAdornment: (
                  <Button variant="contained" sx={{ textTransform: "none" }}>
                    Cerca
                  </Button>
                ),
                sx: { borderRadius: 2 },
              }}
              sx={{ mb: 3 }}
            />

            {/* Seleziona data e ora */}
            <Box
              sx={{
                border: "1px solid #dfe4ed",
                borderRadius: 3,
                p: { xs: 2, md: 2.5 },
                mb: 3,
              }}
            >
              <Typography fontWeight={700} sx={{ color: "#1e2f53", mb: 1 }}>
                Seleziona data e ora
              </Typography>
              <Typography sx={{ color: "#4c5975", mb: 2 }}>
                Scegli una data, poi seleziona uno degli orari disponibili del medico scelto.
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Data *"
                    InputLabelProps={{ shrink: true }}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime("");
                    }}
                    error={showErrors && !selectedDate}
                    helperText={showErrors && !selectedDate ? "Campo obbligatorio" : ""}
                  />
                </Grid>

                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      alignItems: "flex-start",
                    }}
                  >
                    {selectedDate ? (
                      doctorSlots[selected.id].map((slot) => {
                        const active = selectedTime === slot;
                        return (
                          <Button
                            key={slot}
                            variant={active ? "contained" : "outlined"}
                            size="small"
                            onClick={() => setSelectedTime(slot)}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              minWidth: 88,
                              backgroundColor: active ? "rgba(37,107,255,0.1)" : "white",
                            }}
                          >
                            {slot}
                          </Button>
                        );
                      })
                    ) : (
                      <Typography sx={{ color: "#6d7a94" }}>Seleziona prima una data per vedere gli orari disponibili.</Typography>
                    )}
                  </Box>
                  {showErrors && selectedDate && !selectedTime && (
                    <Typography sx={{ color: "#d32f2f", mt: 0.5 }}>Campo obbligatorio: scegli un orario</Typography>
                  )}
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={3}>
              {showMap && (
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      border: "1px solid #dfe4ed",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <DoctorMap doctors={doctors} selectedId={selected.id} onSelect={setSelectedId} />
                  </Box>
                </Grid>
              )}

              <Grid item xs={12} md={showMap ? 7 : 12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    px: 0.5,
                  }}
                >
                  <Typography sx={{ color: "#1e2f53", fontWeight: 600 }}>
                    Trovati {doctors.length} medici nella zona di Milano
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircleIcon sx={{ color: "#1fb26b", fontSize: 12 }} />
                    <Typography sx={{ color: "#1e2f53" }}>Disponibile ora</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    maxHeight: showMap ? 420 : 520,
                    overflowY: "auto",
                    pr: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {doctors.map((doc) => {
                    const active = selected.id === doc.id;
                    return (
                      <Box
                        key={doc.id}
                        role="button"
                        onClick={() => setSelectedId(doc.id)}
                        sx={{
                          borderRadius: 3,
                          border: `2px solid ${active ? "#256bff" : "#dfe4ed"}`,
                          boxShadow: active ? "0px 12px 30px rgba(37,107,255,0.12)" : "0px 8px 20px rgba(0,0,0,0.04)",
                          backgroundColor: active ? "rgba(37,107,255,0.06)" : "white",
                          p: 2,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: "14px",
                              backgroundColor: "#eef4ff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#256bff",
                              flexShrink: 0,
                            }}
                          >
                            <LocalHospitalRoundedIcon />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography fontWeight={800} sx={{ color: "#1e2f53" }}>
                              {doc.name}
                            </Typography>
                            <Typography sx={{ color: "#5a6782" }}>{doc.role}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#6d7a94", mt: 0.5 }}>
                              <PlaceRoundedIcon fontSize="small" />
                              <Typography sx={{ color: "#6d7a94" }}>
                                {doc.address} • {doc.distanceKm} km
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.5 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <StarRoundedIcon sx={{ fontSize: 18, color: "#f7b500" }} />
                                <Typography sx={{ color: "#1e2f53", fontWeight: 600 }}>{doc.rating.toFixed(1)}</Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: doc.available ? "#1fb26b" : "#9aa4b5" }}>
                                <CircleIcon sx={{ fontSize: 10 }} />
                                <Typography>{doc.available ? "Disponibile" : "Non disponibile"}</Typography>
                              </Box>
                            </Box>
                          </Box>
                          <CheckCircleOutlineRoundedIcon
                            sx={{
                              color: active ? "#256bff" : "#d0d6e3",
                              fontSize: 26,
                            }}
                          />
                        </Box>

                        {doc.message && (
                          <>
                            <Divider sx={{ my: 1.5 }} />
                            <Typography sx={{ color: "#4c5975" }}>{doc.message}</Typography>
                          </>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Typography sx={{ color: "#1e2f53" }}>
                Hai selezionato: <strong>{selected.name}</strong>
              </Typography>
              <Button
                variant="contained"
                sx={{ textTransform: "none", px: 3, py: 1.1, fontWeight: 700 }}
                disabled={!selectedId}
                onClick={() => {
                  if (!selectedDate || !selectedTime) {
                    setShowErrors(true);
                    return;
                  }
                  navigate("/consulto");
                }}
              >
                Invia richiesta di consulto
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function DoctorMap({
  doctors,
  selectedId,
  onSelect,
}: {
  doctors: Doctor[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const center = useMemo<[number, number]>(
    () => doctors.find((d) => d.id === selectedId)?.position ?? [45.4668, 9.19],
    [selectedId]
  );

  return (
    <MapContainer center={center} zoom={14} style={{ height: 420, width: "100%" }} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
      {doctors.map((doc) => (
        <Marker
          key={doc.id}
          position={doc.position}
          icon={createMarkerIcon(doc.id === selectedId, doc.available)}
          eventHandlers={{
            click: () => onSelect(doc.id),
          }}
        />
      ))}
      <MapSync center={center as [number, number]} />
    </MapContainer>
  );
}

function MapSync({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function createMarkerIcon(active: boolean, available: boolean) {
  const color = active ? "#256bff" : available ? "#1fb26b" : "#9aa4b5";
  return L.divIcon({
    className: "",
    html: `<div style="
      width:32px;height:32px;
      border-radius:50%;
      background:${color};
      display:flex;
      align-items:center;
      justify-content:center;
      color:white;
      box-shadow:0 8px 18px rgba(0,0,0,0.2);
      font-size:14px;
      border:2px solid white;
    ">${"𐄁"}</div>`,
  });
}
