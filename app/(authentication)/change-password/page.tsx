import ChangePasswordForm from "@/components/forms/change-password-form";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/transitions";
import { ArrowLeft, KeyRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Change Password",
  description:
    "Change your account password. Ensure your account security by updating your password regularly.",
};

const ChangePassword = () => {
  return (
    <PageTransition>
      <div className="p-4 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2">
            <Link href={"/profile"}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Change Password</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-center mb-6">
            <div className="bg-messenger-blue/10 p-3 rounded-full">
              <KeyRound className="h-6 w-6 text-messenger-blue" />
            </div>
          </div>

          <ChangePasswordForm />
        </div>
      </div>
    </PageTransition>
  );
};

export default ChangePassword;
