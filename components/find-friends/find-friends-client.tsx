"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useFindFriendsQuery } from "@/lib/services/userApi";
import { useEffect, useState } from "react";
import FriendCard from "./friend-card";
import FriendSearch from "./friend-search";

interface UserSuggestion {
  _id: string;
  name: string;
  profilePhoto?: string;
  isFriend: boolean;
  hasSentRequest: boolean;
}

const FindFriendsClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const { data, isLoading, isFetching, error, isError, refetch } =
    useFindFriendsQuery(debouncedSearchQuery);
  const users = data?.data || [];

  console.log(users);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <>
      <FriendSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <h2 className="text-lg font-medium mb-4">Search Results</h2>

      {(isLoading || isFetching) && <p>Loading....</p>}

      {isError && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <p>{(error as any).data?.message || "Failed to load data"}</p>
      )}

      {users && users.length === 0 ? (
        <Card className="border border-gray-200">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-center text-gray-500">
              No users found matching your search.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users?.map((user: UserSuggestion) => (
            <FriendCard
              key={user._id}
              userId={user._id}
              isFriend={user.isFriend}
              photo={user.profilePhoto}
              name={user.name}
              hasSentRequest={user.hasSentRequest}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FindFriendsClient;
