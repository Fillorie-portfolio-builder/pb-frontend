
"use client"
import React, { useState } from "react";
import { Button } from "../../components/ui/Button";

export default function PortfolioBuilderSignup() {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      bio: "",
      education: "",
      skills: [],
      jobTypes: "",
      availability: "",
      linkedin: "",
      profilePicture: null,
    });
    
    const jobTypesOptions = ["Full-time", "Part-time", "Contract", "Freelance"];
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e) => {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
          e.preventDefault();
          setFormData((prev) => ({ ...prev, skills: [...prev.skills, e.target.value.trim()] }));
          e.target.value = "";
        }
      };
    
    const removeSkill = (index) => {
      setFormData((prev) => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index),
      }));
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl w-full">
          <h1 className="text-3xl font-bold text-purple-600 text-center mb-2">
            Create Your Portfolio Builder Account
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Start your journey by building an impressive portfolio
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
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
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Skill Sets</label>
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
            <div>
              <label className="block text-gray-700 mb-1">
                Preferred Job Types
              </label>
              <select
                name="jobTypes"
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
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                className="border p-3 rounded-md w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <label className="block text-gray-700 mb-2">Profile Picture</label>
            <input
              type="file"
              className="hidden"
              id="profilePic"
              onChange={handleFileChange}
            />
            <label
              htmlFor="profilePic"
              className="cursor-pointer bg-purple-600 text-white py-2 px-4 rounded-md"
            >
              Upload Picture
            </label>
          </div>

          <div className="mt-6 text-center">
            <Button className="w-full bg-black hover:bg-gray-800">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    );
  }
  