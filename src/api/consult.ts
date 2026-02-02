import { axiosInstance } from "./axios";

/**
 * questinario Field
 */
export interface ConsultationRequestPayload {
  firstName: string;
  lastName: string;
  codiceFiscale: string;
  phoneNumber?: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  activityLevel: string;
  hasPastDiseases: boolean;
  currentMedications?: string;
  nausea?: boolean;
  headache?: boolean;
  fever?: boolean;
  dizziness?: boolean;
  chestPain?: boolean;
  shortnessOfBreath?: boolean;
  fatigue?: boolean;
  systolicPressure?: number;
  diastolicPressure?: number;
  symptomsDescription?: string;
  symptomsDuration?: string;
}

export interface ConsultationResponsePayload {
  id?: number;
  doctorId?: number;
  urgency?: string;
  message?: string;
  recommendations?: string[];
  appointmentDate?: string;
  appointmentTime?: string;
  firstName?: string;
  lastName?: string;
  codiceFiscale?: string;
  phoneNumber?: string;
  age?: number;
  gender?: string;
  heightCm?: number;
  weightKg?: number;
  activityLevel?: string;
  hasMedicalHistory?: boolean;
  currentMedications?: string;
  nausea?: boolean;
  headache?: boolean;
  fever?: boolean;
  dizziness?: boolean;
  chestPain?: boolean;
  fatigue?: boolean;
  shortnessOfBreath?: boolean;
  systolicPressure?: number;
  diastolicPressure?: number;
  symptomsDescription?: string;
  symptomsDuration?: string;
  doctor?: {
    id?: number;
    firstName?: string;
    lastName?: string;
    specialty?: string;
    city?: string;
    address?: string;
  };
}

export interface AssignDoctorPayload {
  doctorId: number;
  appointmentDate: string; // ISO date (yyyy-MM-dd)
  appointmentTime: string; // HH:mm
}

export const submitConsultation = async (
  payload: ConsultationRequestPayload
): Promise<ConsultationResponsePayload> => {
  const response = await axiosInstance.post("/consultations", payload);
  return response.data;
};

export const assignDoctorToConsultation = async (
  consultationId: number,
  payload: AssignDoctorPayload
): Promise<ConsultationResponsePayload> => {
  const response = await axiosInstance.put(
    `/consultations/${consultationId}/doctor`,
    payload
  );
  return response.data;
};

export const getConsultationById = async (
  consultationId: number
): Promise<ConsultationResponsePayload> => {
  const response = await axiosInstance.get(
    `/consultations/${consultationId}`
  );
  return response.data;
};
