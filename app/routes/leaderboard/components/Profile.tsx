import React, { useEffect, useState } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";

// Types for better type safety
type UserProfile = {
  profileImage: string;
  name: string;
  username: string;
  contribution: number;
};

type ApiResponse = {
  profile_image_url: string;
  name: string;
  username: string;
  score: number;
};

export default function Profile() {
  const [profileDetails, setProfileDetails] = useState<UserProfile | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/getUserDetails");
        if (!res.ok) {
          throw new Error(`Failed to fetch user details: ${res.statusText}`);
        }

        const data: ApiResponse = await res.json();

        setProfileDetails({
          profileImage: data.profile_image_url,
          name: data.name,
          username: data.username,
          contribution: data.score,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        console.error("Error fetching user details:", error);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (!profileDetails) {
    return (
      <div className="text-gray-500 text-center p-4 rounded-lg">
        No profile data available
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg flex justify-around items-center py-3 px-5">
      <div className="flex flex-1 items-center space-x-4">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src={profileDetails.profileImage}
            alt={`${profileDetails.name}'s profile`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png"; // Add a default avatar image
              e.currentTarget.alt = "Default profile";
            }}
          />
        </div>
        <div className="flex flex-col text-primary-900">
          <h2 className="text-xl font-bold">{profileDetails.name}</h2>
          <p className="text-xs font-medium">@{profileDetails.username}</p>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex-1 text-xs font-monlam font-medium text-primary-950">
        <span>
          ཁྱེད་ཀྱིས་བོད་ཀྱི་སྐད་ཡིག་དར་སྤེལ་ཆེད་ ཁྱོན་བསྡོམས་ཚིག་གྲུབ་
        </span>{" "}
        <span className="text-lg font-poppins">
          {profileDetails.contribution.toLocaleString()}
        </span>{" "}
        <span>ཕུལ་ཡོད།</span>
      </div>
    </div>
  );
}
