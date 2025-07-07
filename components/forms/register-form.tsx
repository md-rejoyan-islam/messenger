"use client";

import { useRegisterMutation } from "@/lib/services/authApi";
import Link from "next/link";
import { toast } from "sonner";

// Import Zod and React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Import icons for password visibility toggle
import { useRouter } from "next/navigation";
import InputField from "./input-field";
import PasswordField from "./password-field";
import SubmitButton from "./submit-button";

// Define your Zod schema for registration form validation
const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Full Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Attach the error to the confirmPassword field
  });

// Infer the type from the schema for strong typing
type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: registerField, // Renamed to avoid conflict with RTK Query's register
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema), // Integrate Zod for validation
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // Destructure only name, email, password for the API call
      const { name, email, password } = data;
      await register({ name, email, password }).unwrap();
      toast.success("Registration successful!", {
        description: "Your account has been created. Please log in.",
      });
      reset();
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "An error occurred during registration.";
      toast.error("Registration failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        placeholder="Enter your name"
        type="text"
        id="name"
        label="Full Name"
        errorField={!!errors.name}
        errorMessage={errors.name?.message || ""}
        {...registerField("name")}
      />

      <InputField
        placeholder="Enter your email"
        type="email"
        id="email"
        label="Email"
        errorField={!!errors.email}
        errorMessage={errors.email?.message || ""}
        {...registerField("email")}
      />

      <PasswordField
        id="password"
        label="Password"
        placeholder="Create a password"
        errorField={!!errors.password}
        errorMessage={errors.password?.message || ""}
        {...registerField("password")}
      />

      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        errorField={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message || ""}
        {...registerField("confirmPassword")}
      />

      <SubmitButton
        isLoading={isLoading}
        label="Create account"
        afterSubmit="Creating account..."
      />

      <div className="text-center mt-6">
        <p className="text-sm text-messenger-dark-grey">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-messenger-blue font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-center text-messenger-dark-grey">
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-messenger-blue hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-messenger-blue hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
