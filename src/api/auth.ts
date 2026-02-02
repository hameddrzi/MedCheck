import { axiosInstance } from "./axios";
/**
 * per authentication user 
 * Register / Login / ForgotPassword
 * 
 */
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  codiceFiscale: string;
  birthDate: string;
  heightCm?: number;
  password: string;
}


//responce of backend with Consultation
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
  const response = await axiosInstance.post("/auth/login", payload);//post to backend and check pass and userid in backend
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
