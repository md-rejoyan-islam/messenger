"use client";
import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn } from "@/components/ui/transitions";
import { Bell, Info, MessageCircle, UserPlus } from "lucide-react";
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

const Notifications = () => {
  const router = useRouter();

  // Mock notifications data
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
      id: "29",
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
      id: "27",
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
      id: "22",
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
      id: "23",
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
    {
      id: "5",
      type: "message",
      content: "sent you a new message",
      fromUser: {
        id: "105",
        name: "Emma Wilson",
        avatar: "https://i.pravatar.cc/150?img=16",
      },
      time: "4 days ago",
      read: true,
    },
    {
      id: "6",
      type: "info",
      content: "Your password has been changed successfully",
      time: "1 week ago",
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === notification.id ? { ...notif, read: true } : notif
      )
    );

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
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case "info":
        return <Info className="h-5 w-5 text-purple-500" />;
    }
  };

  const friendRequestNotifications = notifications.filter(
    (n) => n.type === "friendRequest"
  );
  const messageNotifications = notifications.filter(
    (n) => n.type === "message"
  );
  const infoNotifications = notifications.filter((n) => n.type === "info");
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <FadeIn>
      <div className="container mx-auto px-4 py-6 pb-24 flex flex-col max-h-screen overflow-hidden ">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-messenger-blue" />
            <h1 className="text-2xl font-bold">Notifications</h1>

            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-messenger-blue text-white text-xs rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>

          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="h-fit overflow-hidden">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="friend_requests">Friend Requests</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="info">System</TabsTrigger>
          </TabsList>

          <div className="overflow-y-scroll h-fit">
            <TabsContent value="all">
              {renderNotificationList(
                notifications,
                handleNotificationClick,
                getNotificationIcon
              )}
            </TabsContent>

            <TabsContent value="friend_requests">
              {renderNotificationList(
                friendRequestNotifications,
                handleNotificationClick,
                getNotificationIcon
              )}
            </TabsContent>

            <TabsContent value="messages">
              {renderNotificationList(
                messageNotifications,
                handleNotificationClick,
                getNotificationIcon
              )}
            </TabsContent>

            <TabsContent value="info">
              {renderNotificationList(
                infoNotifications,
                handleNotificationClick,
                getNotificationIcon
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </FadeIn>
  );
};

const renderNotificationList = (
  notifications: Notification[],
  handleClick: (notification: Notification) => void,
  getIcon: (type: NotificationType) => React.ReactNode
) => {
  if (notifications.length === 0) {
    return (
      <Card className="border border-gray-200 ">
        <div className="flex flex-col items-center justify-center p-6">
          <Bell className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-center text-gray-500">
            No notifications to display
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 divide-y py-0 gap-0">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 flex items-start cursor-pointer hover:bg-gray-50 ${
            !notification.read ? "bg-blue-50/30" : ""
          }`}
          onClick={() => handleClick(notification)}
        >
          <div className="mr-4">
            {notification.fromUser ? (
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={notification.fromUser.avatar}
                  alt={notification.fromUser.name}
                />
                <AvatarFallback>
                  {notification.fromUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                {getIcon(notification.type)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm">
              {notification.fromUser && (
                <span className="font-semibold">
                  {notification.fromUser.name}{" "}
                </span>
              )}
              {notification.content}
            </p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
          {!notification.read && (
            <div className="w-3 h-3 bg-messenger-blue rounded-full mt-2" />
          )}
        </div>
      ))}
    </Card>
  );
};

export default Notifications;
