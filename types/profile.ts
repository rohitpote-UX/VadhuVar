export type Gender = "Female" | "Male" | "Other";

export type MaritalStatus =
  | "Never Married"
  | "Divorced"
  | "Widowed"
  | "Separated";

export type FamilyBackground = "Nuclear" | "Joint" | "Other";

export type Diet = "Vegetarian" | "Non-vegetarian" | "Eggetarian";

export type Habit = "No" | "Yes" | "Occasionally";

export type ProfileStatus = "new" | "active" | "inactive" | "matched" | "closed";

export interface CulturalDetails {
  nativePlace?: string; // मूळ गाव
  birthPlace?: string; // जन्मस्थळ
  birthTime?: string; // जन्मवेळ
  rashi?: string; // रास
  nakshatra?: string; // नक्षत्र
  gotra?: string; // गोत्र
  kuldaivat?: string; // कुलदैवत
  caste?: string; // जात (ऐच्छिक)
  subcaste?: string; // पोटजात (ऐच्छिक)
  horoscopeUrl?: string; // कुंडली / पत्रिका
}

export interface PartnerPreferences {
  ageMin: number;
  ageMax: number;
  location?: string;
  education?: string;
  profession?: string;
  other?: string;
}

export interface Profile {
  id: string;
  fullName: string;
  gender: Gender;
  dateOfBirth: string; // ISO string YYYY-MM-DD
  age: number; // Derived
  phone: string;
  email?: string;
  location: string; // City, State
  maritalStatus: MaritalStatus;
  education: string;
  institution?: string;
  profession: string;
  company?: string;
  income?: string;
  fatherName?: string;
  motherName?: string;
  familyBackground?: FamilyBackground;
  siblings?: string;
  familyLocation?: string;
  height?: string; // e.g. "5' 9\" (175 cm)"
  diet?: Diet;
  smoking?: Habit;
  drinking?: Habit;
  hobbies: string[];
  about?: string;
  culturalDetails?: CulturalDetails;
  partnerPreferences: PartnerPreferences;
  photoUrl?: string; // Data URL or object URL in mock
  biodataUrl?: string; // Data URL or object URL in mock
  biodataFileName?: string;
  status: ProfileStatus;
  adminNotes?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type ProfileInput = Omit<Profile, "id" | "age" | "createdAt" | "updatedAt">;

export interface ProfileFilters {
  gender?: Gender[];
  ageMin?: number;
  ageMax?: number;
  locations?: string[];
  educations?: string[];
  professions?: string[];
  maritalStatuses?: MaritalStatus[];
  statuses?: ProfileStatus[];
}

export type SortField = "fullName" | "age" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface SortOption {
  field: SortField;
  order: SortOrder;
}

export interface DashboardStats {
  totalProfiles: number;
  newProfilesLast7Days: number;
  activeProfiles: number;
  inactiveProfiles: number;
  matchedProfiles: number;
  closedProfiles: number;
  statusCounts: Record<ProfileStatus, number>;
}
