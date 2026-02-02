import { Box, Button, Card, CardContent, Container, Typography, TextField, Stack } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Header from "../../components/Header";
import { useSearchParams} from "react-router-dom";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import { registerUser, loginUser, resetPassword, type UserProfileResponse } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

type ViewState = 'selection' | 'login' | 'signup' | 'dashboard' | 'forgot'; //type of show in questa parte

export default function MyAccount() {
    const [searchParams, setSearchParams] = useSearchParams(); // per view path
    //const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    // Logic to sync URL view with auth state
    const view = (searchParams.get('view') as ViewState) || 'selection';

    useEffect(() => {
        if (isAuthenticated) {
            // If logged in, ensure we are on dashboard view or just render dashboard
            if (view !== 'dashboard') setSearchParams({ view: 'dashboard' }); //se utente e' login => mostra dashboard
        }
    }, [isAuthenticated, view, setSearchParams]);

    const [signupForm, setSignupForm] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        codiceFiscale: "",
        birthDate: "",
        heightCm: "",
        password: "",
    });
    const [signupError, setSignupError] = useState<string | null>(null);
    const [signupLoading, setSignupLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loginLoading, setLoginLoading] = useState(false);
    const [forgotForm, setForgotForm] = useState({ identifier: "", newPassword: "", repeatPassword: "" });
    const [forgotError, setForgotError] = useState<string | null>(null);
    const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
    const [forgotLoading, setForgotLoading] = useState(false);

    const setView = (newView: ViewState) => {
        setSearchParams({ view: newView }); // mostra query stringa di una di queste 5 pagine
    };

    const handleSignup = async () => {
        setSignupError(null);

        // Frontend validation before hitting backend
        if (!signupForm.firstName.trim() || !signupForm.lastName.trim()/**cancella lo spazio */ || !signupForm.mobileNumber.trim() || !signupForm.codiceFiscale.trim() || !signupForm.birthDate) {
            setSignupError("Compila tutti i campi obbligatori.");
            return;
        }
        if (!signupForm.password || signupForm.password.length < 6) {
            setSignupError("La password deve avere almeno 6 caratteri.");
            return;
        }

        const normalizedBirth =
            signupForm.birthDate.includes("/")
                ? normalizeDateToIso(signupForm.birthDate)
                : signupForm.birthDate;

        setSignupLoading(true);
        try {
            const payload = {
                firstName: signupForm.firstName.trim(),
                lastName: signupForm.lastName.trim(),
                mobileNumber: signupForm.mobileNumber.trim(),
                codiceFiscale: signupForm.codiceFiscale.trim().toUpperCase(),
                birthDate: normalizedBirth,
                heightCm: signupForm.heightCm ? Number(signupForm.heightCm) : undefined,
                password: signupForm.password,
            };
            const res = await registerUser(payload);
            // Transform RegisterResponse to UserProfileResponse if needed, or backend returns same structure?
            // AuthController.register returns UserRegisterResponse { user, consultations }
            // AuthContext expects UserProfileResponse. 
            // We should use res.user
            if (res.user) {
                login(res.user as UserProfileResponse);
            }
            setView('dashboard'); //mostra ui di dashboard
        } catch (err: any) {
            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message;
            setSignupError(backendMessage || "Errore durante la registrazione. Controlla i dati e riprova.");
        } finally {
            setSignupLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoginError(null);
        if (!loginForm.identifier.trim() || !loginForm.password) {
            setLoginError("Inserisci credenziali valide.");
            return;
        }
        /**
         * prima fa normalizza e poi chiede da backend
         */
        const normalizedIdentifier = /[a-zA-Z]/.test(loginForm.identifier) //controlla per a-z / A-Z per normalizzare
            ? loginForm.identifier.trim().toUpperCase()
            : loginForm.identifier.trim();
        setLoginLoading(true);
        try {
            const res = await loginUser({
                identifier: normalizedIdentifier,
                password: loginForm.password,
            });
            login(res);
            setView('dashboard');
        } catch (err: any) {
            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message;
            setLoginError(backendMessage || "Login fallito. Controlla le credenziali.");
        } finally {
            setLoginLoading(false);
        }
    };

    const handleForgot = async () => {
        setForgotError(null);
        setForgotSuccess(null);
        if (!forgotForm.identifier.trim() || !forgotForm.newPassword || !forgotForm.repeatPassword) {
            setForgotError("Compila tutti i campi.");
            return;
        }
        if (forgotForm.newPassword !== forgotForm.repeatPassword) {
            setForgotError("Le password non coincidono.");
            return;
        }
        setForgotLoading(true);
        try {
            await resetPassword({
                identifier: forgotForm.identifier.trim(),
                newPassword: forgotForm.newPassword,
            });
            setForgotSuccess("Password aggiornata con successo.");
        } catch (err: any) {
            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message;
            setForgotError(backendMessage || "Errore durante il reset della password.");
        } finally {
            setForgotLoading(false);
        }
    };

    const normalizeDateToIso = (value: string) => {
        if (!value) return value;
        if (value.includes("-")) return value; // already yyyy-MM-dd
        const parts = value.split("/");
        if (parts.length === 3) {
            const [p1, p2, p3] = parts;
            // assume dd/MM/yyyy
            if (p3.length === 4) {
                return `${p3}-${p2.padStart(2, "0")}-${p1.padStart(2, "0")}`;
            }
        }
        return value;
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
                    py: (view === 'dashboard' || isAuthenticated) ? 0 : 4,
                }}
            >
                {(view === 'dashboard' || isAuthenticated) ? (
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
                                                    value={loginForm.identifier}
                                                    onChange={(e) => setLoginForm((s) => ({ ...s, identifier: e.target.value }))}
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
                                                    value={loginForm.password}
                                                    onChange={(e) => setLoginForm((s) => ({ ...s, password: e.target.value }))}
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
                                            onClick={handleLogin}
                                            disabled={loginLoading}
                                        >
                                            {loginLoading ? "Accesso..." : "Login"}
                                        </Button>

                                        {loginError && (
                                            <Typography sx={{ color: "#d32f2f", mb: 1 }}>{loginError}</Typography>
                                        )}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#2E6BFF",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                "&:hover": { textDecoration: "underline" },
                                                mb: 2,
                                            }}
                                            onClick={() => setView('forgot')}
                                        >
                                            Forgot password?
                                        </Typography>

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
                                {view === 'forgot' && (
                                    <>
                                        <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: "#2E6BFF" }}>
                                            RESET PASSWORD
                                        </Typography>

                                        <Stack spacing={2.5} sx={{ mb: 4, textAlign: "left" }}>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Mobile Number or Codice Fiscale
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="Inserisci telefono o codice fiscale"
                                                    variant="outlined"
                                                    value={forgotForm.identifier}
                                                    onChange={(e) => setForgotForm((s) => ({ ...s, identifier: e.target.value }))}
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    New Password
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    type="password"
                                                    placeholder="Inserisci nuova password"
                                                    variant="outlined"
                                                    value={forgotForm.newPassword}
                                                    onChange={(e) => setForgotForm((s) => ({ ...s, newPassword: e.target.value }))}
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Repeat Password
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    type="password"
                                                    placeholder="Ripeti nuova password"
                                                    variant="outlined"
                                                    value={forgotForm.repeatPassword}
                                                    onChange={(e) => setForgotForm((s) => ({ ...s, repeatPassword: e.target.value }))}
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
                                            onClick={handleForgot}
                                            disabled={forgotLoading}
                                        >
                                            {forgotLoading ? "Invio..." : "Reset Password"}
                                        </Button>

                                        {forgotError && (
                                            <Typography sx={{ color: "#d32f2f", mb: 1 }}>{forgotError}</Typography>
                                        )}
                                        {forgotSuccess && (
                                            <Typography sx={{ color: "#1b8f5b", mb: 1 }}>{forgotSuccess}</Typography>
                                        )}

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "rgba(15,23,42,0.6)" }}
                                        >
                                            Ricordi la password?{" "}
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
                                                Torna al login
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
                                                    value={signupForm.firstName}
                                                    onChange={(e) => setSignupForm((s) => ({ ...s, firstName: e.target.value }))}
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
                                                    value={signupForm.lastName}
                                                    onChange={(e) => setSignupForm((s) => ({ ...s, lastName: e.target.value }))}
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
                                                    value={signupForm.mobileNumber}
                                                    onChange={(e) => setSignupForm((s) => ({ ...s, mobileNumber: e.target.value }))}
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
                                                    value={signupForm.codiceFiscale}
                                                    onChange={(e) => setSignupForm((s) => ({ ...s, codiceFiscale: e.target.value }))}
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Data di nascita (gg/mm/aaaa)
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    type="date"
                                                    InputLabelProps={{ shrink: true }}
                                                    variant="outlined"
                                                    value={signupForm.birthDate}
                                                    onChange={(e) => setSignupForm((s) => ({ ...s, birthDate: e.target.value }))}
                                                    InputProps={{ sx: { borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5, color: "#1B2430" }}>
                                                    Altezza (cm)
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="es. 172"
                                                    type="number"
                                                    variant="outlined"
                                                    value={signupForm.heightCm}
                                                    onChange={(e) => setSignupForm((s) => ({ ...s, heightCm: e.target.value }))}
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
                                                    value={signupForm.password}
                                                    onChange={(e) => setSignupForm((s) => ({ ...s, password: e.target.value }))}
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
                                            onClick={handleSignup}
                                            disabled={signupLoading}
                                        >
                                            {signupLoading ? "Invio..." : "Sign-up"}
                                        </Button>

                                        {signupError && (
                                            <Typography sx={{ color: "#d32f2f", mb: 1 }}>{signupError}</Typography>
                                        )}

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
