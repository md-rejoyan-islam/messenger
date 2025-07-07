"use client";

import Link from "next/link";
import { toast } from "sonner";

import { login } from "@/lib/auth/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./input-field";
import PasswordField from "./password-field";
import SubmitButton from "./submit-button";

// Define your Zod schema for login form validation
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

  // const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login data:", data);

    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      console.log("Login response:", response);

      // await login({ email: data.email, password: data.password }).unwrap();
      // toast.success("Login successful!", {
      //   description: "Welcome back!",
      // });
      reset();
      router.push("/messages");
    } catch (error) {
      toast.error("Login failed", {
        description:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any)?.data?.message || "An error occurred during login.",
      });
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
        isLoading={false} // Replace with actual loading state if using RTK Query
        label="Log in"
        afterSubmit="Logging in..."
      />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-messenger-dark-grey">Or</span>
        </div>
      </div>

      <div className="text-center mt-6">
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
