"use client";
import { logout } from "@/lib/auth/actions";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const HomeHeader = () => {
  const [isAuthenticated] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    await logout().then(() => {
      router.push("/login");
    });
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-full bg-messenger-blue flex items-center justify-center">
            <MessageCircle className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-messenger-black">
            Messenger
          </span>
        </div>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button asChild>
                <Link href="/messages">
                  Go to Messages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button onClick={handleLogout} variant="ghost">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                asChild
                className="bg-messenger-blue hover:bg-messenger-light-blue"
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
