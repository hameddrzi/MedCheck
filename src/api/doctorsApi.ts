import { axiosInstance } from "./axios";
import type { Doctor, Review } from "../types/doctor";

type ApiDoctor = {
  id?: string | number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  specialty?: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  rating?: number | string;
  totalReviews?: number;
  reviewsCount?: number;
  reviews?: Review[];
};

const normalizeDoctor = (doctor: ApiDoctor): Doctor => {
  const fullName =
    doctor.fullName ||
    [doctor.firstName, doctor.lastName].filter(Boolean).join(" ").trim() ||
    "Medico";

  const [firstFromFullName, ...rest] = fullName.split(" ");
  const lastFromFullName = rest.join(" ").trim();

  return {
    id: Number(doctor.id ?? Date.now()),
    firstName: doctor.firstName || firstFromFullName || "Medico",
    lastName: doctor.lastName || lastFromFullName || "",
    fullName,
    specialty: doctor.specialty ?? "",
    city: doctor.city ?? "",
    address: doctor.address ?? "",
    phone: doctor.phone ?? "",
    email: doctor.email ?? "",
    rating: Number(doctor.rating ?? 0),
    reviewsCount: doctor.reviewsCount ?? doctor.totalReviews ?? 0,
  };
};

const normalizeReview = (review: Review): Review => ({
  id: review.id,
  patientName: review.patientName,
  rating: review.rating,
  comment: review.comment,
  date: review.date,
});

interface FetchDoctorsParams {
  page?: number;
  size?: number;
  city?: string;
  specialty?: string;
  name?: string;
}

interface FetchDoctorsResult {
  doctors: Doctor[];
  totalPages?: number;
  totalElements?: number;
}

export const fetchDoctors = async ({
  page = 0,
  size = 6,
  city = "",
  specialty = "",
  name = "",
}: FetchDoctorsParams = {}): Promise<FetchDoctorsResult> => {
  const response = await axiosInstance.get("/doctors", {
    params: { page, size, city, specialty, name },
  });

  const data = response.data;

  if (Array.isArray(data?.content)) {
    return {
      doctors: data.content.map(normalizeDoctor),
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    };
  }

  if (Array.isArray(data)) {
    return { doctors: data.map(normalizeDoctor) };
  }

  if (data && typeof data === "object") {
    return { doctors: [normalizeDoctor(data as ApiDoctor)] };
  }

  return { doctors: [] };
};

export const fetchDoctorReviews = async (
  doctorId: number
): Promise<Review[]> => {
  const response = await axiosInstance.get(`/doctors/${doctorId}/reviews`);
  const data = response.data;

  if (Array.isArray(data)) {
    return data.map(normalizeReview);
  }

  return [];
};

export const postDoctorReview = async (
  doctorId: number,
  review: { rating: number; comment: string; patientName: string }
): Promise<Review> => {
  const response = await axiosInstance.post(`/doctors/${doctorId}/reviews`, review);
  return normalizeReview(response.data);
};
