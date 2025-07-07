import { Bell, Info, MessageCircle, UserPlus } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type NotificationType = "friendRequest" | "message" | "info";

type Notification = {
  id: string;
  type: NotificationType;
  content: string;
  fromUser?: {
    id: string;
    name: string;
    avatar: string;
  };
  time: string;
  read: boolean;
};

const NotificationCenter = () => {
  // const navigate = userouter.push();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "friendRequest",
      content: "sent you a friend request",
      fromUser: {
        id: "101",
        name: "Jessica Brown",
        avatar: "https://i.pravatar.cc/150?img=10",
      },
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "message",
      content: "sent you a new message",
      fromUser: {
        id: "102",
        name: "Michael Wilson",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "friendRequest",
      content: "sent you a friend request",
      fromUser: {
        id: "103",
        name: "Christopher Taylor",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      time: "1 day ago",
      read: true,
    },
    {
      id: "4",
      type: "info",
      content: "Your profile has been updated successfully",
      time: "3 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);

    // Navigate based on notification type
    if (notification.type === "friendRequest") {
      router.push("/friend-requests");
    } else if (notification.type === "message" && notification.fromUser) {
      router.push(`/conversation/${notification.fromUser.id}`);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "friendRequest":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "message":
        return <MessageCircle className="h-4 w-4 text-green-500" />;
      case "info":
        return <Info className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <Bell className="h-5 w-5 text-messenger-dark-grey" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white h-5 min-w-5 p-0 flex items-center justify-center rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-7"
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            <Bell className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex items-start p-3 cursor-pointer",
                  !notification.read && "bg-muted/50"
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex-shrink-0 mr-3">
                  {notification.fromUser ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={notification.fromUser.avatar}
                        alt={notification.fromUser.name}
                      />
                      <AvatarFallback>
                        {notification.fromUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {notification.fromUser && (
                      <span className="font-semibold">
                        {notification.fromUser.name}{" "}
                      </span>
                    )}
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-messenger-blue rounded-full flex-shrink-0 mt-2" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-center justify-center"
          onClick={() => router.push("/notifications")}
        >
          <span className="text-sm text-messenger-blue">
            View all notifications
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;
