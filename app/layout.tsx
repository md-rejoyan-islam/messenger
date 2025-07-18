import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>{children}</AuthProvider>
        </StoreProvider>
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              error: "bg-red-500! text-red-50! border-red-500!",
              closeButton:
                "bg-red-100! text-red-800! hover:bg-red-300! border-red-200!",
              success: "bg-green-500! text-green-50! border-green-500!",
            },
          }}
          closeButton
        />
      </body>
    </html>
  );
}
