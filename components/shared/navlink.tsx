"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const messagePath = pathname.includes("/messages/");

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-full text-sm font-medium transition-colors",
        pathname === href || (messagePath && href === "/messages")
          ? "bg-messenger-blue text-white"
          : "text-messenger-dark-grey hover:bg-messenger-light-grey"
      )}
    >
      {label}
    </Link>
  );
};

export default Navlink;
