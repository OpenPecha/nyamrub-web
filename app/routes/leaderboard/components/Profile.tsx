import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Profile() {
  const [profileDetails, setProfileDetails] = useState(null);

  const getUserDetails = async () => {
    try {
      const res = await fetch("/api/getUserDetails");
      if (!res.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await res.json();
      const { profile_image_url, name, username, score } = data;

      setProfileDetails({
        profileImage: profile_image_url,
        name: name,
        username: username,
        contribution: score,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (!profileDetails) {
    return (
      <div className="text-primary-500">
        <Spinner size="md" className="fill-primary-800" />
      </div>
    );
  }

  return (
    <div className=" w-full rounded-lg flex justify-around items-center py-3 px-2">
      <div className="flex flex-1 items-center space-x-4">
        <img
          src={profileDetails?.profileImage}
          alt="Profile"
          className="w-14 h-14 rounded-full"
        />
        <div className="flex flex-col text-primary-900">
          <h2 className="text-xl font-bold">{profileDetails?.name}</h2>
          <p className="text-xs font-medium">@{profileDetails?.username}</p>
        </div>
      </div>
      <div className="flex-1"/>
      <div className="flex-1 text-sm font-medium text-primary-900">
        ཁྱེད་ཀྱིས་བོད་ཀྱི་སྐད་ཡིག་དར་སྤེལ་ཆེད་ ཁྱོན་བསྡོམས་ཚིག་གྲུབ་{" "}
        {profileDetails?.contribution} ཕུལ་ཡོད།
        {/* Your Total Contributions are {profileDetails?.contribution} Sentences */}
      </div>
    </div>
  );
}
