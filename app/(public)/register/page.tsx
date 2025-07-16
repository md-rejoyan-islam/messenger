import RegisterForm from "@/components/forms/register-form";
import UnauthenticatedAuthHeader from "@/components/shared/unauthenticated-auth-header";
import { FadeIn } from "@/components/ui/transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Messenger",
  description:
    "Create a new account to get started with Messenger. By registering, you agree to our Terms of Service and Privacy Policy.",
};

const Register = () => {
  return (
    <UnauthenticatedAuthHeader
      title="Create an account"
      subtitle="Sign up to get started with Messenger"
    >
      <FadeIn>
        <RegisterForm />
      </FadeIn>
    </UnauthenticatedAuthHeader>
  );
};

export default Register;
