"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getProjectById } from "../../api/project";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { Star} from "lucide-react";

export default function PortfolioPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { user } = useContext(AuthContext);
  const [showInterestedDialog, setShowInterestedDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const projectDetails = async () => {
      if (!id) return;
      try {
        const response = await getProjectById(id);
        setProject(response.data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };
    projectDetails();
  }, [id]);

  const handleInterestedClick = () => {
    if (user?.id === project.ownerId) {
      // Show dialog/modal
      setShowInterestedDialog(true);
    } else {
      // Builder: mark interest
      markAsInterested(project.id, user.id); // you'd call your API here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-6 py-8">
      {/* Back to Portfolio Link */}

      {/* Main Project Container */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-7xl mx-auto">
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
        {/* Project Title */}
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-700">
            {project?.projectName}
          </h1>

          <div className="flex items-center gap-4">
            {/* Interested Section */}
            <Button
              onClick={handleInterestedClick} // define below
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition text-sm"
            >
              <Star className="h-4 w-4 mr-2" />
              Interested ({project?.interestedBuilders?.length || 0})
            </Button>

            {/* Edit Button (Only for owner) */}
            {user?.id === project?.ownerId && (
              <Link href="/project-owner/project">
                <button className="text-sm bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200">
                  ✏️ Edit
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Main Image */}
          <div className="md:col-span-2 bg-gray-200 rounded-lg h-106 flex items-center justify-center">
            <span className="text-gray-400">Image</span>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 rounded-lg h-56 flex items-center justify-center">
              <span className="text-gray-400">+</span>
            </div>
            <div className="bg-gray-200 rounded-lg h-56 flex items-center justify-center">
              <span className="text-gray-400">+</span>
            </div>
            <div className="bg-gray-200 rounded-lg h-56 flex items-center justify-center col-span-2">
              <span className="text-gray-400">+</span>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <h2 className="font-semibold text-lg">Project Overview</h2>
            <p className="text-gray-600 mt-1">{project?.description}</p>

            <h2 className="font-semibold text-lg mt-4">Technologies</h2>
            {project?.technologies?.map((tech, index) => (
              <span
                key={index}
                className="bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}

            <h2 className="font-semibold text-lg mt-4">Project Links</h2>
            {project?.urls?.map((url, index) => {
              return (
                <>
                  <Link
                    href={url}
                    className="text-purple-600 underline mt-1 block"
                  >
                    {url}
                  </Link>
                </>
              );
            })}
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-gray-100 rounded-lg p-4 mt-2">
              <h3 className="text-lg font-bold">Project Timeline</h3>
              <p className="text-gray-600 text-sm mt-1">{project?.timeline}</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 mt-2">
              <h3 className="text-lg font-bold">Project Contributors</h3>
              <div className="flex mt-2 -space-x-3">
                {project?.contributors?.map((contributor, index) => (
                  <img
                    key={index}
                    src={contributor.profileImage || "/default-avatar.png"}
                    alt={contributor.firstName || "Contributor"}
                    title={contributor.firstName}
                    className="w-10 h-10 rounded-full border-2 border-white shadow"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInterestedDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Interested</h2>
            {project.interestedBuilders?.length > 0 ? (
              <ul className="space-y-2">
                {project.interestedBuilders.map((builder) => (
                  <li key={builder.id} className="flex items-center gap-3">
                    <img
                      src={builder.profileImage || "/default-avatar.png"}
                      className="w-8 h-8 rounded-full"
                      alt={builder.firstName}
                    />
                    <span>
                      {builder.firstName} {builder.lastName}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No one has shown interest yet.
              </p>
            )}
            <button
              onClick={() => setShowInterestedDialog(false)}
              className="mt-4 text-purple-600 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
