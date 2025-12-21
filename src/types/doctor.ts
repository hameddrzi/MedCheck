export interface Review {
    id: string;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    address: string;
    city: string;
    rating: number;
    totalReviews: number;
    reviews: Review[];
    imageUrl?: string;
    phone?: string;
    email?: string;
}
