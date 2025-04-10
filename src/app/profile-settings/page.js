"use client";

import { useState } from "react";
import { Button } from "../components/ui/Button";

export default function ProfileSetting() {
    const [activeTab, setActiveTab] = useState("account");
    const [profileData, setProfileData] = useState({
        name: "Kasun Perera",
        firstname: "Kasun",
        lastname: "Perera",
        username: "johndoe123",
        bio: "Project Builer",
        email: "kasun@example.com",
        phone: "+94 712345678",
        password: "123456"
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (

        <div className=" flex justify-center  bg-[#FAF8FF] ">
            <div className="flex flex-col md:flex-row bg-white md:p-8  rounded-lg shadow-xl max-w-6xl w-full m-10">
                {/* Left sidebar */}
                <div className="md:w-48 p-4  border-b md:border-b-0 md:border-r border-gray-300">
                    <h1 className="text-xl font-bold text-purple-500 mb-2 ">Profile Settings</h1>
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
                    {activeTab === "account" && (
                        <div className="space-y-6">
                            {/* Account */}
                            <div className="p-6">
                                <h2 className=" text-lg font-bold text-purple-600 -mt-8">Profile</h2>
                                <div className="flex items-center mb-6 justify-center mt-4">
                                    <div className="flex-col">
                                        <div >
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-3fHwHfTzFBOnb3uEH3Tj4klzmxgvLvahGGUts7R-dRPVI68TVElWbCWGmAuZe_ummY&usqp=CAU"
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full border border-purple-600  "
                                            />
                                        </div>
                                        <div className="mb-1 text-center">
                                            <button className=" text-blue-600 text-sm">Change</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <div className="mb-4">
                                        <label htmlFor="firstname" className=" text-sm font-semibold  text-gray-500 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            value={profileData.firstname}
                                            className="border p-3 rounded-md w-full font-semibold "
                                            onChange={(e) => setProfileData({ ...profileData, firstname: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="lastname" className=" text-sm font-semibold text-gray-500 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            value={profileData.lastname}
                                            className="border p-3 rounded-md w-full   font-semibold "
                                            onChange={(e) => setProfileData({ ...profileData, lastname: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="bio" className="block font-semibold  text-gray-500 mb-1">Bio</label>
                                    <textarea
                                        type="text"
                                        id="bio"
                                        value={profileData.bio}
                                        className="border p-3 rounded-md w-full  font-semibold "
                                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block font-semibold  text-gray-500 mb-1">Phone number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={profileData.phone}
                                        className="border p-3 rounded-md w-full  font-semibold "
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="mt-6 text-center">
                                    <Button className="w-full bg-black hover:bg-gray-800">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Email */}
                    {activeTab === "Email" && (
                        <div className="p-6 ">
                            <h2 className=" text-lg font-bold text-purple-600 -mt-8">Email Settings</h2>
                            <div className="mt-4">
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-500 mb-1  font-semibold ">Email Address</label>
                                    <input
                                        id="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="border p-3 rounded-md w-full  font-semibold "
                                        readOnly
                                    />
                                </div>
                                <div className="mt-10 text-center">
                                    <Button className="w-full bg-black hover:bg-gray-800">
                                        Change Email
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Password */}
                    {activeTab === "Password" && (
                        <div className="p-6">
                            <h2 className=" text-lg font-bold text-purple-600 -mt-8">Password </h2>
                            <div className="mt-4">
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-500 mb-1  font-semibold ">Current Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={profileData.password}
                                        onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                                        className="border p-3 rounded-md w-full  font-semibold "
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-500 mb-1  font-semibold ">New Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={profileData.password}
                                        onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                                        className="border p-3 rounded-md w-full  font-semibold "
                                    />
                                </div>
                            </div>
                            <div className=" text-center mt-10">
                                <Button className="w-full bg-black hover:bg-gray-800">
                                    Save Password
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}