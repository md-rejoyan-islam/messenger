"use client";

import React from "react";

import {
  LogOut,
  Menu,
  MessageCircle,
  Send,
  User,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { SlideIn } from "../ui/transitions";
import Navlink from "./navlink";
import NotificationCenter from "./notification-center";

const AutheticatedHeader: React.FC = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const router = useRouter();
  const handleLogout = async () => {
    await logout().then(() => {
      router.push("/login");
    });
  };

  const user = {
    id: Math.random().toString(36).substring(2, 9),
    name: "John Doe",
    email: "john@gmail.com",
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
  };

  return (
    <SlideIn
      direction="down"
      className={cn(
        "w-full",
        pathname.includes("/messages/") && id ? "hidden md:block" : ""
      )}
    >
      <header className="border-b border-gray-200 bg-white z-10">
        <div className=" mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/messages"
              className="flex items-center space-x-2 hover-scale"
            >
              <div className="w-9 h-9 rounded-full bg-messenger-blue flex items-center justify-center">
                <MessageCircle className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-messenger-black">
                Messenger
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex space-x-1">
                <Navlink href="/messages" label="Messages" />
                <Navlink href="/friends" label="Friends" />
                <Navlink href="/find-friends" label="Find Friends" />
              </div>

              {/* Notification Center */}
              <NotificationCenter />

              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full overflow-hidden border-2 border-transparent",
                      "hover:border-messenger-blue transition-all duration-200"
                    )}
                  >
                    <Image
                      width={36}
                      height={36}
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 animate-scale-in"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          width={32}
                          height={32}
                          src={user?.avatar}
                          alt={user?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/friends" className="cursor-pointer">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Friends</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/find-friends" className="cursor-pointer">
                      <UserPlus className="w-4 h-4 mr-2" />
                      <span>Find Friends</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/friend-requests" className="cursor-pointer">
                      <UserCheck className="w-4 h-4 mr-2" />
                      <span>Friend Requests</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/sent-requests" className="cursor-pointer">
                      <Send className="w-4 h-4 mr-2" />
                      <span>Sent Requests</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer focus:bg-red-50 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Menu className="w-5 h-5 text-messenger-dark-grey" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/messages" className="cursor-pointer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span>Messages</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/friends" className="cursor-pointer">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Friends</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/find-friends" className="cursor-pointer">
                        <UserPlus className="w-4 h-4 mr-2" />
                        <span>Find Friends</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/friend-requests" className="cursor-pointer">
                        <UserCheck className="w-4 h-4 mr-2" />
                        <span>Friend Requests</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/sent-requests" className="cursor-pointer">
                        <Send className="w-4 h-4 mr-2" />
                        <span>Sent Requests</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </SlideIn>
  );
};

export default AutheticatedHeader;
