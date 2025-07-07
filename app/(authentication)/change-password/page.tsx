"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/hooks/use-toast";
import { useChangePasswordMutation } from "@/lib/services/userApi";

import { PageTransition } from "@/components/ui/transitions";
import { ArrowLeft, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const { toast } = useToast();

  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Redirect after success
      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      console.error("Password change error:", err);
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <PageTransition>
      <div className="p-4 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/profile")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Change Password</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-center mb-6">
            <div className="bg-messenger-blue/10 p-3 rounded-full">
              <KeyRound className="h-6 w-6 text-messenger-blue" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="border-messenger-grey focus-visible:ring-messenger-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="border-messenger-grey focus-visible:ring-messenger-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="border-messenger-grey focus-visible:ring-messenger-blue"
              />
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
        </div>
      </div>
    </PageTransition>
  );
};

export default ChangePassword;
