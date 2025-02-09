"use client";
import { useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/dist/types/server";
import { useState } from "react";
import NavBar from "../components/nav-bar";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  // Handle password change (Clerk usually sends a reset email for password change)
  const handlePasswordChange = async () => {
    const newPassword = prompt("Enter new password:");
    if (newPassword) {
      try {
        // If password change requires reset, you can initiate a reset flow here
        alert("Password change requires reset. Please follow the password reset link.");
      } catch (error) {
        console.error("Error updating password:", error);
        alert("There was an error updating the password.");
      }
    }
  };

  // Handle name change (First or Last name)
  const handleNameChange = async (type: string, value: string) => {
    const newName = prompt(`Enter new ${type}:`);
    if (newName) {
      try {
        // Use Clerk's updateUser method to update first and last name
        await user.update({
          [type]: newName,
        });
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully.`);

      } catch (error) {
        console.error(`Error updating ${type}:`, error);
        alert(`There was an error updating the ${type}.`);
      }
    }
  };

  if (!isLoaded || !isSignedIn) return <div>Loading...</div>;

  return (
    <div className="min-h-screen relative">
      <NavBar />
      {/* Space background */}
      <div
        className="absolute inset-0 bg-cover bg-center"

        style={{ backgroundImage: "url('/space.jpg')" }}
      />

      {/* Profile card */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-md border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white">
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Details */}
            <div className="w-full space-y-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-300">First Name</p>
                  <p className="font-semibold">{user.firstName}</p>
                </div>
                <button
                  onClick={() => handleNameChange("firstName", user.firstName ?? "")}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-300">Last Name</p>
                  <p className="font-semibold">{user.lastName}</p>
                </div>
                <button
                  onClick={() => handleNameChange("lastName", user.lastName ?? "")}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-300">Email</p>
                  <p className="font-semibold">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handlePasswordChange}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
