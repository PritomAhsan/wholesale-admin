import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | B2B Marketplace Admin",
  description: "Sign in to the B2B Marketplace admin panel.",
};

export default function SignIn() {
  return <SignInForm />;
}
