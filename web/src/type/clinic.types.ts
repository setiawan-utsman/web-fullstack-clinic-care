export interface ClinicQueryParams {
    name?: string;
}

export interface Specialist {
    id: string;
    name: string;
    specialization: string;
    image: string;
    rating: number;
    totalReviews: number;
}

export interface Facility {
    id: string;
    name: string;
    icon?: string;
}

export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Clinic {
    id: string;
    name: string;
    type: string;
    address: string;
    rating: number;
    totalReviews: number;
    images: string[];
    tabs: string[];
    specialists: Specialist[];
    facilities: Facility[];
    reviews: Review[];
}

export interface Category {
    id: number;
    name: string;
}

export interface Booking {
    id: number;
    NamaLengkap: string;
    NoHp: string;
    JenisKelamin: string;
    TanggalLahir: string;
    AlamatLengkap: string;
}