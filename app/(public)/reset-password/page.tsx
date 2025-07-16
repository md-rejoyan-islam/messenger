import ResetPasswordForm from "@/components/forms/reset-password-form";
import UnauthenticatedAuthHeader from "@/components/shared/unauthenticated-auth-header";
import { FadeIn } from "@/components/ui/transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Messenger",
  description:
    "Reset your password to regain access to your Messenger account. Enter your new password below.",
};

const ForgotPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { token } = await searchParams;
  return (
    <UnauthenticatedAuthHeader
      title="Reset your password"
      subtitle="Set a new password for your account"
    >
      <FadeIn>
        <ResetPasswordForm token={token} />
      </FadeIn>
    </UnauthenticatedAuthHeader>
  );
};

export default ForgotPassword;
