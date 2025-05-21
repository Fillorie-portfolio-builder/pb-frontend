"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/Button";
import { categories } from "../../../utils/categories";
import { useParams } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";
import { getBuilderById } from "../../../api/builder";
import { updateBuilder } from "../../../api/setting";

export default function PortfolioBuilderSignup() {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const builderId = params.id;
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        // email: "",
        // password: "",
        // mobile: "",
        profession: "",
        bio: "",
        educationalBackground: "",
        skills: [],
        jobTypes: "",
        availability: "",
        linkedin: "",
        location: "",
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // ✅ Image preview state
    const [error, setError] = useState("");
    const [category, setCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [builder, setBuilder] = useState(null);


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
        if (e.key === "Enter" && skillInput.trim()) {
            e.preventDefault();
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
            setSkillInput(""); // Clear input field
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
            const payload = {
                ...formData,
                category,
                subcategories: selectedSubcategories,
            };
            const response = await updateBuilder(builderId, payload);
            console.log("Updated:", response.data);
            router.push("/");
        } catch (err) {
            setError(err.response?.data?.message || "Update failed. Please try again.");
        }
    };

    useEffect(() => {
        const fetchBuilder = async () => {
            if (!builderId) return;
            // console.log("Fetching builder with ID:", builderId);
            try {
                const res = await getBuilderById(builderId);
                // console.log("Builder user data:", res.data);
                setBuilder(res.data);
            } catch (err) {
                console.error("Error fetching builder:", err);
            }
        };
        fetchBuilder();
    }, [builderId]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            console.log("Fetching user with ID:", user);
            try {
                if (user.accountType === "builder") {
                    const res = await getBuilderById(user.id);
                    console.log("Builder data (user):", res.data);
                    setBuilder(res.data);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
        fetchUserData();
    }, [user]);

    useEffect(() => {
        if (builder) {
            setFormData({
                firstName: builder.firstName || "",
                lastName: builder.lastName || "",
                // email: builder.email || "",
                // mobile: builder.mobile || "",
                profession: builder.profession || "",
                bio: builder.bio || "",
                educationalBackground: builder.educationalBackground || "",
                skills: builder.skillSets || [],
                jobTypes: builder.jobTypes || "",
                availability: builder.availability?.toString() || "",
                linkedin: builder.linkedin || "",
                location: builder.location || "",
            });
            setCategory(builder.category || "");
            setSelectedSubcategories(builder.subcategories || []);
        }
    }, [builder]);

    useEffect(() => {
        if (category) {
            const matchedCategory = categories.find((cat) => cat.slug === category);
            setSubcategories(matchedCategory?.subcategories || []);
        }
    }, [category]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
                <h1 className="text-3xl font-bold text-purple-600 text-center mb-2">
                    Update Your Portfolio Builder Account
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
                        {/* <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                className="border p-3 rounded-md w-full"
                                onChange={handleChange}
                                required
                            />
                        </div> */}
                        {/* <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            className="border p-3 rounded-md w-full"
                            onChange={handleChange}
                            required
                        />
                        </div> */}
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
                            <label className="block text-gray-700 mb-1">Category</label>
                            <select
                                value={category}
                                className="border p-3 rounded-md w-full"
                                onChange={(e) => {
                                    const selected = e.target.value;
                                    setCategory(selected);
                                    setSubcategories(
                                        categories.find((cat) => cat.slug === selected)
                                            ?.subcategories || []
                                    );
                                    setSelectedSubcategories([]); // reset selected chips
                                }}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>
                                        {cat.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {subcategories.length > 0 && (
                            <div className="mt-2">
                                <label className="block text-gray-700 mb-1">
                                    Select Subcategories
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {subcategories.map((sub, idx) => (
                                        <span
                                            key={idx}
                                            onClick={() => {
                                                if (selectedSubcategories.includes(sub)) {
                                                    setSelectedSubcategories((prev) =>
                                                        prev.filter((s) => s !== sub)
                                                    );
                                                } else {
                                                    setSelectedSubcategories((prev) => [...prev, sub]);
                                                }
                                            }}
                                            className={`cursor-pointer px-3 py-1 rounded-full text-sm ${selectedSubcategories.includes(sub)
                                                ? "bg-purple-600 text-white"
                                                : "bg-purple-100 text-purple-800"
                                                }`}
                                        >
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                className="border p-3 rounded-md w-full"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* <div>
                        <label className="block text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            className="border p-3 rounded-md w-full"
                            onChange={handleChange}
                            required
                        />
                        </div> */}
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

                        {/* <div>
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
                        </div> */}
                        <div>
                            <label className="block text-gray-700 mb-1">Availability</label>
                            <select
                                name="availability"
                                value={formData.availability}
                                className="border p-3 rounded-md w-full"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        availability: e.target.value === "true",
                                    })
                                }
                            >
                                <option value="">Select availability</option>
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">
                                Educational Background
                            </label>
                            <textarea
                                name="educationalBackground"
                                value={formData.educationalBackground}
                                className="border p-3 rounded-md w-full"
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-gray-700 mb-1">Skills</label>
                            <input
                                type="text"
                                className="border p-3 rounded-md w-full"
                                placeholder="Press Enter to add a skill"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
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
                            Update Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}