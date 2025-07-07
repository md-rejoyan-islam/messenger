"use client";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Info, Paperclip, Phone, Send, Video } from "lucide-react";

import Avatar from "@/components/Avatar";
import ContactDetailDrawer from "@/components/contact-details-drawer";
import ContactList from "@/components/contact-list";
import MessageBubble, {
  Message as MessageType,
} from "@/components/MessageBubble";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// Mock contact data (this should be fetched from a backend in a real app)
const mockContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "online" as const,
    messages: [
      {
        id: "1",
        text: "Hey there! How are you doing?",
        sender: {
          id: "1",
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        timestamp: "2023-07-15T10:30:00Z",
        isSent: false,
      },
      {
        id: "2",
        text: "I'm great, thanks for asking! How about you?",
        sender: {
          id: "user",
          name: "User",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        timestamp: "2023-07-15T10:32:00Z",
        isSent: true,
        status: "read" as const,
      },
      {
        id: "3",
        text: "I'm doing well! Just finishing up some work.",
        sender: {
          id: "1",
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=32",
        },
        timestamp: "2023-07-15T10:33:00Z",
        isSent: false,
      },
      {
        id: "4",
        text: "Great! Do you want to grab coffee later this afternoon?",
        sender: {
          id: "user",
          name: "User",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        timestamp: "2023-07-15T10:35:00Z",
        isSent: true,
        status: "read" as const,
      },
    ],
  },
  {
    id: "2",
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "offline" as const,
    messages: [
      {
        id: "1",
        text: "Did you see the latest update?",
        sender: {
          id: "2",
          name: "Michael Brown",
          avatar: "https://i.pravatar.cc/150?img=12",
        },
        timestamp: "2023-07-14T15:20:00Z",
        isSent: false,
      },
    ],
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=16",
    status: "online" as const,
    messages: [
      {
        id: "1",
        text: "Hey, are we still meeting tomorrow?",
        sender: {
          id: "user",
          name: "User",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        timestamp: "2023-07-13T09:20:00Z",
        isSent: true,
        status: "read" as const,
      },
      {
        id: "2",
        text: "Yes, 2pm at the coffee shop works for me!",
        sender: {
          id: "3",
          name: "Emma Wilson",
          avatar: "https://i.pravatar.cc/150?img=16",
        },
        timestamp: "2023-07-13T09:25:00Z",
        isSent: false,
      },
      {
        id: "3",
        text: "Perfect, see you then!",
        sender: {
          id: "user",
          name: "User",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        timestamp: "2023-07-13T09:30:00Z",
        isSent: true,
        status: "read" as const,
      },
    ],
  },
  {
    id: "4",
    name: "James Moore",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "away" as const,
    messages: [
      {
        id: "1",
        text: "Thanks for your help earlier!",
        sender: {
          id: "4",
          name: "James Moore",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        timestamp: "2023-07-10T14:15:00Z",
        isSent: false,
      },
      {
        id: "2",
        text: "No problem at all! Let me know if you need anything else.",
        sender: {
          id: "user",
          name: "User",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        timestamp: "2023-07-10T14:20:00Z",
        isSent: true,
        status: "read" as const,
      },
    ],
  },
  {
    id: "5",
    name: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?img=60",
    status: "busy" as const,
    messages: [
      {
        id: "1",
        text: "I need to reschedule our meeting from Thursday to Friday. Does that work?",
        sender: {
          id: "5",
          name: "Alex Chen",
          avatar: "https://i.pravatar.cc/150?img=60",
        },
        timestamp: "2023-07-05T11:10:00Z",
        isSent: false,
      },
      {
        id: "2",
        text: "Friday works perfect for me. Same time?",
        sender: {
          id: "user",
          name: "User",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        timestamp: "2023-07-05T11:20:00Z",
        isSent: true,
        status: "read" as const,
      },
      {
        id: "3",
        text: "Yes, 3pm works great. Thank you!",
        sender: {
          id: "5",
          name: "Alex Chen",
          avatar: "https://i.pravatar.cc/150?img=60",
        },
        timestamp: "2023-07-05T11:25:00Z",
        isSent: false,
      },
    ],
  },
];

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

// Emoji data
const emojiGroups = [
  {
    name: "Smileys",
    emojis: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
    ],
  },
  {
    name: "Hand Gestures",
    emojis: [
      "👍",
      "👎",
      "👌",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "👆",
      "👇",
      "✋",
      "🤚",
      "🖐️",
      "🖖",
      "👋",
      "🤏",
      "👏",
    ],
  },
  {
    name: "Love & Hearts",
    emojis: [
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "💔",
      "❣️",
      "💕",
      "💞",
      "💓",
      "💗",
      "💖",
      "💘",
      "💝",
      "💟",
      "☮️",
      "✝️",
    ],
  },
];

const SingleConversation = () => {
  const { id: contactId } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // const navigate = useNavigate();
  const router = useRouter();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentContact, setCurrentContact] = useState<{
    id: string;
    name: string;
    avatar: string;
    status: "online" | "offline" | "away" | "busy";
    messages: Message[];
    isGroup?: boolean;
    members?: User[];
    media?: Media[];
  } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Effect to update messages when contactId changes
  useEffect(() => {
    if (contactId) {
      const group = mockGroups.find((g) => g.id === contactId);
      const contact = mockContacts.find((c) => c.id === contactId);
      if (type === "group" && group) {
        setCurrentContact(group);
        setMessages(group?.messages);
      } else if (type === "contact" && contact) {
        setCurrentContact(contact);
        setMessages(contact?.messages);

        // Simulate typing indicator randomly
        if (Math.random() > 0.5) {
          setIsTyping(true);
          const timer = setTimeout(() => {
            setIsTyping(false);

            // Add a new message from the contact
            const responseMessages = [
              "Hey, how's it going?",
              "That sounds great!",
              "I'll get back to you on that.",
              "Let me think about it and let you know.",
              "Sure, that works for me!",
            ];

            const randomResponse =
              responseMessages[
                Math.floor(Math.random() * responseMessages.length)
              ];

            const newMsg: Message = {
              id: Date.now().toString(),
              text: randomResponse,
              sender: {
                id: contact?.id,
                name: contact.name,
                avatar: contact.avatar,
              },
              timestamp: new Date().toISOString(),
              isSent: false,
            };

            setMessages((prev) => [...prev, newMsg]);
          }, 3000);

          return () => clearTimeout(timer);
        }
      }
    } else {
      router.push("/messages");
    }
  }, [contactId, router, type]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handler for sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !selectedFile) return;

    let messageText = newMessage.trim();
    if (selectedFile) {
      messageText += messageText
        ? `\n[File attached: ${selectedFile.name}]`
        : `[File attached: ${selectedFile.name}]`;
    }

    // Create a new message
    const message: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: {
        id: user?.id || "user",
        name: user?.name || "User",
        avatar: user?.avatar || "https://i.pravatar.cc/150?img=8",
      },
      timestamp: new Date().toISOString(),
      isSent: true,
      status: "sent",
    };

    // Add message to state
    setMessages((prev) => [...prev, message]);

    // Clear input and selected file
    setNewMessage("");
    setSelectedFile(null);

    // Simulate typing response from contact
    setTimeout(() => {
      setIsTyping(true);

      // Simulate response after typing
      setTimeout(() => {
        setIsTyping(false);

        if (currentContact) {
          const responseMessages = [
            "That's interesting, tell me more!",
            "I see what you mean.",
            "Thanks for letting me know.",
            "I appreciate your message.",
            "Cool! What's next?",
          ];

          const randomResponse =
            responseMessages[
              Math.floor(Math.random() * responseMessages.length)
            ];

          const responseMessage: Message = {
            id: Date.now().toString(),
            text: randomResponse,
            sender: {
              id: currentContact.id,
              name: currentContact.name,
              avatar: currentContact.avatar,
            },
            timestamp: new Date().toISOString(),
            isSent: false,
          };

          setMessages((prev) => [...prev, responseMessage]);
        }
      }, 2000);
    }, 1000);
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle clicking the file attachment button
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Add emoji to message
  const addEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
  };

  return (
    <>
      <div className="h-screen md:h-[calc(100vh-65px)] overflow-hidden grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div className="hidden md:block md:col-span-1">
          <ContactList />
        </div>

        <div className="flex flex-col md:col-span-2 lg:col-span-3 h-screen md:h-[calc(100vh-65px)]">
          {/* Conversation header */}
          <div className="px-4 py-3 border-b flex items-center justify-between bg-white shadow-sm">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => router.push("/messages")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {currentContact && (
                <>
                  <Avatar
                    src={currentContact.avatar}
                    alt={currentContact.name}
                    status={currentContact.status}
                  />
                  <div>
                    <h3 className="font-medium">{currentContact.name}</h3>
                    <p className="text-xs text-messenger-dark-grey">
                      {currentContact.isGroup
                        ? `${currentContact.members?.length || 0} members`
                        : currentContact.status === "online"
                        ? "Online now"
                        : "Last seen recently"}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-messenger-dark-grey hover:text-messenger-blue"
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-messenger-dark-grey hover:text-messenger-blue"
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-messenger-dark-grey hover:text-messenger-blue"
                onClick={() => setShowContactInfo(true)}
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Message list */}
          <div className="flex-1 p-4  overflow-y-auto bg-white">
            <div className="space-y-1">
              {messages.map((message, index) => {
                // Determine if we should show the avatar (only for first message in a sequence)
                const showAvatar =
                  index === 0 || messages[index - 1].isSent !== message.isSent;

                return (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    showAvatar={showAvatar}
                  />
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end mb-4">
                  <div className="flex-shrink-0 mr-2">
                    <Avatar
                      src={currentContact?.avatar || ""}
                      alt={currentContact?.name || ""}
                      size="sm"
                    />
                  </div>
                  <div className="message-bubble message-bubble-received py-3">
                    <div className="typing-indicator">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected file preview */}
              {selectedFile && (
                <div className="flex justify-end mb-2">
                  <div className="bg-gray-100 rounded-md p-2 text-xs flex items-center">
                    <span className="mr-2">📎</span>
                    {selectedFile.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-5 w-5 p-0"
                      onClick={() => setSelectedFile(null)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />

              <Button
                variant="ghost"
                size="icon"
                className="text-messenger-dark-grey shrink-0"
                onClick={handleFileButtonClick}
              >
                <Paperclip className="h-5 w-5" />
              </Button>

              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="pr-10 bg-messenger-light-grey border-0 focus-visible:ring-1 focus-visible:ring-messenger-blue"
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-5 w-5 text-messenger-dark-grey"
                    >
                      <span role="img" aria-label="emoji">
                        😊
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="end">
                    <ScrollArea className="h-56">
                      <div className="p-4">
                        {emojiGroups.map((group) => (
                          <div key={group.name} className="mb-4">
                            <h4 className="text-xs font-semibold mb-2">
                              {group.name}
                            </h4>
                            <div className="grid grid-cols-7 gap-1">
                              {group.emojis.map((emoji, index) => (
                                <button
                                  key={index}
                                  onClick={() => addEmoji(emoji)}
                                  className="text-lg p-1 hover:bg-gray-100 rounded cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={newMessage.trim() === "" && !selectedFile}
                className={cn(
                  "shrink-0 bg-messenger-blue hover:bg-messenger-light-blue",
                  "text-white rounded-full h-10 w-10 p-0"
                )}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ContactDetailDrawer
        isOpen={showContactInfo}
        onClose={() => setShowContactInfo(false)}
        contact={currentContact}
      />
    </>
  );
};

export default SingleConversation;
