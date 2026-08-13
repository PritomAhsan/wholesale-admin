import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | B2B Marketplace Admin",
  description: "Reset your B2B Marketplace admin panel password.",
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
