import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Rating,
    Box,
    Typography,
    Stack,
    CircularProgress,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { fetchDoctorReviews, postDoctorReview } from "../api/doctorsApi";
import type { Review } from "../types/doctor";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
    doctorId: number;
    doctorName?: string;
    canReview?: boolean; // If true, user can see the form
    initialView?: "list" | "form"; // Which view to show first
}

const ReviewModal = ({
    open,
    onClose,
    doctorId,
    doctorName,
    canReview = false,
    initialView = "list",
}: ReviewModalProps) => {
    const [view, setView] = useState<"list" | "form" | "success">(initialView);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState("");
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setView(initialView);
            if (initialView === "list") {
                loadReviews();
            }
            // Reset form
            setRating(0);
            setComment("");
            setSubmissionError(null);
        }
    }, [open, doctorId, initialView]);

    const loadReviews = async () => {
        setLoading(true);
        try {
            const data = await fetchDoctorReviews(doctorId);
            setReviews(data);
        } catch (err) {
            console.error("Failed to load reviews", err);
        } finally {
            setLoading(false);
        }
    };

    const { user } = useAuth(); // Hook usage

    const handleReviewSubmit = async () => {
        if (!rating) {
            setSubmissionError("Seleziona una valutazione in stelle.");
            return;
        }
        setSubmitting(true);
        setSubmissionError(null);

        const reviewName = user
            ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
            : "Paziente";

        try {
            await postDoctorReview(Number(doctorId), {
                rating,
                comment,
                patientName: reviewName || "Paziente",
            });
            // success
            setView("success");
            setRating(0);
            setComment("");
        } catch (err) {
            setSubmissionError("Errore nell'invio della recensione. Riprova.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={700}>
                    {view === "list" ? "Recensioni" : view === "success" ? "Completato" : "Scrivi una recensione"}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                {doctorName && view !== "success" && (
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                        Dott. {doctorName}
                    </Typography>
                )}

                {view === "list" ? (
                    <>
                        {loading ? (
                            <Box display="flex" justifyContent="center" p={3}>
                                <CircularProgress />
                            </Box>
                        ) : reviews.length === 0 ? (
                            <Box textAlign="center" py={4}>
                                <Typography color="text.secondary">
                                    Nessuna recensione ancora presente.
                                </Typography>
                            </Box>
                        ) : (
                            <Stack spacing={2}>
                                {reviews.map((r, idx) => (
                                    <Box
                                        key={`${r.date}-${r.patientName}-${idx}`}
                                        sx={{
                                            p: 2,
                                            bgcolor: "#f8f9fa",
                                            borderRadius: 2,
                                            border: "1px solid #e9ecef",
                                        }}
                                    >
                                        <Box display="flex" justifyContent="space-between" mb={0.5} alignItems="center">
                                            <Typography fontWeight={700} variant="body2">
                                                {r.patientName}
                                            </Typography>
                                            <Rating value={r.rating} readOnly size="small" />
                                        </Box>
                                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                            {r.date}
                                        </Typography>
                                        {r.comment && (
                                            <Box display="flex" gap={1}>
                                                <FormatQuoteIcon sx={{ color: "action.active", fontSize: 20 }} />
                                                <Typography variant="body2">
                                                    {r.comment}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </>
                ) : view === "success" ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 4,
                            textAlign: 'center'
                        }}
                    >
                        <CheckCircleOutlineRoundedIcon sx={{ fontSize: 60, color: '#1b8f5b', mb: 2 }} />
                        <Typography variant="h5" fontWeight={700} sx={{ color: '#1b8f5b', mb: 1 }}>
                            Grazie!
                        </Typography>
                        <Typography color="text.secondary">
                            La tua recensione è stata pubblicata con successo.
                        </Typography>
                    </Box>
                ) : (
                    <Box component="div">
                        <Box display="flex" flexDirection="column" gap={2} mt={1}>
                            <Box>
                                <Typography component="legend">Valutazione</Typography>
                                <Rating
                                    name="rating"
                                    value={rating}
                                    onChange={(_, newValue) => {
                                        setRating(newValue);
                                    }}
                                    size="large"
                                />
                            </Box>
                            <TextField
                                label="Il tuo commento"
                                multiline
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                                placeholder="Condividi la tua esperienza..."
                            />
                            {submissionError && (
                                <Typography color="error" variant="body2">
                                    {submissionError}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                {view === "list" ? (
                    <Box display="flex" justifyContent="space-between" width="100%">
                        {canReview ? (
                            <Button variant="contained" onClick={() => setView("form")}>
                                Scrivi recensione
                            </Button>
                        ) : <Box />}

                        <Button onClick={onClose} color="inherit">
                            Chiudi
                        </Button>
                    </Box>
                ) : view === "success" ? (
                    <Button onClick={onClose} variant="contained" fullWidth>
                        Chiudi
                    </Button>
                ) : (
                    <>
                        <Button onClick={() => setView("list")} color="inherit" disabled={submitting}>
                            Annulla
                        </Button>
                        <Button variant="contained" onClick={handleReviewSubmit} disabled={submitting}>
                            {submitting ? "Invio..." : "Invia Recensione"}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ReviewModal;
