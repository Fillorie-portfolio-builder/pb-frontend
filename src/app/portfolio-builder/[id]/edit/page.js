"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBuilderById, updateBuilderById } from "../../../api/builder";
import { Button } from "../../../components/ui/Button";

export default function EditBuilderProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    bio: "",
    education: "",
    skills: [],
    linkedin: "",
    availability: true,
  });
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuilder = async () => {
      try {
        const res = await getBuilderById(id);
        console.log("datata", res.data);
        const builder = res.data;
        setFormData({
          firstName: builder.firstName || "",
          lastName: builder.lastName || "",
          profession: builder.profession || "",
          bio: builder.bio || "",
          education: builder.educationalBackground || "",
          skills: builder.skillSets || [],
          linkedin: builder.linkedin || "",
          availability: builder.availability || false,
        });
      } catch (err) {
        setError("Error loading profile");
        console.error(err);
      }
    };

    if (id) fetchBuilder();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBuilderById(id, formData);
      router.push(`/talent/${id}`);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-10 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">
        Edit Your Profile
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-700">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-3 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-3 rounded-md w-full"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Profession</label>
          <input
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Profession"
            className="border p-3 rounded-md w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Your bio"
            className="border p-3 rounded-md w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Education background"
            className="border p-3 rounded-md w-full"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Skills</label>
          <input
            type="text"
            className="border p-3 rounded-md w-full"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Press Enter to add skill"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  type="button"
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Linkedin</label>
          <input
            name="linkedin"
            type="url"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="border p-3 rounded-md w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                availability: e.target.value === "true",
              }))
            }
            className="border p-3 rounded-md w-full"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
