import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/GridLegacy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import userImage from "../../assets/home/paziente.jpeg";

export default function TargetUsers() {
  const items = [
    {
      title: "Persone Anziane",
      desc: "che avvertono sintomi ma temono di recarsi dal medico senza sapere se è necessario.",
    },
    {
      title: "Lavoratori Impegnati",
      desc: "che non hanno tempo per visite mediche non urgenti ma vogliono una consulenza professionale.",
    },
    {
      title: "Caregiver",
      desc: "che si prendono cura di familiari anziani e necessitano di orientamento medico rapido.",
    },
    {
      title: "Persone con Patologie Croniche",
      desc: "che monitorano costantemente la propria salute e necessitano di pareri medici periodici.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #F7FBFF 0%, #E9F2FF 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={6}
          alignItems="center"
        >
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={userImage}
                alt="user smiling"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
          </Grid>

          {/* Text */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                mb: 4,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              A chi si rivolge MedCheck
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {items.map((text, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      color: "#2E6BFF",
                      fontSize: 26,
                      mt: "2px",
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(0,0,0,0.75)",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>{text.title}</strong> {text.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
