"use client";

import Link from "next/link";
import { toast } from "sonner";

import { login } from "@/lib/auth/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./input-field";
import PasswordField from "./password-field";
import SubmitButton from "./submit-button";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const { error } = await login({
        email: data.email,
        password: data.password,
      });

      if (error) {
        return toast.error("Login failed", {
          description: error || "An error occurred during login.",
        });
      }

      toast.success("Login successful!", {
        description: "Welcome back!",
      });
      reset();

      router.push("/messages");
    } catch (error) {
      toast.error("Login failed", {
        description:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any)?.data?.message || "An error occurred during login.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        placeholder="Enter your email"
        type="email"
        id="email"
        label="Email"
        errorField={!!errors.email}
        errorMessage={errors.email?.message || ""}
        {...register("email")}
      />

      <PasswordField
        id="password"
        label="Password"
        placeholder="Enter your password"
        errorField={!!errors.password}
        errorMessage={errors.password?.message || ""}
        {...register("password")}
      />

      <div className="flex justify-end items-center">
        <Link
          href="/forgot-password"
          className="text-xs text-messenger-blue hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton
        isLoading={loading}
        label="Log in"
        afterSubmit="Logging in..."
      />

      <div className="text-center">
        <p className="text-sm text-messenger-dark-grey">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-messenger-blue font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
