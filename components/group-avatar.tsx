import { cn } from "@/lib/utils";
import Image from "next/image";
import Avatar from "./Avatar";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away" | "busy";
  messages: Message[];
  isGroup?: boolean;
  members?: User[];
  media?: Media[];
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status?: "online" | "offline" | "away" | "busy";
}

interface Media {
  id: string;
  type: "image" | "video";
  url: string;
  timestamp: string;
}

interface Message {
  id: string;
  text: string;
  sender: User;
  timestamp: string;
  isSent: boolean;
  status?: "sent" | "delivered" | "read";
  media?: Media;
}

const GroupAvatars = ({ group }: { group: Contact }) => {
  if (!group.members || group.members.length <= 1) {
    return <Avatar src={group.avatar} alt={group.name} status={group.status} />;
  }

  // Show max 3 members
  const visibleMembers = group.members.slice(0, 3);

  return (
    <div className="relative flex items-center">
      {visibleMembers.map((member, index) => (
        <div
          key={member.id}
          className={cn(
            "relative border-2 border-white rounded-full overflow-hidden",
            index === 0 ? "z-30" : index === 1 ? "z-20 -ml-2" : "z-10 -ml-2"
          )}
          style={{ width: "28px", height: "28px" }}
        >
          <Image
            width={28}
            height={28}
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {group.members.length > 3 && (
        <div className="z-0 -ml-1 w-5 h-5 bg-messenger-light-grey rounded-full flex items-center justify-center text-[10px] text-messenger-dark-grey">
          +{group.members.length - 3}
        </div>
      )}
    </div>
  );
};

export default GroupAvatars;
