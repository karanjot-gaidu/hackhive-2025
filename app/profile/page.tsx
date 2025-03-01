"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import NavBar from "../components/nav-bar";
import { useClerk } from "@clerk/nextjs";
import LoginPage from "../components/login-page";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const { signOut, openSignIn } = useClerk();

  if (!isLoaded) return <div>Loading...</div>;

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setIsUploading(true);

    try {
      await user?.setProfileImage({ file });
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleNameChange = async (field: string, value: string) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      try {
        await user?.update({ [field]: newName });
        alert("Name updated!");
      } catch (error) {
        console.error("Name update failed:", error);
        alert("Failed to update name. Try again.");
      }
    }
  };

  const handlePasswordChange = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    const currentPassword = prompt("Enter current password:");
    const newPassword = prompt("Enter new password:");
    if (email && currentPassword && newPassword) {
      try {
        user?.updatePassword({ newPassword, currentPassword })
        alert("Password updated!");
      } catch (error) {
        console.error("Password reset failed:", error);
        alert("Failed to send password reset email. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      <NavBar />

      {/* Space background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/space.jpg')" }} />

      {!isSignedIn ? (
        <div className="relative min-h-screen flex items-center justify-center">
          <LoginPage />
        </div>
      ) : (
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-md border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <div className="flex flex-col items-center space-y-6">
              {/* Profile Image */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white">
                <label className="cursor-pointer">
                  <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              {/* User Details */}
              <div className="w-full space-y-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-300">First Name</p>
                    <p className="font-semibold">{user.firstName}</p>
                  </div>
                  <button onClick={() => handleNameChange("firstName", user.firstName ?? "")} className="text-sm text-gray-300 hover:text-gray-100">Edit</button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-300">Last Name</p>
                    <p className="font-semibold">{user.lastName}</p>
                  </div>
                  <button onClick={() => handleNameChange("lastName", user.lastName ?? "")} className="text-sm text-gray-300 hover:text-gray-100">Edit</button>
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
                    className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg transition duration-200 border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  >
                    Change Password
                  </button>
                </div>

                <div>
                  <button onClick={() => signOut()} className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg transition duration-200 border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
