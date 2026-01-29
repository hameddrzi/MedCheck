import { axiosInstance } from "./axios";

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  codiceFiscale: string;
  birthDate: string;
  heightCm?: number;
  password: string;
}

export interface RegisterResponse {
  user?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    codiceFiscale?: string;
    birthDate?: string;
    heightCm?: number;
  };
  consultations?: any[];
}

export interface UserProfileResponse {
  id: number;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  codiceFiscale?: string;
  birthDate?: string;
  heightCm?: number;
  gender?: string;
  weightKg?: number;
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};

export interface LoginPayload {
  identifier: string; // mobile number or codice fiscale
  password: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<UserProfileResponse> => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

export interface ResetPasswordPayload {
  identifier: string;
  newPassword: string;
}

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<void> => {
  await axiosInstance.post("/auth/forgot-password", payload);
};
