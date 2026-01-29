import { Box, Button, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import { resetPassword } from "../api/auth";

export default function ForgotPassword() {
  const [form, setForm] = useState({
    identifier: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (!form.identifier.trim() || !form.newPassword || !form.repeatPassword) {
      setError("Compila tutti i campi.");
      return;
    }
    if (form.newPassword !== form.repeatPassword) {
      setError("Le password non coincidono.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword({
        identifier: form.identifier.trim(),
        newPassword: form.newPassword,
      });
      setSuccess("Password aggiornata con successo.");
    } catch (err: any) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(backendMessage || "Errore durante il reset della password.");
    } finally {
      setLoading(false);
    }
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
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0px 20px 60px rgba(0,0,0,0.08)",
              overflow: "visible",
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
              <Typography variant="h4" fontWeight={800} sx={{ mb: 4, color: "#2E6BFF" }}>
                Forgot Password
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
                    value={form.identifier}
                    onChange={(e) => setForm((s) => ({ ...s, identifier: e.target.value }))}
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
                    value={form.newPassword}
                    onChange={(e) => setForm((s) => ({ ...s, newPassword: e.target.value }))}
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
                    value={form.repeatPassword}
                    onChange={(e) => setForm((s) => ({ ...s, repeatPassword: e.target.value }))}
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
                  mb: 2
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Invio..." : "Reset Password"}
              </Button>

              {error && (
                <Typography sx={{ color: "#d32f2f", mb: 1 }}>{error}</Typography>
              )}
              {success && (
                <Typography sx={{ color: "#1b8f5b", mb: 1 }}>{success}</Typography>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
