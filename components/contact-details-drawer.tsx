import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Crown,
  Edit,
  FileVideo,
  ImageDown,
  Plus,
  User,
  UserMinus,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "./Avatar";
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
  admin?: User;
}

interface ContactDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

const ContactDetailDrawer: React.FC<ContactDetailDrawerProps> = ({
  isOpen,
  onClose,
  contact,
}) => {
  const [nickname, setNickname] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isAddFriendDialogOpen, setIsAddFriendDialogOpen] = useState(false);
  const [isEditGroupNameDialogOpen, setIsEditGroupNameDialogOpen] =
    useState(false);

  // Mock data for media and friends
  const mediaFiles: Media[] = contact?.media || [
    {
      id: "1",
      type: "image",
      url: "https://i.pravatar.cc/300?img=1",
      timestamp: "2 days ago",
    },
    {
      id: "2",
      type: "image",
      url: "https://i.pravatar.cc/300?img=2",
      timestamp: "5 days ago",
    },
    {
      id: "3",
      type: "video",
      url: "https://example.com/video1.mp4",
      timestamp: "1 week ago",
    },
    {
      id: "4",
      type: "image",
      url: "https://i.pravatar.cc/300?img=3",
      timestamp: "2 weeks ago",
    },
    {
      id: "5",
      type: "video",
      url: "https://example.com/video2.mp4",
      timestamp: "1 month ago",
    },
  ];

  // Mock data for potential friends to add to group
  const potentialFriends = [
    {
      id: "101",
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=20",
      status: "online" as const,
    },
    {
      id: "102",
      name: "Lisa Wong",
      avatar: "https://i.pravatar.cc/150?img=21",
      status: "offline" as const,
    },
    {
      id: "103",
      name: "Mark Davis",
      avatar: "https://i.pravatar.cc/150?img=22",
      status: "away" as const,
    },
  ];

  const friendInfo = {
    totalFriends: 34,
    mutualFriends: 5,
    mutualFriendsList: [
      {
        id: "1",
        name: "Emma Watson",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "2",
        name: "Robert Smith",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      {
        id: "3",
        name: "Amanda Lee",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
    ],
  };

  const handleSetNickname = () => {
    toast({
      title: "Nickname Updated",
      description: `Nickname for ${contact?.name} has been set to "${nickname}".`,
    });
  };

  const handleAddFriend = () => {
    toast({
      title: "Friend Added",
      description: "New member has been added to the group.",
    });
    setIsAddFriendDialogOpen(false);
  };

  const handleRemoveFriend = () => {
    toast({
      title: "Member Removed",
      description: "Member has been removed from the group.",
    });
  };

  const handleUpdateGroupName = () => {
    if (groupName.trim()) {
      toast({
        title: "Group Name Updated",
        description: `Group name has been changed to "${groupName}".`,
      });
      setIsEditGroupNameDialogOpen(false);
    }
  };

  if (!contact) return null;

  // Check if it's a group chat
  const isGroup = contact.isGroup === true;

  // Set initial group name if it's a group chat
  if (isGroup && groupName === "" && contact.name) {
    setGroupName(contact.name);
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="text-left">
            <div className="flex items-center justify-between">
              <DrawerTitle>
                {isGroup ? "Group Info" : "Contact Info"}
              </DrawerTitle>
              <DrawerClose>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="px-4 pb-4">
            <div className="flex flex-col items-center mb-4">
              <Avatar
                src={contact.avatar}
                alt={contact.name}
                size="lg"
                status={contact.status}
              />
              <h3 className="mt-2 font-semibold text-lg">{contact.name}</h3>
              {!isGroup && (
                <p className="text-sm text-gray-500">
                  {contact.status === "online"
                    ? "Online now"
                    : "Last seen recently"}
                </p>
              )}
              {isGroup && contact.members && (
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-500 mb-1">
                    {contact.members.length} members
                  </p>
                  {contact?.admin && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Crown className="h-3 w-3 mr-1 text-amber-500" />
                      <span>Admin: {contact?.admin?.name}</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setIsEditGroupNameDialogOpen(true)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Change Group Name
                  </Button>
                </div>
              )}
            </div>

            <Tabs defaultValue="media">
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="media" className="flex items-center gap-1">
                  <ImageDown className="h-4 w-4" />
                  <span>Media</span>
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{isGroup ? "Members" : "About"}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="media" className="space-y-4">
                <h4 className="font-medium text-sm">Media Files</h4>
                <div className="grid grid-cols-3 gap-2">
                  {mediaFiles.map((file) => (
                    <div
                      key={file.id}
                      className="relative aspect-square rounded-md overflow-hidden bg-gray-100"
                    >
                      {file.type === "image" ? (
                        <Image
                          width={150}
                          height={150}
                          src={file.url || ""}
                          alt="Shared media"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <FileVideo className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  View All Media
                </Button>
              </TabsContent>

              <TabsContent value="about" className="space-y-4">
                {isGroup ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-gray-500" />
                          <h4 className="font-medium">Group Members</h4>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => setIsAddFriendDialogOpen(true)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Member
                        </Button>
                      </div>

                      {contact.members && contact.members.length > 0 && (
                        <div className="mt-3 space-y-3">
                          {contact.members.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar
                                  src={member.avatar}
                                  alt={member.name}
                                  size="sm"
                                  status={member.status}
                                />
                                <div>
                                  <span className="text-sm">{member.name}</span>
                                  {contact.admin &&
                                    contact.admin.id === member.id && (
                                      <div className="flex items-center text-xs text-amber-500">
                                        <Crown className="h-3 w-3 mr-1" />
                                        <span>Admin</span>
                                      </div>
                                    )}
                                </div>
                              </div>
                              {(!contact.admin ||
                                contact.admin.id !== member.id) && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-red-500 hover:text-red-600"
                                  onClick={() => handleRemoveFriend()}
                                >
                                  <UserMinus className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nickname">Set Nickname</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="nickname"
                          placeholder={`Nickname for ${contact.name}`}
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                        <Button
                          size="sm"
                          onClick={handleSetNickname}
                          disabled={!nickname.trim()}
                        >
                          Save
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-gray-500" />
                        <h4 className="font-medium">Friend Information</h4>
                      </div>

                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          Total Friends: {friendInfo.totalFriends}
                        </p>
                        <p className="text-sm">
                          Mutual Friends: {friendInfo.mutualFriends}
                        </p>

                        {friendInfo.mutualFriendsList.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-2">
                              Mutual Friends:
                            </p>
                            <div className="space-y-2">
                              {friendInfo.mutualFriendsList.map((friend) => (
                                <div
                                  key={friend.id}
                                  className="flex items-center gap-2"
                                >
                                  <Avatar
                                    src={friend.avatar}
                                    alt={friend.name}
                                    size="sm"
                                  />
                                  <span className="text-sm">{friend.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Add Friend Dialog */}
      <Dialog
        open={isAddFriendDialogOpen}
        onOpenChange={setIsAddFriendDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Member to Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto py-4">
            {potentialFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={friend.avatar}
                    alt={friend.name}
                    size="sm"
                    status={friend.status}
                  />
                  <span>{friend.name}</span>
                </div>
                <Button
                  className="bg-messenger-blue hover:bg-messenger-light-blue cursor-pointer"
                  size="sm"
                  onClick={() => handleAddFriend()}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddFriendDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Group Name Dialog */}
      <Dialog
        open={isEditGroupNameDialogOpen}
        onOpenChange={setIsEditGroupNameDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Group Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditGroupNameDialogOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateGroupName}
              disabled={!groupName.trim()}
              className="bg-messenger-blue hover:bg-messenger-light-blue cursor-pointer"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactDetailDrawer;
