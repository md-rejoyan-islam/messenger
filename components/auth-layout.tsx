"use client";
import React from "react";

import { useAuth } from "@/lib/auth-context";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageTransition } from "./ui/transitions";

const AuthLayout = ({
  children,
  title,
  subtitle,
  requireAuth = false,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  requireAuth?: boolean;
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  const router = useRouter();

  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex space-x-1 mb-4">
            <div
              className="w-3 h-3 rounded-full bg-messenger-blue animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-messenger-blue animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-messenger-blue animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle authentication redirects
  if (requireAuth && !isAuthenticated) {
    return router.push("/login");

    // <Navigate to="/login" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return router.push("/messages");

    // <Navigate to="/messages" replace />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-messenger-blue flex items-center justify-center mb-4 shadow-lg">
              <MessageCircle className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-messenger-black">
              {title}
            </h1>
            <p className="text-messenger-dark-grey mt-2 text-center">
              {subtitle}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl">{children}</div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthLayout;
