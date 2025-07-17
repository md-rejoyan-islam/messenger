"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Textarea } from "@/components/ui/textarea";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/lib/services/userApi";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

const ProfileForm = () => {
  const {
    data,
    isLoading: isUserLoading,
    isSuccess: isUserDataSuccess,
  } = useGetUserProfileQuery({});

  const user = {
    name: data?.data?.name,
    bio: data?.data?.bio,
    email: data?.data?.email,
    profilePhoto: data?.data?.profilePhoto,
  };

  const router = useRouter();

  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.profilePhoto
  );

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();

  // Handles file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Basic validation
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 1 * 1024 * 1024; // 1 MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type.", {
          description: "Only JPEG, PNG, and GIF images are allowed.",
        });
        setSelectedFile(null);
        setPreviewUrl(user.profilePhoto || null);
        e.target.value = "";
        return;
      }
      if (file.size > maxSize) {
        toast.error("File too large.", {
          description: "Image size cannot exceed 5MB.",
        });
        setSelectedFile(null);
        setPreviewUrl(user.profilePhoto || null);
        e.target.value = "";
        return;
      }
      setSelectedFile(file);

      // Create a URL for image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      //If no file selected
      setSelectedFile(null);
      setPreviewUrl(user.profilePhoto || null);
    }
  };

  // Triggers the hidden file input click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      let hasChanges = false;

      if (name && name !== user.name) {
        formData.append("name", name);
        hasChanges = true;
      }

      if (bio && bio !== user.bio) {
        formData.append("bio", bio);
        hasChanges = true;
      }

      // Handle profilePhoto:
      if (selectedFile) {
        // A new file was selected
        formData.append("image", selectedFile);
        hasChanges = true;
      } else if (previewUrl === null && user.profilePhoto) {
        formData.append("image", ""); // Or a specific flag like 'REMOVE_PHOTO'
        hasChanges = true;
      }

      // Check if any data needs to be sent
      if (!hasChanges) {
        // Check the boolean flag
        toast.info("No changes to save.", {
          description: "Your profile is already up to date.",
        });
        return;
      }
      console.log(formData);

      // Send the FormData
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully", {
        description: "Your profile has been updated.",
      });

      setSelectedFile(null); // Clear the selected file after successful upload
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Profile update failed", {
        description: "An error occurred while updating your profile.",
      });
      // On error, revert the preview and selected file
      setPreviewUrl(user.profilePhoto || null);
      setSelectedFile(null);
    }
  };

  // Display loading state for initial data fetch
  if (isUserLoading && !isUserDataSuccess) {
    return (
      <div className="p-4 max-w-2xl mx-auto text-center">
        Loading profile...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-messenger-blue">
            {
              <Image
                width={96}
                height={96}
                src={previewUrl || user.profilePhoto || ""}
                alt={user?.name || "Profile Avatar"}
                className="w-full h-full object-cover"
                priority
              />
            }
          </div>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/gif" // Specific accepted types
            className="hidden"
          />
          <Button
            size="icon"
            type="button"
            className="absolute bottom-0 right-0 bg-messenger-blue hover:bg-messenger-light-blue rounded-full w-8 h-8"
            onClick={handleAvatarClick}
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name || user?.name}
          onChange={(e) => setName(e.target.value)}
          className="border-messenger-grey focus-visible:ring-messenger-blue"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={user?.email}
          readOnly
          disabled
          className="bg-gray-50"
        />
        <p className="text-xs text-messenger-dark-grey">
          Email cannot be changed
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Bio</Label>
        <Textarea
          id="name"
          value={bio || user?.bio}
          onChange={(e) => setBio(e.target.value)}
          className="border-messenger-grey focus-visible:ring-messenger-blue"
        />
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
          disabled={isUpdatingProfile}
          className="bg-messenger-blue hover:bg-messenger-light-blue"
        >
          {isUpdatingProfile ? (
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
  );
};

export default ProfileForm;
