import { AppBar, Toolbar, Typography, Button, Box, Container, Menu, MenuItem, Avatar } from "@mui/material";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  const userName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : null;

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate("/my-account?view=login");
  };

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
            {isAuthenticated ? (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: "none", fontWeight: 700, px: 3, display: "flex", alignItems: "center", gap: 1 }}
                  onClick={handleMenuOpen}
                >
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "#2E6BFF",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {(userName || "Utente").charAt(0).toUpperCase()}
                  </Avatar>
                  {userName || "Utente"}
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/my-account?view=dashboard");
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none", fontWeight: 700, px: 3 }}
                onClick={() => navigate("/my-account")}
              >
                My Account
              </Button>
            )}
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
