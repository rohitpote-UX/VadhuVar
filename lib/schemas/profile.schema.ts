import { z } from "zod";
import { calculateAge } from "@/lib/utils";

const indianPhoneRegex = /^[6-9]\d{9}$/;

export const step1BasicsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters"),
  gender: z.enum(["Female", "Male", "Other"] as const, {
    message: "Please select your gender",
  }),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((dob) => {
      const age = calculateAge(dob);
      return age >= 18;
    }, "You must be at least 18 years old to register"),
  location: z
    .string()
    .trim()
    .min(2, "Please select or enter your current city and state"),
  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/\D/g, ""))
    .refine(
      (val) => indianPhoneRegex.test(val),
      "Please enter a valid 10-digit Indian phone number starting with 6–9"
    ),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  maritalStatus: z.enum(
    ["Never Married", "Divorced", "Widowed", "Separated"] as const,
    {
      message: "Please select your marital status",
    }
  ),
});

export const step2CareerSchema = z.object({
  education: z.string().trim().min(2, "Please select or enter highest education"),
  institution: z.string().trim().optional().or(z.literal("")),
  profession: z.string().trim().min(2, "Please select or enter your profession"),
  company: z.string().trim().optional().or(z.literal("")),
  income: z.string().optional().or(z.literal("")),
});

export const step3FamilySchema = z.object({
  fatherName: z.string().trim().optional().or(z.literal("")),
  motherName: z.string().trim().optional().or(z.literal("")),
  familyBackground: z.enum(["Nuclear", "Joint", "Other"] as const).optional(),
  siblings: z.string().trim().optional().or(z.literal("")),
  familyLocation: z.string().trim().optional().or(z.literal("")),
  // Optional Maharashtra Cultural Details (मूळ गाव, जन्मस्थळ, जन्मवेळ, रास, नक्षत्र, गोत्र, कुलदैवत, जात, पोटजात)
  nativePlace: z.string().trim().optional().or(z.literal("")),
  birthPlace: z.string().trim().optional().or(z.literal("")),
  birthTime: z.string().trim().optional().or(z.literal("")),
  rashi: z.string().trim().optional().or(z.literal("")),
  nakshatra: z.string().trim().optional().or(z.literal("")),
  gotra: z.string().trim().optional().or(z.literal("")),
  kuldaivat: z.string().trim().optional().or(z.literal("")),
  caste: z.string().trim().optional().or(z.literal("")),
  subcaste: z.string().trim().optional().or(z.literal("")),
});

export const step4PreferencesSchema = z.object({
  height: z.string().optional().or(z.literal("")),
  diet: z.enum(["Vegetarian", "Non-vegetarian", "Eggetarian"] as const).optional(),
  smoking: z.enum(["No", "Yes", "Occasionally"] as const).optional(),
  drinking: z.enum(["No", "Yes", "Occasionally"] as const).optional(),
  hobbies: z.array(z.string()).max(8, "Maximum 8 hobbies allowed").default([]),
  about: z
    .string()
    .trim()
    .max(600, "About me cannot exceed 600 characters")
    .optional()
    .or(z.literal("")),
  partnerPreferences: z.object({
    ageMin: z.number().min(18).max(70).default(24),
    ageMax: z.number().min(18).max(70).default(32),
    location: z.string().trim().optional().or(z.literal("")),
    education: z.string().trim().optional().or(z.literal("")),
    profession: z.string().trim().optional().or(z.literal("")),
    other: z.string().trim().optional().or(z.literal("")),
  }),
});

export const step5MediaSchema = z.object({
  photoUrl: z.string().optional().or(z.literal("")),
  biodataUrl: z.string().optional().or(z.literal("")),
  biodataFileName: z.string().optional().or(z.literal("")),
});

export const step6ReviewSchema = z.object({
  consent: z.literal(true, {
    message: "You must confirm accuracy and consent to the privacy policy",
  }),
});

// Full registration schema
export const registrationSchema = step1BasicsSchema
  .merge(step2CareerSchema)
  .merge(step3FamilySchema)
  .merge(step4PreferencesSchema)
  .merge(step5MediaSchema)
  .merge(step6ReviewSchema);

export type RegistrationFormData = z.infer<typeof registrationSchema>;
