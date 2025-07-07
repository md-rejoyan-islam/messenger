import { cn } from "@/lib/utils";
import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "away" | "busy" | null;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  status = null,
  className,
}) => {
  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const statusColors = {
    online: "bg-messenger-green",
    offline: "bg-gray-400",
    away: "bg-amber-400",
    busy: "bg-red-500",
  };

  const statusSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden border-2 border-white",
          sizeClass[size]
        )}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {status && (
        <div
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            statusColors[status],
            statusSizes[size]
          )}
        ></div>
      )}
    </div>
  );
};

export default Avatar;
