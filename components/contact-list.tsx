"use client";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Plus, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "./Avatar";
import CreateGroupChat from "./create-group-chat";
import GroupAvatars from "./group-avatar";
import { Button } from "./ui/button";

export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: "online" | "offline" | "away" | "busy";
}

export interface Media {
  id: string;
  type: "image" | "video";
  url: string;
  timestamp: string;
}

export interface Message {
  id: string;
  text: string;
  sender: User;
  timestamp: string;
  isSent: boolean;
  status?: "sent" | "delivered" | "read";
  media?: Media;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away" | "busy";
  messages: Message[];
  isGroup?: boolean;
  members?: User[];
  media?: Media[];
}

// Mock contacts data
const mockContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "online",
    lastMessage: "Hey, how are you doing?",
    time: "10:30 AM",
    unread: 3,
  },
  {
    id: "2",
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "offline",
    lastMessage: "Did you see the latest update?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=16",
    status: "online",
    lastMessage: "Sure, let's meet at 2pm",
    time: "2 days ago",
    unread: 0,
  },
  {
    id: "4",
    name: "James Moore",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "away",
    lastMessage: "Thanks for your help!",
    time: "1 week ago",
    unread: 0,
  },
  {
    id: "5",
    name: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?img=60",
    status: "busy",
    lastMessage: "I need to reschedule our meeting",
    time: "2 weeks ago",
    unread: 0,
  },
];
// Mock groups data
const mockGroups: Contact[] = [
  {
    id: "group1",
    name: "Project Team",
    avatar: "https://i.pravatar.cc/150?img=70",
    status: "online",
    isGroup: true,
    messages: [
      {
        id: "1",
        text: "Hi everyone! Just checking in on our project progress.",
        sender: {
          id: "user5",
          name: "David Wilson",
          avatar: "https://i.pravatar.cc/150?img=70",
        },
        timestamp: "2023-07-15T14:30:00Z",
        isSent: false,
      },
      {
        id: "2",
        text: "I've completed the design mockups. Will share them shortly.",
        sender: {
          id: "user",
          name: "You",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        timestamp: "2023-07-15T14:32:00Z",
        isSent: true,
        status: "read",
      },
    ],
    members: [
      {
        id: "user",
        name: "You",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      {
        id: "user5",
        name: "David Wilson",
        avatar: "https://i.pravatar.cc/150?img=70",
      },
      {
        id: "user2",
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
    ],
  },
  {
    id: "group2",
    name: "Family",
    avatar: "https://i.pravatar.cc/150?img=60",
    status: "online",
    isGroup: true,
    messages: [
      {
        id: "1",
        text: "Are we still on for dinner this weekend?",
        sender: {
          id: "user7",
          name: "Mom",
          avatar: "https://i.pravatar.cc/150?img=45",
        },
        timestamp: "2023-07-14T19:30:00Z",
        isSent: false,
      },
    ],
    members: [
      {
        id: "user",
        name: "You",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      {
        id: "user7",
        name: "Mom",
        avatar: "https://i.pravatar.cc/150?img=45",
      },
      {
        id: "user8",
        name: "Dad",
        avatar: "https://i.pravatar.cc/150?img=46",
      },
    ],
  },
];

const ContactList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const [groups, setGroups] = useState<Contact[]>(mockGroups);

  // Filter contacts based on search query
  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Filter groups based on search query if groups exist
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const router = useRouter();

  const handleGoToMessages = (id: string) => {
    setSelectedContactId(id);
    router.push(`/messages/${id}?type=contact`);
  };
  // Handle contact selection
  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
    router.push(`/messages/${contactId}?type=group`);

    // On mobile, navigate to single conversation view
    // if (isMobile) {
    //   navigate(`/conversation/${contactId}`);
    // }
  };

  // Handle group creation
  const handleCreateGroup = (groupName: string) => {
    // In a real app, this would send a request to create a group on the server
    // For now, we'll just mock it
    const newGroup: Contact = {
      id: `group${Date.now()}`,
      name: groupName,
      avatar: "https://i.pravatar.cc/150?img=68",
      status: "online",
      isGroup: true,
      messages: [],
      members: [
        {
          id: "user",
          name: "You",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        // In a real app, you would map memberIds to actual user objects here
      ],
    };

    setGroups([newGroup, ...groups]);

    toast({
      title: "Group Created",
      description: `"${groupName}" group has been created successfully.`,
    });
  };

  return (
    <>
      <div className="h-[calc(100vh-65px)] flex flex-col border-r">
        <div className="md:col-span-1 border-r">
          <div className="p-3 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-messenger-blue"
              onClick={() => setShowCreateGroup(true)}
            >
              <Users className="h-4 w-4" />
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="p-3.5 border-b ">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contacts"
              className="pl-9 bg-messenger-light-grey border-0 focus-visible:ring-1 focus-visible:ring-messenger-blue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll">
          {filteredContacts.length === 0 && filteredGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Users className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">No contacts found</h3>
              <p className="text-muted-foreground text-sm">
                Try a different search term
              </p>
            </div>
          ) : (
            <ul className="divide-y">
              {/* Display Groups first */}
              {filteredGroups.length > 0 && (
                <>
                  <li className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                    Groups
                  </li>
                  {filteredGroups.map((group) => (
                    <li key={group.id}>
                      <button
                        onClick={() => handleContactSelect(group.id)}
                        className={cn(
                          "w-full p-4 flex cursor-pointer items-center space-x-3 hover:bg-messenger-light-grey transition-colors duration-200",
                          selectedContactId === group.id && "bg-blue-50"
                        )}
                      >
                        <GroupAvatars group={group} />
                        <div className="flex-1 text-left overflow-hidden">
                          <div className="flex justify-between items-center">
                            <span className="font-medium truncate">
                              {group.name}
                            </span>
                            <span className="text-xs text-messenger-dark-grey whitespace-nowrap">
                              {group.messages && group.messages.length > 0
                                ? new Date(
                                    group.messages[
                                      group.messages.length - 1
                                    ].timestamp
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-messenger-dark-grey truncate pr-2">
                              {group.messages && group.messages.length > 0
                                ? `${
                                    group.messages[group.messages.length - 1]
                                      .sender.name
                                  }: ${
                                    group.messages[group.messages.length - 1]
                                      .text
                                  }`
                                : "No messages yet"}
                            </p>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                  <li className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                    Contacts
                  </li>
                </>
              )}
              {/* Display Contacts */}
              {filteredContacts.map((contact) => (
                <li key={contact.id}>
                  <button
                    onClick={() => handleGoToMessages(contact.id)}
                    className={cn(
                      "w-full p-4 cursor-pointer flex items-center space-x-3 hover:bg-messenger-light-grey transition-colors duration-200",
                      selectedContactId === contact.id && "bg-blue-50"
                    )}
                  >
                    <Avatar
                      src={contact.avatar}
                      alt={contact.name}
                      status={
                        contact.status as "online" | "offline" | "away" | "busy"
                      }
                    />
                    <div className="flex-1 text-left overflow-hidden">
                      <div className="flex justify-between items-center">
                        <span className="font-medium truncate">
                          {contact.name}
                        </span>
                        <span className="text-xs text-messenger-dark-grey whitespace-nowrap">
                          {contact.time}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-messenger-dark-grey truncate pr-2">
                          {contact.lastMessage}
                        </p>
                        {contact.unread > 0 && (
                          <span className="flex-shrink-0 bg-messenger-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <CreateGroupChat
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        onCreateGroup={handleCreateGroup}
      />
    </>
  );
};

export default ContactList;
