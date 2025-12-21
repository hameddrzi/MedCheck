import { Box, Button, Card, CardContent, Container, Typography, TextField, Stack } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Header from "../../components/Header";
import { useSearchParams } from "react-router-dom";
import Dashboard from "./Dashboard";

type ViewState = 'selection' | 'login' | 'signup' | 'dashboard';

export default function MyAccount() {
    const [searchParams, setSearchParams] = useSearchParams();
    const view = (searchParams.get('view') as ViewState) || 'selection';

    const setView = (newView: ViewState) => {
        setSearchParams({ view: newView });
    };

    return (
        <>
            <Header />
            <Box
                sx={{
                    minHeight: "calc(100vh - 80px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "radial-gradient(circle at 10% 10%, rgba(46,107,255,0.08), transparent 35%), radial-gradient(circle at 90% 20%, rgba(46,107,255,0.05), transparent 35%), #fff",
                    py: view === 'dashboard' ? 0 : 4,
                }}
            >
                {view === 'dashboard' ? (
                    <Container maxWidth="xl" sx={{ p: '0 !important' }}>
                        <Dashboard />
                    </Container>
                ) : (
                    <Container maxWidth="sm">
                        <Card
                            sx={{
                                borderRadius: 4,
                                boxShadow: "0px 20px 60px rgba(0,0,0,0.08)",
                                overflow: "visible",
                            }}
                        >
                            <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
                                {view === 'selection' && (
                                    // Login Selection View
                                    <>
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "24px",
                                                background: "linear-gradient(135deg, #2E6BFF 0%, #1B53E5 100%)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "white",
                                                mx: "auto",
                                                mb: 3,
                                                boxShadow: "0px 10px 30px rgba(46,107,255,0.3)",
                                            }}
                                        >
                                            <LoginRoundedIcon sx={{ fontSize: 40 }} />
                                        </Box>

                                        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                                            Benvenuto
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ color: "rgba(15,23,42,0.6)", mb: 5 }}
                                        >
                                            Accedi al tuo account per gestire i tuoi appuntamenti
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            sx={{
                                                mb: 1,
                                                color: "#1B2430",
                                                cursor: "pointer",
                                                transition: "color 0.2s",
                                                "&:hover": { color: "#2E6BFF" },
                                            }}
                                            onClick={() => setView('signup')}
                                        >
                                            Ancora non hai un account?
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            startIcon={<LoginRoundedIcon />}
                                            sx={{
                                                mb: 4,
                                                py: 1.8,
                                                borderRadius: 3,
                                                textTransform: "none",
                                                fontWeight: 700,
                                                fontSize: "1.05rem",
                                                boxShadow: "0px 10px 25px rgba(46,107,255,0.25)",
                                            }}
                                            onClick={() => setView('login')}
                                        >
                                            Login nel mio account
                                        </Button>

                                    </>
                                )}

                                {view === 'login' && (
                                    // Login View
                                    <>
                                        <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: "#2E6BFF" }}>
                                            LOGIN
                                        </Typography>

                                        <Stack spacing={2.5} sx={{ mb: 4, textAlign: "left" }}>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Mobile Number or Codice Fiscale
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter Your phone Number here"
                                                    variant="outlined"
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Password
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    type="password"
                                                    placeholder="Please Enter Your Password here"
                                                    variant="outlined"
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>
                                        </Stack>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            sx={{
                                                py: 1.8,
                                                borderRadius: 3,
                                                textTransform: "none",
                                                fontWeight: 700,
                                                fontSize: "1.2rem",
                                                boxShadow: "0px 10px 25px rgba(46,107,255,0.25)",
                                                mb: 3
                                            }}
                                            onClick={() => setView('dashboard')}
                                        >
                                            Login
                                        </Button>

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "rgba(15,23,42,0.6)" }}
                                        >
                                            if you havn't Registed yet ?{" "}
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "#2E6BFF",
                                                    fontWeight: 600,
                                                    cursor: "pointer",
                                                    "&:hover": { textDecoration: "underline" },
                                                }}
                                                onClick={() => setView('signup')}
                                            >
                                                Register Now
                                            </Box>
                                        </Typography>
                                    </>
                                )}

                                {view === 'signup' && (
                                    // Sign Up View
                                    <>
                                        <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: "#2E6BFF" }}>
                                            SIGN-UP
                                        </Typography>

                                        <Stack spacing={2.5} sx={{ mb: 4, textAlign: "left" }}>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Name
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter Your Name"
                                                    variant="outlined"
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Surname
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter Your Surname"
                                                    variant="outlined"
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Mobile Number
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Enter Your Mobile Number"
                                                    variant="outlined"
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Codice Fiscale
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Please Enter Your Codice Fiscale"
                                                    variant="outlined"
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Password
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    type="password"
                                                    placeholder="Please Enter Your Password"
                                                    variant="outlined"
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>
                                        </Stack>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            size="large"
                                            sx={{
                                                py: 1.8,
                                                borderRadius: 3,
                                                textTransform: "none",
                                                fontWeight: 700,
                                                fontSize: "1.2rem",
                                                boxShadow: "0px 10px 25px rgba(46,107,255,0.25)",
                                                mb: 3
                                            }}
                                        >
                                            Sign-up
                                        </Button>

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "rgba(15,23,42,0.6)" }}
                                        >
                                            if you already have an account?{" "}
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "#2E6BFF",
                                                    fontWeight: 600,
                                                    cursor: "pointer",
                                                    "&:hover": { textDecoration: "underline" },
                                                }}
                                                onClick={() => setView('login')}
                                            >
                                                Login Now
                                            </Box>
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Container>
                )}
            </Box>
        </>
    );
}
