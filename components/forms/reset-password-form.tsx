"use client";

import { useResetPasswordMutation } from "@/lib/services/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import PasswordField from "./password-field";
import SubmitButton from "./submit-button";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = ({ token }: { token?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [resetPasswod, { isLoading }] = useResetPasswordMutation();

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const { password } = data;

    try {
      await resetPasswod({
        token,
        newPassword: password,
      }).unwrap();

      toast.success("Password reset successful", {
        description: "Your password has been reset successfully.",
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PasswordField
          id="password"
          label="New Password"
          placeholder="Create a new password"
          errorField={!!errors.password}
          errorMessage={errors.password?.message || ""}
          {...register("password")}
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          errorField={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message || ""}
          {...register("confirmPassword")}
        />

        <SubmitButton
          isLoading={isLoading}
          label="Create account"
          afterSubmit="Creating account..."
        />
        <div className="text-center ">
          <p className="text-sm text-messenger-dark-grey">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="text-messenger-blue font-medium hover:underline"
            >
              Back to login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
