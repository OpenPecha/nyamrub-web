import React, { useEffect, useState } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import { TfiPencil, TfiCheck, TfiClose } from "react-icons/tfi";
import { useFetcher, useLoaderData } from "@remix-run/react";

type ValidationErrors = {
  name?: string;
  username?: string;
};

export default function Profile() {
  const { profileDetails } = useLoaderData()
  const fetcher = useFetcher();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const validateName = (name: string): string | undefined => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters long";
    if (name.length > 50) return "Name cannot exceed 50 characters";
    if (!/^[a-zA-Z\s'-]{2,50}$/.test(name)) return "Invalid name format";
    return undefined;
  };

  const validateUsername = (username: string): string | undefined => {
    if (!username) return "Username is required";
    if (username.length < 3)
      return "Username must be at least 3 characters long";
    if (username.length > 20) return "Username cannot exceed 20 characters";
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username))
      return "Invalid username format";
    return undefined;
  };

  const handleEditClick = () => {
    if (!profileDetails) return;

    setIsEditing(true);
    setEditedName(profileDetails.name);
    setEditedUsername(profileDetails.username);
    setValidationErrors({});
  };

  const validateForm = () => {
    const nameError = validateName(editedName);
    const usernameError = validateUsername(editedUsername);

    setValidationErrors({
      name: nameError,
      username: usernameError,
    });

    return !nameError && !usernameError;
  };

  const handleSaveClick = async () => {
    fetcher.data = null
    if (!profileDetails) return;

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", editedName);
    formData.append("username", editedUsername);
    fetcher.submit(formData, { method: "PUT", action: "/api/update-user" });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setValidationErrors({});
    setEditedName(profileDetails.name)
    setEditedUsername(profileDetails?.username)
  };

  useEffect(() => {
    if (fetcher.data?.status === "success" && fetcher.state == "idle"){
      setIsEditing(false)
    }
  },[fetcher])

  if (!profileDetails) {
    return (
      <div className="text-gray-500 text-center p-4 rounded-lg">
        No profile data available
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center h-full px-2 md:px-5 md:space-x-10 w-full rounded-lg ">
      <div className="flex items-center space-x-4">
        {!isEditing && (
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img
              src={profileDetails?.profile_image_url}
              alt={`${profileDetails?.name}'s profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "";
                e.currentTarget.alt = "Default profile";
              }}
            />
          </div>
        )}
        <div className="flex flex-col text-neutral-950">
          {isEditing ? (
            <div className="flex flex-col space-y-2">
              <div>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => {
                    setEditedName(e.target.value);
                    setValidationErrors((prev) => ({
                      ...prev,
                      name: undefined,
                    }));
                  }}
                  className={`bg-neutral-50 text-lg font-semibold font-poppins border rounded px-2 py-1 outline-none ${
                    validationErrors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter name"
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.name}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={editedUsername}
                  onChange={(e) => {
                    setEditedUsername(e.target.value);
                    setValidationErrors((prev) => ({
                      ...prev,
                      username: undefined,
                    }));
                  }}
                  className={`bg-neutral-50 text-xs font-medium font-poppins border rounded px-2 py-1 outline-none ${
                    validationErrors.username ? "border-red-500" : ""
                  }`}
                  placeholder="Enter username"
                  prefix="@"
                />
                {validationErrors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {validationErrors.username}
                  </p>
                )}
              </div>
              {fetcher.data?.status === "error" && (
                <div className="text-red-500 text-xs mt-1">
                  {fetcher.data?.message}
                </div>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold font-poppins">
                {editedName || profileDetails?.name}
              </h2>
              <p className="text-xs font-medium font-poppins">
                @{editedUsername || profileDetails?.username}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="text-xs font-monlam font-medium text-primary-950 h-full flex flex-col justify-around">
        {fetcher.state === "submitting" || fetcher.state === "loading" ? (
          <div className="w-fit self-end">
            <LoadingSpinner size={6} />
          </div>
        ) : isEditing ? (
          <div className="flex flex-wrap justify-center gap-2 self-end">
            <button
              onClick={handleSaveClick}
              disabled={!!validationErrors.name || !!validationErrors.username}
              className={`py-1 px-3 flex items-center gap-2 rounded-md border ${
                validationErrors.name || validationErrors.username
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-secondary-500 text-secondary-500"
              } font-semibold font-poppins w-fit`}
            >
              <TfiCheck className="inline" />
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="py-1 px-3 flex items-center gap-2 rounded-md border border-red-600 text-red-600 font-semibold font-poppins w-fit"
            >
              <TfiClose className="inline" />
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="py-1 px-3 flex self-end items-center gap-2 rounded-md border border-neutral-950 text-neutral-950 font-semibold font-poppins w-fit"
          >
            <TfiPencil className="inline" />
            Edit
          </button>
        )}
        {!isEditing && (
          <div className="font-monlam font-medium text-sm text-right md:text-left">
            ཁྱེད་ཀྱིས་བོད་ཀྱི་སྐད་ཡིག་དར་སྤེལ་ཆེད་ཁྱོན་བསྡོམས་ཚིག་གྲུབ་
            <span className="text-lg font-poppins">
              {profileDetails.contribution?.toLocaleString()}
            </span>{" "}
            ཕུལ་ཡོད།
          </div>
        )}
      </div>
    </div>
  );
}
