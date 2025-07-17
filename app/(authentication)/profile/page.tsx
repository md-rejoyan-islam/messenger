import ProfileForm from "@/components/forms/profile-form";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/transitions";
import { getTokens } from "@/lib/auth/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata() {
  const { accessToken } = await getTokens();
  const { data } = await fetch("http://localhost:3000/api/proxy/user/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
  }).then((res) => res.json());

  if (!data) {
    return {
      title: "User not found",
      description: "User profile not found. Please check your credentials.",
    };
  }

  return {
    title: data.name + "'s Profile",
    description:
      "View and edit your profile information. Update your name, email, and profile picture.",
  };
}

const Profile = () => {
  return (
    <PageTransition>
      <div className="p-4 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2">
            <Link href={"/messages"}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <ProfileForm />
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
