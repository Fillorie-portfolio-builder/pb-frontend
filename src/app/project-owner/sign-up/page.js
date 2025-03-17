"use client"
import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { signupOwner } from "../../api/auth";
import { useRouter } from "next/navigation"; 

export default function ProjectOwnerSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    profession: "",
    bio: "",
    linkedin: "",
    businessUrl: "",
    offers: [],
    profilePicture: null,
  });
  const [previewImage, setPreviewImage] = useState(null); // ✅ Image preview state
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setPreviewImage(URL.createObjectURL(file)); // ✅ Show preview before upload
    }
  };

  const handleOfferKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        offers: [...prev.offers, e.target.value.trim()],
      }));
      e.target.value = "";
    }
  };

  const removeOffer = (index) => {
    setFormData((prev) => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
  

      console.log("dat", formData);

      const response = await signupOwner(formData);

      console.log("Signup success:", response.data);
      router.push("/sign-in"); // Redirect on success
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-2">
          Create Your Project Owner Profile
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Get help from aspiring professionals
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Profile Picture Upload & Preview */}
        <div className="flex justify-center mb-6">
          <label htmlFor="profilePic" className="relative cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full border-2 border-purple-600 object-cover"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm">
                Upload Image
              </div>
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="profilePic"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Profession</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Business URL (Optional)
              </label>
              <input
                type="url"
                name="businessUrl"
                value={formData.businessUrl}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Offers - Input as chips */}
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">
                What services do you offer?
              </label>
              <input
                type="text"
                className="border p-3 rounded-md w-full"
                placeholder="Press Enter to add an offer"
                onKeyDown={handleOfferKeyDown}
              />
              <div className="flex flex-wrap mt-2 gap-2">
                {formData.offers.map((offer, index) => (
                  <span
                    key={index}
                    className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {offer}
                    <button
                      onClick={() => removeOffer(index)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Create Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
