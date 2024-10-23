export default function Profile() {
  const profileDetails = {
    profileImage: "/assets/profile.png",
    name: "Tenzin Sonam",
    username: "@Snowloin123",
    contribution: 0,
  };
  return (
    <div className="bg-primary-100 w-full rounded-lg flex items-center py-3 px-2">
      <div className="flex flex-1 items-center space-x-4">
        <img
          src={profileDetails.profileImage}
          alt="Profile"
          className="w-14 h-14 rounded-full"
        />
        <div className="flex flex-col text-primary-900">
          <h2 className="text-xl">Welcome</h2>
          <h2 className="text-xl font-bold">{profileDetails.name}</h2>
          <p className="text-xs font-medium">{profileDetails.username}</p>
        </div>
      </div>
      <div className="flex-1 text-sm font-medium text-primary-900">
        Your Total Contributions is {profileDetails.contribution} Sentences
      </div>
    </div>
  );
}
