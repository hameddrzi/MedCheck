import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0, md: 1 }, display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              userSelect: "none"
            }}
            onClick={() => navigate("/")}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #2E6BFF 0%, #1B53E5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0px 10px 20px rgba(46,107,255,0.25)",
              }}
            >
              <HealthAndSafetyRoundedIcon />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1 }}>
                MedCheck
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(15,23,42,0.6)" }}>
                Pre-valutazione sintomi e consulto rapido
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: "none", fontWeight: 700, px: 3 }}
              onClick={() => navigate("/my-account")}
            >
              My Account
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", fontWeight: 700, px: 3 }}
              onClick={() => navigate("/questionario")}
            >
              Inizia Ora
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
