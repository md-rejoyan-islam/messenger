"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

import React from "react";

import AutheticatedHeader from "./shared/authenticated-header";
import { PageTransition } from "./ui/transitions";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
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

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return router.push("/login");

    // <Navigate to="/login" replace />;
  }

  return (
    <PageTransition>
      <div className="flex flex-col h-screen overflow-hidden bg-white">
        <AutheticatedHeader />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </PageTransition>
  );
};

export default AppLayout;
