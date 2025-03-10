"use client"
import React, { useState } from "react";
import { Button } from "../../components/ui/Button";

export default function ProjectOwnerSignup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    bio: "",
    linkedin: "",
    businessUrl: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-2">Create Your Project Owner Profile</h1>
        <p className="text-gray-600 text-center mb-6">Get help from aspiring professionals</p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input type="email" name="email" className="border p-3 rounded-md w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input type="password" name="password" className="border p-3 rounded-md w-full" onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Bio</label>
            <textarea name="bio" className="border p-3 rounded-md w-full" onChange={handleChange}></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">LinkedIn URL</label>
            <input type="url" name="linkedin" className="border p-3 rounded-md w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Business Page or URL (Optional)</label>
            <input type="url" name="businessUrl" className="border p-3 rounded-md w-full" onChange={handleChange} />
          </div>
        </div>

        <div className="mt-4 text-center">
          <label className="block text-gray-700 mb-2">Profile Picture</label>
          <input type="file" className="hidden" id="profilePic" onChange={handleFileChange} />
          <label htmlFor="profilePic" className="cursor-pointer bg-purple-600 text-white py-2 px-4 rounded-md">Upload Picture</label>
        </div>

        <div className="mt-6 text-center">
          <Button className="w-full bg-black hover:bg-gray-800">Create Profile</Button>
        </div>
      </div>
    </div>
  );
}
