"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import { useForgotPasswordMutation } from "@/lib/services/authApi";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [forgorPassword, { isLoading }] = useForgotPasswordMutation();

  const sendMail = async () => {
    try {
      await forgorPassword({ email }).unwrap();

      setEmailSent(true);
      toast.success("Reset link sent", {
        description:
          "If the email exists in our system, you will receive a password reset link.",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "An error occurred during registration.";
      toast.error("Registration failed", {
        description: errorMessage,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required", {
        description: "Please enter your email address.",
      });
    }

    sendMail();
  };

  const resendEmail = () => {
    sendMail();
  };

  return (
    <>
      {!emailSent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-messenger-grey focus-visible:ring-messenger-blue"
            />
            <p className="text-xs text-messenger-dark-grey">
              Enter the email associated with your account
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-messenger-blue hover:bg-messenger-light-blue"
          >
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>

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
      ) : (
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <KeyRound size={24} />
            </div>
          </div>
          <h3 className="text-xl font-medium">Check your email</h3>
          <p className="text-messenger-dark-grey">
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
          <div className="pt-4">
            <p className="text-sm text-messenger-dark-grey">
              Didn&apos;t receive the email?{" "}
              <button
                onClick={resendEmail}
                className="text-messenger-blue font-medium hover:underline cursor-pointer"
              >
                Try again
              </button>
            </p>
          </div>
          <div className="pt-4">
            <Link href="/login">
              <Button variant="outline" className="w-full cursor-pointer">
                Back to login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
