import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import type { Review } from "../../types/doctor";
import { fetchDoctorReviews } from "../../api/doctorsApi";
import ReviewModal from "../../components/ReviewModal";

type Props = {
  doctorId: number;
  canReview?: boolean;
};

const MAX_REVIEWS_SHOWN = 2;

export default function DoctorReviews({ doctorId, canReview = false }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctorReviews(doctorId);
        if (active) {
          setReviews(data.slice(0, MAX_REVIEWS_SHOWN));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadReviews();
    return () => {
      active = false;
    };
  }, [doctorId]);

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="subtitle2" sx={{ color: "rgba(0,0,0,0.7)", mb: 1 }}>
        Ultime recensioni
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.55)" }}>
            Caricamento recensioni...
          </Typography>
        </Box>
      )}

      {!loading && reviews.length === 0 && (
        <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.55)", mb: 1 }}>
          Ancora nessuna recensione.
        </Typography>
      )}

      <Stack spacing={1.5}>
        {reviews.map((review) => (
          <Box
            key={`${review.patientName}-${review.date}`}
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "#f7f9fd",
              border: "1px solid rgba(46,107,255,0.08)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {review.patientName}
              </Typography>
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                size="small"
              />
              <Typography variant="caption" sx={{ color: "rgba(0,0,0,0.45)" }}>
                {review.date}
              </Typography>
            </Box>
            {review.comment && (
              <Box sx={{ display: "flex", alignItems: "flex-start", mt: 0.5 }}>
                <FormatQuoteIcon
                  sx={{ fontSize: 18, color: "rgba(46,107,255,0.7)", mr: 0.5 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(0,0,0,0.75)", lineHeight: 1.4 }}
                >
                  {review.comment}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Stack>



      {/* Button to show all reviews */}
      <Button
        variant="text"
        size="small"
        onClick={() => setModalOpen(true)}
        sx={{ mt: 1, textTransform: 'none' }}
      >
        Mostra più recensioni
      </Button>

      <ReviewModal
        open={modalOpen} //boolear
        onClose={() => setModalOpen(false)} //chiedere modal
        doctorId={doctorId} // fetch tutti review di dottore
        canReview={canReview} //boolean
        initialView="list" //mostra la lista
      />
    </Box>
  );
}


