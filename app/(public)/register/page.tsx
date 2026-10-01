import { RegistrationWizard } from "@/components/register/RegistrationWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Your Profile — Vivaha Studio",
  description:
    "Confidential multi-step matrimonial registration. Your profile is handled with absolute privacy by our matchmaker.",
};

export default function RegisterPage() {
  return <RegistrationWizard />;
}
