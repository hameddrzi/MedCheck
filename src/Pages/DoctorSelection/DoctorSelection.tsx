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
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDoctors } from "../../api/doctorsApi";
import { assignDoctorToConsultation } from "../../api/consult";

const steps = ["Questionario", "Selezione Medico", "Consulto"];

type DoctorCardData = {
  id: string;
  name: string;
  role: string;
  address: string;
  distanceKm: number;
  rating: number;
  available: boolean;
  message?: string;
  position: [number, number];
  slots: string[];
};

export default function DoctorSelection() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<DoctorCardData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let active = true; //mostrare i dottori
    const loadDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const { doctors: apiDoctors } = await fetchDoctors({ size: 20 }); //richiesta a backend
        if (!active) return;
        const normalized = normalizeDoctors(apiDoctors); //se i dati dei dottori hanni problemi lo fa normalizza (mette anche la mappa)
        setDoctors(normalized); // mette la lista dei dottori in state
        setSelectedId(normalized[0]?.id ?? null); //select primo dottore default
      } catch (err) {
        if (active) {
          setError("Errore nel caricamento dei medici. Riprova più tardi.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadDoctors();
    return () => {
      active = false;
    };
  }, []);

  const selected = useMemo(
    () => doctors.find((d) => d.id === selectedId) ?? doctors[0],
    [selectedId, doctors]
  );

  // Filter by search term (name/city/specialty)
  const filteredDoctors = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return doctors;
    return doctors.filter((doc) => {
      const haystack = [doc.name, doc.role, doc.address].join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }, [doctors, searchTerm]);

  // Keep selected doctor consistent with filtered list
  useEffect(() => {
    if (filteredDoctors.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filteredDoctors.some((d) => d.id === selectedId)) {
      setSelectedId(filteredDoctors[0].id);
    }
  }, [filteredDoctors, selectedId]);

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
              placeholder="Cerca per città o nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                    {selectedDate && selected ? (
                      (selected.slots || []).map((slot) => {
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
                              borderColor: active ? "#2e6bff" : "#b9c5db",
                              color: active ? "white" : "#1e2f53",
                              backgroundColor: active ? "#2e6bff" : "white",
                              boxShadow: active ? "0 10px 18px rgba(46,107,255,0.25)" : "none",
                              "&:hover": {
                                backgroundColor: active ? "#255bdd" : "#f5f7fb",
                                borderColor: "#2e6bff",
                              },
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
                    <DoctorMap
                      doctors={filteredDoctors}
                      selectedId={selected?.id ?? null}
                      onSelect={setSelectedId}
                    />
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
                    {loading ? "Caricamento medici..." : `Trovati ${filteredDoctors.length} medici`}
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
                  {error && (
                    <Typography sx={{ color: "#d32f2f", fontWeight: 600 }}>{error}</Typography>
                  )}
                  {(loading
                    ? (Array.from({ length: 3 }) as (DoctorCardData | null)[])
                    : (filteredDoctors as (DoctorCardData | null)[])
                  ).map((doc, idx) => {
                    if (!doc) {
                      return (
                        <Box
                          key={idx}
                          sx={{
                            borderRadius: 3,
                            border: "2px solid #dfe4ed",
                            backgroundColor: "#f5f7fb",
                            height: 120,
                          }}
                        />
                      );
                    }
                    const active = selected?.id === doc.id;
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
                Hai selezionato: <strong>{selected ? selected.name : "Nessun medico"}</strong>
              </Typography>
              <Button
                variant="contained"
                sx={{ textTransform: "none", px: 3, py: 1.1, fontWeight: 700 }}
                disabled={!selectedId || submitLoading}
                onClick={async () => {
                  if (!selectedDate || !selectedTime) {
                    setShowErrors(true);
                    return;
                  }
                  setSubmitError(null);
                  setSubmitLoading(true);
                  try {
                    const stored = sessionStorage.getItem("consultationResponse");
                    const parsed = stored ? JSON.parse(stored) : null;
                    const consultationId = parsed?.id;
                    if (!consultationId) {
                      throw new Error("Nessun consultationId disponibile. Completa prima il questionario.");
                    }

                    if (!selected) {
                      throw new Error("Nessun medico selezionato.");
                    }

                    await assignDoctorToConsultation(Number(consultationId), {
                      doctorId: Number(selected.id),
                      appointmentDate: selectedDate,
                      appointmentTime: selectedTime,
                    });

                    sessionStorage.setItem("consultoDate", selectedDate);
                    sessionStorage.setItem("consultoTime", selectedTime);
                    sessionStorage.setItem("consultoDoctorId", String(selected.id));
                    sessionStorage.setItem("consultoDoctorName", selected.name);
                    sessionStorage.setItem("consultoDoctorSpecialty", selected.role || "");
                    sessionStorage.setItem("consultoDoctorAddress", selected.address || "");
                    navigate("/consulto"); // navigate in modo preriquisito
                  } catch (err) {
                    setSubmitError("Errore nel salvataggio dell'appuntamento. Riprova.");
                  } finally {
                    setSubmitLoading(false);
                  }
                }}
              >
                {submitLoading ? "Invio in corso..." : "Invia richiesta di consulto"}
              </Button>
            </Box>
            {submitError && (
              <Typography sx={{ color: "#d32f2f", mt: 1, fontWeight: 600 }}>
                {submitError}
              </Typography>
            )}
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
  doctors: DoctorCardData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const center = useMemo<[number, number]>(
    () => doctors.find((d) => d.id === selectedId)?.position ?? [45.4668, 9.19],
    [selectedId, doctors]
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

const doctorSlots: Record<string, string[]> = {
  rossi: ["09:00", "10:30", "12:00", "15:00", "16:30"],
  bianchi: ["09:30", "11:00", "14:00", "15:30", "17:00"],
  conti: ["10:00", "11:30", "13:30", "16:00"],
  ferrari: ["09:00", "10:00", "11:00", "14:30", "16:30"],
};

function normalizeDoctors(apiDoctors: any[]): DoctorCardData[] { //google api non era gratuitamente
  const cityCenters: Record<string, [number, number]> = {
    milano: [45.4642, 9.19],
    roma: [41.9028, 12.4964],
    napoli: [40.8518, 14.2681],
    torino: [45.0703, 7.6869],
    bologna: [44.4949, 11.3426],
    firenze: [43.7696, 11.2558],
    trieste: [45.6495, 13.7768],
    venezia: [45.4408, 12.3155],
    verona: [45.4384, 10.9916],
    genova: [44.4056, 8.9463],
    palermo: [38.1157, 13.3615],
    bari: [41.1171, 16.8719],
    catania: [37.5079, 15.083],
    padova: [45.4064, 11.8768],
    brescia: [45.5416, 10.2118],
    parma: [44.8015, 10.3279],
    modena: [44.6471, 10.9252],
    reggio_emilia: [44.6989, 10.6297],
    perugia: [43.1107, 12.3908],
    udine: [46.0625, 13.2346],
  };
  const fallbackSlots = ["09:00", "11:00", "14:00", "16:00"];

  return apiDoctors.map((doc, idx) => {
    const name = doc.fullName || `${doc.firstName ?? ""} ${doc.lastName ?? ""}`.trim() || "Medico";
    const id = String(doc.id ?? idx);

    // Use real coordinates from API if available, otherwise calculate from city
    let position: [number, number];
    if (doc.latitude != null && doc.longitude != null) {
      position = [doc.latitude, doc.longitude];
    } else {
      // Fallback: calculate position from city center
      const cityKey = (doc.city || "").toString().toLowerCase();
      const baseCenter = cityCenters[cityKey] ?? cityCenters.milano;
      const offsetLat = baseCenter[0] + 0.02 * Math.cos(idx);
      const offsetLng = baseCenter[1] + 0.02 * Math.sin(idx);
      position = [offsetLat, offsetLng];
    }

    return {
      id,
      name,
      role: doc.specialty ?? "",
      address: [doc.address, doc.city].filter(Boolean).join(", "),
      distanceKm: Number((0.8 + (idx % 4) * 0.6).toFixed(1)),
      rating: Number(doc.rating ?? 0),
      available: true,
      message: "Questo medico è attualmente disponibile e potrà rispondere al tuo consulto entro poche ore.",
      position,
      slots: doctorSlots[id] ?? fallbackSlots,
    };
  });
}
