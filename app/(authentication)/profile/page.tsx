"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/ui/transitions";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import { useUpdateProfileMutation } from "@/lib/services/userApi";

const Profile = () => {
  const user = {
    id: Math.random().toString(36).substring(2, 9),
    name: "John Doe",
    email: "john@gmail.com",
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
  };
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({ name, profilePhoto: avatar }).unwrap();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update failed",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    }
  };

  return (
    <PageTransition>
      <div className="p-4 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/messages")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-messenger-blue">
                <Image
                  width={96}
                  height={96}
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 bg-messenger-blue hover:bg-messenger-light-blue rounded-full w-8 h-8"
                onClick={() => {
                  // In a real app, this would open a file picker
                  const randomImg = Math.floor(Math.random() * 70);
                  setAvatar(`https://i.pravatar.cc/150?img=${randomImg}`);
                }}
              >
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-messenger-grey focus-visible:ring-messenger-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                readOnly
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-messenger-dark-grey">
                Email cannot be changed
              </p>
            </div>

            <div className="pt-4 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/change-password")}
              >
                Change Password
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-messenger-blue hover:bg-messenger-light-blue"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="mr-2">Saving</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></div>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
