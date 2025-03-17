"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { signup } from "../../api/auth";

export default function PortfolioBuilderSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    profession: "",
    bio: "",
    education: "",
    skills: [],
    jobTypes: "",
    availability: "",
    linkedin: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // ✅ Image preview state
  const [error, setError] = useState("");

  const jobTypesOptions = ["Full-time", "Part-time", "Contract", "Freelance"];

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file)); // ✅ Show preview before upload
    }
  };

  // Handle skill input
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, e.target.value.trim()],
      }));
      e.target.value = "";
    }
  };

  // Remove skill chip
  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // const data = new FormData();
      // Object.keys(formData).forEach((key) => {
      //   if (formData[key]) data.append(key, formData[key]);
      // });

      // if (profilePicture) {
      //   data.append("profilePicture", profilePicture);
      // }

      const response = await signup(formData);
      console.log("Signup success:", response.data);
      router.push("/sign-in");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-2">
          Create Your Portfolio Builder Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Start your journey by building an impressive portfolio
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
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              ></textarea>
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
              <label className="block text-gray-700 mb-1">Job Type</label>
              <select
                name="jobTypes"
                value={formData.jobTypes}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              >
                <option value="">Select a job type</option>
                {jobTypesOptions.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Availability</label>
              <textarea
                name="availability"
                value={formData.availability}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Educational Background
              </label>
              <textarea
                name="education"
                value={formData.education}
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700 mb-1">Skills</label>
              <input
                type="text"
                className="border p-3 rounded-md w-full"
                onKeyDown={handleSkillKeyDown}
                placeholder="Press Enter to add a skill"
              />
              <div className="flex flex-wrap mt-2 gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
