import ForgotPasswordForm from "@/components/forms/forgot-password-form";
import UnauthenticatedAuthHeader from "@/components/shared/unauthenticated-auth-header";
import { FadeIn } from "@/components/ui/transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Messenger",
  description:
    "Forgot your password? Enter your email to receive a link to reset your password.",
};

const ForgotPassword = () => {
  return (
    <UnauthenticatedAuthHeader
      title="Forgot your password"
      subtitle="We'll send you a link to reset your password"
    >
      <FadeIn>
        <ForgotPasswordForm />
      </FadeIn>
    </UnauthenticatedAuthHeader>
  );
};

export default ForgotPassword;
