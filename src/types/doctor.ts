export interface Review {
  id?: number;
  patientName: string;
  rating: number;
  comment?: string;
  date: string;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  specialty: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
}
