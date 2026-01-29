import { axiosInstance } from "./axios";

export interface ConsultationItem {
  id: number;
  doctorName: string;
  doctorSpecialty?: string;
  doctorCity?: string;
  problemSummary?: string;
  requestDateTime?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  requestDate?: string;
  problem?: string;
  doctorId?: number;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber?: string;
  codiceFiscale?: string;
  birthDate?: string;
  heightCm?: number;
  weightKg?: number;
  gender?: string;
}

export interface UserWithConsultations {
  user: UserProfile;
  consultations: ConsultationItem[];
}

export const fetchUserProfile = async (userId: number | string): Promise<UserProfile> => {
  const response = await axiosInstance.get(`/users/${String(userId).trim()}`);
  return response.data;
};

export const fetchUserConsultations = async (
  userId: number | string
): Promise<ConsultationItem[]> => {
  const response = await axiosInstance.get(
    `/users/${String(userId).trim()}/consultations`
  );
  return response.data;
};

export const fetchUserAndConsultations = async (
  userId: number | string
): Promise<UserWithConsultations> => {
  const [user, consultations] = await Promise.all([
    fetchUserProfile(userId),
    fetchUserConsultations(userId),
  ]);
  return { user, consultations };
};

export const updateUser = async (userId: number | string, data: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await axiosInstance.put(`/users/${userId}`, data);
  return response.data;
};
