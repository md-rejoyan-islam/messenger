import LoginForm from "@/components/forms/login-form";
import UnauthenticatedAuthHeader from "@/components/shared/unauthenticated-auth-header";
import { FadeIn } from "@/components/ui/transitions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Messenger",
  description:
    "Log in to your Messenger account. By logging in, you agree to our Terms of Service and Privacy Policy.",
};

const Login = () => {
  return (
    <UnauthenticatedAuthHeader
      title="Welcome back"
      subtitle="Log in to your account to continue"
    >
      <FadeIn>
        <LoginForm />
      </FadeIn>
    </UnauthenticatedAuthHeader>
  );
};

export default Login;
