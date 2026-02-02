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
  latitude?: number;
  longitude?: number;
};

const normalizeDoctor = (doctor: ApiDoctor): Doctor => { //questa parte fa normalizza tutti i dati delle dati del dottore
  const fullName =
    doctor.fullName ||
    [doctor.firstName, doctor.lastName].filter(Boolean).join(" ")/**fa un spazio */.trim() || 
    "Medico";

  const [firstFromFullName, ...rest] = fullName.split(" "); //tutti i dati vengono e la prima parte diventa first_name altre sono altri informazioni
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
    latitude: doctor.latitude,
    longitude: doctor.longitude,
  };
};

const normalizeReview = (review: Review): Review => ({ //normalizza review
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
  page = 0, //se non ha parametri
  size = 6,
  city = "",
  specialty = "",
  name = "",
}: FetchDoctorsParams = {}): Promise<FetchDoctorsResult> => {
  const response = await axiosInstance.get("/doctors", {
    params: { page, size, city, specialty, name },
  });


  /**
   * backend puo dare 4 modelli di risposta
   */
  const data = response.data;

  if (Array.isArray(data?.content)) {
    return {
      doctors: data.content.map(normalizeDoctor),
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    };
  }

  if (Array.isArray(data)) { //un array normale
    return { doctors: data.map(normalizeDoctor) };
  }

  if (data && typeof data === "object") { //se da un object
    return { doctors: [normalizeDoctor(data as ApiDoctor)] };
  }

  return { doctors: [] }; //se non da una risposta
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
