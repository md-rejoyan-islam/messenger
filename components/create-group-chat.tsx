import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import Avatar from "./Avatar";

// Mock users for selection
const mockUsers = [
  {
    id: "user1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "online" as const,
  },
  {
    id: "user2",
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "offline" as const,
  },
  {
    id: "user3",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=16",
    status: "online" as const,
  },
  {
    id: "user4",
    name: "James Moore",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "away" as const,
  },
  {
    id: "user5",
    name: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?img=60",
    status: "busy" as const,
  },
  {
    id: "user6",
    name: "Olivia Lee",
    avatar: "https://i.pravatar.cc/150?img=47",
    status: "online" as const,
  },
  {
    id: "user7",
    name: "William Harris",
    avatar: "https://i.pravatar.cc/150?img=54",
    status: "offline" as const,
  },
];

interface CreateGroupChatProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupName: string, memberIds: string[]) => void;
}

const CreateGroupChat: React.FC<CreateGroupChatProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleMemberToggle = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedMembers.length > 0) {
      onCreateGroup(groupName, selectedMembers);
      // Reset form
      setGroupName("");
      setSelectedMembers([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Group Chat</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Add Members</Label>
            <ScrollArea className="h-60">
              <div className="space-y-2">
                {mockUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
                  >
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedMembers.includes(user.id)}
                      onCheckedChange={() => handleMemberToggle(user.id)}
                    />
                    <Label
                      htmlFor={`user-${user.id}`}
                      className="flex items-center space-x-2 cursor-pointer flex-1"
                    >
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        size="sm"
                        status={user.status}
                      />
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">
                          {user.status}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <p className="text-sm text-muted-foreground">
              Selected: {selectedMembers.length} members
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedMembers.length === 0}
          >
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupChat;
