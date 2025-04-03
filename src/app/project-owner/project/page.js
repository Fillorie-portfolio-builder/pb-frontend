"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { addProject } from "../../api/project"
import { categories } from "../../utils/categories";
import { useRouter } from "next/navigation";

export default function PostProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [knowledgeRequired, setKnowledgeRequired] = useState("");
  const [techInput, setTechInput] = useState("");
  const [urls, setUrls] = useState([""]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const router = useRouter();

  const handleAddTechnology = () => {
    if (techInput.trim()) {
      setTechnologies((prev) => [...prev, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (index) => {
    setTechnologies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddUrl = () => setUrls([...urls, ""]);

  const handleUrlChange = (index, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = value;
    setUrls(updatedUrls);
  };

  const handleRemoveUrl = (index) => {
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
  };

  const handleFileChange = (e) => {
    setMediaFiles([...mediaFiles, ...Array.from(e.target.files)]);
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Post this data to your backend
//     console.log({
//       projectName,
//       description,
//       timeline,
//       technologies,
//       knowledgeRequired,
//     });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // NOTE: If you want to support file uploads, you'll need to handle FormData.
      // For now, assume you're storing media file URLs manually.
      const payload = {
        projectName,
        description,
        timeline,
        technologies,
        knowledgeRequired,
        urls,
        mediaFiles: mediaFiles.map((file) => file.name),
        category,
        subcategory,
      };

      const res = await addProject(payload);
      console.log("Project created:", res.data);

      router.push("/project-owner/id"); // ✅ Redirect after success
    } catch (err) {
      console.error(err);
      // setError(
      //   err.response?.data?.message || "Something went wrong. Please try again."
      // );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="mb-6">
          <Button
            type="button"
            variant="outline"
            className="text-sm"
            onClick={() => router.back()}
          >
            ← Back
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">
          Add/Edit Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              className="border p-3 rounded-md w-full"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              className="border p-3 rounded-md w-full"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Timeline</label>
            <input
              type="text"
              className="border p-3 rounded-md w-full"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g., 2 months, 6 weeks, or by a date"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              className="border p-3 rounded-md w-full"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory(""); // reset subcategory on change
              }}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.slug}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {category && (
            <div>
              <label className="block text-gray-700 mb-1">Subcategory</label>
              <select
                className="border p-3 rounded-md w-full"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                required
              >
                <option value="">Select a subcategory</option>
                {categories
                  .find((cat) => cat.slug === category)
                  ?.subcategories.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1">
              Technologies Required
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="border p-3 rounded-md w-full"
                placeholder="Add a technology and press Add"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
              />
              <Button type="button" onClick={handleAddTechnology}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Project URLs</label>
            {urls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="border p-3 rounded-md w-full"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                />
                {urls.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveUrl(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={handleAddUrl} variant="outline">
              Add URL
            </Button>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Knowledge Required (additional expectations)
            </label>
            <textarea
              className="border p-3 rounded-md w-full"
              rows={3}
              value={knowledgeRequired}
              onChange={(e) => setKnowledgeRequired(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Upload Photos/Videos
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            {mediaFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {mediaFiles.map((file, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-2 text-center text-xs"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Post Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
