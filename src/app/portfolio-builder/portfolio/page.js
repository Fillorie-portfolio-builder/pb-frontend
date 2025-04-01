"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { addPortfolioProject } from "../../api/portfolio"

export default function CreatePortfolioProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [urls, setUrls] = useState([""]);
  const [mediaFiles, setMediaFiles] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // NOTE: If you want to support file uploads, you'll need to handle FormData.
      // For now, assume you're storing media file URLs manually.
      const payload = {
        projectName,
        description,
        urls,
        mediaFiles: mediaFiles.map((file) => file.name), // Optional: or URLs after upload
      };

      const res = await addPortfolioProject(payload);
      console.log("Project created:", res.data);

      router.push("/portfolio-builder/id"); // ✅ Redirect after success
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF] p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">
          Create Portfolio Project
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
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

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              className="border p-3 rounded-md w-full"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* URLs */}
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

          {/* Media Upload */}
          <div>
            <label className="block text-gray-700 mb-2">Upload Photos/Videos</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            {mediaFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="border rounded-md p-2 text-center text-xs">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
