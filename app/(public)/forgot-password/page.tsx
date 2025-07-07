"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";

import UnauthenticatedAuthHeader from "@/components/shared/unauthenticated-auth-header";
import { FadeIn } from "@/components/ui/transitions";
import { KeyRound } from "lucide-react";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real application, this would call an API endpoint
      setEmailSent(true);
      toast({
        title: "Reset link sent",
        description:
          "If the email exists in our system, you will receive a password reset link.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Failed to send reset link",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UnauthenticatedAuthHeader
      title="Reset your password"
      subtitle="We'll send you a link to reset your password"
    >
      <FadeIn>
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
              disabled={isSubmitting}
              className="w-full bg-messenger-blue hover:bg-messenger-light-blue"
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </Button>

            <div className="text-center mt-6">
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
                  onClick={() => setEmailSent(false)}
                  className="text-messenger-blue font-medium hover:underline"
                >
                  Try again
                </button>
              </p>
            </div>
            <div className="pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Back to login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </FadeIn>
    </UnauthenticatedAuthHeader>
  );
};

export default ForgotPassword;
