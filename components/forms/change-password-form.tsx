"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Your existing Label component
import { useChangePasswordMutation } from "@/lib/services/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required." }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters." })
      .max(50, { message: "New password must not exceed 50 characters." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"], // Error will be associated with confirmPassword field
  });

// Infer the type from the Zod schema
type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

const ChangePasswordForm = () => {
  const router = useRouter();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  // --- 2. Initialize React Hook Form ---
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully", {
        description: "Your password has been updated.",
      });

      reset();

      setTimeout(() => router.push("/profile"), 1500);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          {...register("currentPassword")}
          className={cn(
            "border-messenger-grey focus-visible:ring-messenger-blue",
            errors.currentPassword && "border-red-500" // Apply red border if there's an error
          )}
        />
        {errors.currentPassword && (
          <p className="text-sm font-medium text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          {...register("newPassword")}
          minLength={6}
          className={cn(
            "border-messenger-grey focus-visible:ring-messenger-blue",
            errors.newPassword && "border-red-500"
          )}
        />
        {errors.newPassword && (
          <p className="text-sm font-medium text-red-500">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          minLength={6}
          className={cn(
            "border-messenger-grey focus-visible:ring-messenger-blue",
            errors.confirmPassword && "border-red-500"
          )}
        />
        {errors.confirmPassword && (
          <p className="text-sm font-medium text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-messenger-blue hover:bg-messenger-light-blue"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
