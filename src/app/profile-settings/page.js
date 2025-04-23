"use client";

import { useState, useContext, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { AuthContext } from "../context/AuthContext";
import { getOwnerById } from "../api/owner";
import { useRouter } from "next/navigation";
import { getBuilderById } from "../api/builder";
import { updateProfile, updateEmail, updatePassword } from "../api/setting";

export default function ProfileSetting() {
    const [activeTab, setActiveTab] = useState("account");
    const { user , logout  } = useContext(AuthContext);
    const router = useRouter();
    const [builder, setBuilder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [profileData, setProfileData] = useState({
        name: "",
        firstname: "",
        lastname: "",
        username: "",
        bio: "",
        email: "",
        phone: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            console.log("Current user data:", user);

            const baseProfile = {
                name: `${user.firstName} ${user.lastName}`,
                firstname: user.firstName,
                lastname: user.lastName,
                username: user.email?.split('@')[0] || '',
                email: user.email,
                bio: user.accountType === "builder" ? "Professional Builder" : "Property Owner"
            };

            try {
                let additionalData = null;

                if (user.accountType === "builder") {
                    const res = await getBuilderById(user.id);
                    additionalData = res.data;
                } else if (user.accountType === "owner") {
                    const res = await getOwnerById(user.id);
                    additionalData = res.data;
                }

                console.log("Additional user data:", additionalData);
                setBuilder(additionalData);

                if (additionalData) {
                    setProfileData({
                        ...baseProfile,
                        phone: additionalData.mobile || additionalData.phone || "",
                        bio: additionalData.bio || baseProfile.bio
                    });
                } else {
                    setProfileData(baseProfile);
                }

            } catch (err) {
                console.error("Error fetching additional user data:", err);
                setProfileData(baseProfile);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError("");
        setSuccessMessage("");
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleProfileUpdate = async () => {
        try {
            const dataToSend = {
                firstName: profileData.firstname,
                lastName: profileData.lastname,
                bio: profileData.bio,
                mobile: profileData.phone 
            };

            const response = await updateProfile({
                id: user.id,
                ...dataToSend
            });

            console.log("Profile update response:", response.data);
            
            setSuccessMessage("Profile updated successfully!");
            return true;
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.response?.data?.message || "Failed to update profile");
            return false;
        }
    };

    const handleEmailUpdate = async () => {
        try {
            const response = await updateEmail(user.id, {
                newEmail: profileData.email
            });

            console.log("Email update response:", response.data);
            
            setSuccessMessage("Email updated successfully!");
            if (logout) {
                await logout();
            }
            router.push("/sign-in");
            return true;
        } catch (error) {
            console.error("Error updating email:", error);
            setError(error.response?.data?.message || "Failed to update email");
            return false;
        }
    };

    const handlePasswordUpdate = async () => {
        if (profileData.newPassword !== profileData.confirmPassword) {
            setError("New passwords don't match!");
            return false;
        }

        try {
            const response = await updatePassword(user.id, {
                currentPassword: profileData.currentPassword,
                newPassword: profileData.newPassword
            });

            console.log("Password update response:", response.data);
            setSuccessMessage("Password updated successfully!");
            
            setProfileData(prev => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            }));

            if (logout) {
                await logout();
            }
            router.push("/sign-in"); 
            return true;
        } catch (error) {
            console.error("Error updating password:", error);
            setError(error.response?.data?.message || "Failed to update password");
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            let success = false;
            
            if (activeTab === "account") {
                success = await handleProfileUpdate();
            } else if (activeTab === "Email") {
                success = await handleEmailUpdate();
            } else if (activeTab === "Password") {
                success = await handlePasswordUpdate();
            }
            
            if (!success) {
                console.log("Operation was not successful");
            }
        } catch (error) {
            console.error("Error in form submission:", error);
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && !user) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#FAF8FF]">
                <div className="text-xl font-semibold">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex justify-center bg-[#FAF8FF]">
            <div className="flex flex-col md:flex-row bg-white md:p-8 rounded-lg shadow-xl max-w-6xl w-full m-10">
                {/* Left sidebar */}
                <div className="md:w-48 p-4 border-b md:border-b-0 md:border-r border-gray-300">
                    <h1 className="text-xl font-bold text-purple-500 mb-2">Profile Settings</h1>
                    <nav className="space-y-1 md:pr-8 mt-5">
                        <button
                            onClick={() => handleTabChange("account")}
                            className={`w-full text-left px-3 py-2 rounded-md font-bold text-gray-500 ${activeTab === "account" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        >
                            Account
                        </button>
                        <button
                            onClick={() => handleTabChange("Email")}
                            className={`w-full text-left px-3 py-2 rounded-md font-bold text-gray-500 ${activeTab === "Email" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        >
                            Email
                        </button>
                        <button
                            onClick={() => handleTabChange("Password")}
                            className={`w-full text-left px-3 py-2 rounded-md font-bold text-gray-500 ${activeTab === "Password" ? "bg-gray-200" : "hover:bg-gray-100"}`}
                        >
                            Password
                        </button>
                    </nav>
                </div>

                {/* Main content */}
                <div className="flex-1 p-6">
                    {/* Error and success messages */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {activeTab === "account" && (
                            <div className="space-y-6">
                                <div className="p-6">
                                    <h2 className="text-lg font-bold text-purple-600 -mt-8">Profile</h2>
                                    <div className="flex items-center mb-6 justify-center mt-4">
                                        <div className="flex-col">
                                            <div>
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-3fHwHfTzFBOnb3uEH3Tj4klzmxgvLvahGGUts7R-dRPVI68TVElWbCWGmAuZe_ummY&usqp=CAU"
                                                    alt="Profile"
                                                    className="w-24 h-24 rounded-full border border-purple-600"
                                                />
                                            </div>
                                            <div className="mb-1 text-center">
                                                <button type="button" className="text-blue-600 text-sm">Change</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                        <div className="mb-4">
                                            <label htmlFor="firstname" className="text-sm font-semibold text-gray-500 mb-1">First Name</label>
                                            <input
                                                type="text"
                                                id="firstname"
                                                value={profileData.firstname}
                                                className="border p-3 rounded-md w-full font-semibold"
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="lastname" className="text-sm font-semibold text-gray-500 mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastname"
                                                value={profileData.lastname}
                                                className="border p-3 rounded-md w-full font-semibold"
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="bio" className="block font-semibold text-gray-500 mb-1">Bio</label>
                                        <textarea
                                            id="bio"
                                            value={profileData.bio}
                                            className="border p-3 rounded-md w-full font-semibold"
                                            onChange={handleInputChange}
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block font-semibold text-gray-500 mb-1">Phone number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={profileData.phone}
                                            className="border p-3 rounded-md w-full font-semibold"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mt-6 text-center">
                                        <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
                                            {isLoading ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "Email" && (
                            <div className="p-6">
                                <h2 className="text-lg font-bold text-purple-600 -mt-8">Email Settings</h2>
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-500 mb-1 font-semibold">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={handleInputChange}
                                            className="border p-3 rounded-md w-full font-semibold"
                                            required
                                        />
                                    </div>
                                    <div className="mt-10 text-center">
                                        <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
                                            {isLoading ? "Updating..." : "Change Email"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "Password" && (
                            <div className="p-6">
                                <h2 className="text-lg font-bold text-purple-600 -mt-8">Password</h2>
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <label htmlFor="currentPassword" className="block text-gray-500 mb-1 font-semibold">Current Password</label>
                                        <input
                                            id="currentPassword"
                                            type="password"
                                            value={profileData.currentPassword}
                                            onChange={handleInputChange}
                                            className="border p-3 rounded-md w-full font-semibold"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="newPassword" className="block text-gray-500 mb-1 font-semibold">New Password</label>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            value={profileData.newPassword}
                                            onChange={handleInputChange}
                                            className="border p-3 rounded-md w-full font-semibold"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="block text-gray-500 mb-1 font-semibold">Confirm New Password</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={profileData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="border p-3 rounded-md w-full font-semibold"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-10">
                                    <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={isLoading}>
                                        {isLoading ? "Updating..." : "Save Password"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}