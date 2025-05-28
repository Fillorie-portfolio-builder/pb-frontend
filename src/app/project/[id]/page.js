"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  assignBuilderToProject,
  getProjectById,
  markAsInterested,
  markProjectCompletedByBuilder,
  confirmProjectCompletionByOwner
} from "../../api/project";
import { getBuilderById } from "../../api/builder";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { Star, Edit2 } from "lucide-react";

export default function PortfolioPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { user } = useContext(AuthContext);
  const [showInterestedDialog, setShowInterestedDialog] = useState(false);
  const router = useRouter();
  const [hasMarkedInterest, setHasMarkedInterest] = useState(false);
  const [contributor, setContributor] = useState(null);
  const [showCompletionToast, setShowCompletionToast] = useState(false);

  useEffect(() => {
    const projectDetails = async () => {
      if (!id) return;

      try {
        const res = await getProjectById(id);
        const data = res.data;
        console.log("rkele", res.data);

        // Get builder details for interested builder IDs
        const builderDetails = await Promise.all(
          (data.interestedBuilders || []).map((builderId) =>
            getBuilderById(builderId).then((res) => res.data)
          )
        );

        // Replace IDs with full builder objects
        data.interestedBuilders = builderDetails;
        setProject(data);

        if (data.builderId) {
          try {
            const contributorData = await getBuilderById(data.builderId);
            setContributor(contributorData.data);
          } catch (err) {
            console.error("Failed to fetch assigned builder details:", err);
          }
        }

        if (user?.accountType === "builder") {
          const isInterested = data.interestedBuilders.some(
            (b) => b.id === user.id
          );
          setHasMarkedInterest(isInterested);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };

    projectDetails();
  }, [id, user]);

 useEffect(() => {
  if (
    user?.id === project?.builderId &&
    project?.completionStatus === 'completed_by_builder'
  ) {
    setShowCompletionToast(true);
    const timer = setTimeout(() => {
      setShowCompletionToast(false);
    }, 4000);

    return () => clearTimeout(timer);
  }
}, [project?.completionStatus, user?.id, project?.builderId]);

  const handleInterestedClick = async () => {
    if (user?.id === project.ownerId) {
      // Show dialog/modal
      setShowInterestedDialog(true);
    } else {
      // Builder: mark interest
      try {
        // 🔁 Toggle logic (replace with actual API)
        const newInterest = !hasMarkedInterest;
        setHasMarkedInterest(newInterest);
        setProject((prev) => {
          const updated = { ...prev };
          if (newInterest) {
            updated.interestedBuilders = [
              ...(prev.interestedBuilders || []),
              user.id,
            ];
          } else {
            updated.interestedBuilders = (prev.interestedBuilders || []).filter(
              (id) => id !== user.id
            );
          }
          return updated;
        });

        await markAsInterested(project.id, user.id, newInterest);
      } catch (err) {
        console.error("Interest update failed", err);
      }
    }
  };

  const handleAddToProject = async (builderId) => {
    try {
      await assignBuilderToProject(project.id, builderId);
      setShowInterestedDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  const markProjectCompleted = async () => {
    try {
      if (!user?.id) {
        console.error("User ID missing");
        return;
      }
      await markProjectCompletedByBuilder(project.id, user.id);
      setProject(prev => ({
        ...prev,
        completionStatus: 'completed_by_builder'
      }));
    } catch (err) {
      console.error("Failed to mark project as completed", err);
    }
  };

  const confirmProjectCompletion = async () => {
    try {
      if (!user?.id) {
        console.error("User ID missing");
        return;
      }
      await confirmProjectCompletionByOwner(project.id, user.id);
      setProject(prev => ({
        ...prev,
        completionStatus: 'confirmed_by_owner'
      }));
    } catch (err) {
      console.error("Failed to mark project as completed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-6 py-8">
      {/* Back to Portfolio Link */}
      {showCompletionToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-50 text-blue-800 px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
          Waiting for owner's confirmation
        </div>
      )}
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
          <h1 className="text-2xl font-bold text-[#3C65F5]">
            {project?.projectName}
          </h1>

          <div className="flex items-center gap-4">
            {/* Interested Section */}
             {(user?.id === project?.ownerId || user?.accountType === "builder") && (
              <Button
                onClick={handleInterestedClick}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-full transition border shadow-sm
                  ${hasMarkedInterest
                    ? "bg-[rgba(60,101,245,0.6)]   border-purple-200"
                    : "bg-white text-black border-gray-300 hover:bg-white hover:text-black"
                  }`}
              >
                <Star
                  className={`h-4 w-4 mr-2 ${hasMarkedInterest ? "text-white" : "text-black"
                    }`}
                />
                <span
                  className={`${hasMarkedInterest ? "text-white" : "text-black"
                    }`}
                >
                  {" "}
                  Interested ({project?.interestedBuilders?.length || 0})
                </span>
              </Button>
             )}
            {user?.id === project?.builderId && (
                <Button
                  className="bg-[#3C65F5] hover:bg-[rgba(60,101,245,0.8)] text-white border-[#3C65F5]"
                  onClick={() => {
                    console.log(project.id, user.id);
                    markProjectCompleted(project.id, user.id);
                  }}
                  disabled={!project || project.completionStatus === 'confirmed_by_owner' || project.completionStatus === 'completed_by_builder'}
                >
                  {!project || project.completionStatus === 'confirmed_by_owner'
                    ? 'Confirmed by Owner'
                    : project.completionStatus === 'completed_by_builder'
                      ? 'Marked as Completed'
                      : 'Mark as Completed'}
                </Button>
            )}

            {/* Edit Button (Only for owner) */}
            {user?.id === project?.ownerId && (
              <>
                <Button
                  onClick={() =>
                    router.push(`/project-owner/project/${project.id}`)
                  }
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white text-black rounded-full border shadow-sm hover:bg-white hover:text-black hover:shadow-md"
                >
                  <Edit2 className="h-4 w-4 mr-2 text-black" />
                  <span className="text-black">Edit</span>
                </Button>
                {project && (project.completionStatus === 'completed_by_builder' || project.completionStatus === 'confirmed_by_owner') && (
                  <Button
                    className="bg-[#3C65F5] text-white border-[#3C65F5] hover:bg-purple-100 hover:text-black"
                    onClick={confirmProjectCompletion}
                    disabled={project.completionStatus === 'confirmed_by_owner'}
                  >
                    Complete
                  </Button>
                )}
              </>
            )}
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
                className="bg-[rgba(60,101,245,0.1)] text-[#3C65F5] text-xs px-3 py-1 rounded-full"
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
                    className="text-[#3C65F5] underline mt-1 block"
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
              {contributor ? (
                <div className="flex items-center gap-3 mt-2">
                  <Link
                    href={`/portfolio-builder/${contributor.id}`}
                    className="flex items-center gap-3 hover:opacity-90"
                  >
                    {contributor.profileImage ? (
                      <img
                        src={contributor.profileImage}
                        className="w-8 h-8 rounded-full object-cover"
                        alt={contributor.firstName}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-[#3C65F5] flex items-center justify-center text-sm font-semibold">
                        {contributor.firstName?.[0]}
                      </div>
                    )}
                    <span className="text-sm font-medium text-black">
                      {contributor.firstName} {contributor.lastName}
                    </span>
                  </Link>
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-1">
                  No contributor assigned yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showInterestedDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Interested Builders</h2>

            {project.interestedBuilders?.length > 0 ? (
              <ul className="space-y-3">
                {project.interestedBuilders.map((builder) => (
                  <li
                    key={builder.id}
                    className="flex items-center justify-between"
                  >
                    <Link
                      href={`/portfolio-builder/${builder.id}`}
                      className="flex items-center gap-3 hover:opacity-90"
                    >
                      {builder.profileImage ? (
                        <img
                          src={builder.profileImage}
                          className="w-8 h-8 rounded-full object-cover"
                          alt={builder.firstName}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-[#3C65F5] flex items-center justify-center text-sm font-semibold">
                          {builder.firstName?.[0]}
                        </div>
                      )}
                      <span className="text-sm font-medium text-black">
                        {builder.firstName} {builder.lastName}
                      </span>
                    </Link>

                    {project.builderId === builder.id ? (
                      <button
                        className="text-xs bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed"
                        disabled
                      >
                        Added to Project
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToProject(builder.id)}
                        className="text-xs bg-[#3C65F5] text-white px-3 py-1 rounded hover:bg-[rgba(60,101,245,0.8)] transition"
                      >
                        Add to Project
                      </button>
                    )}
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
              className="mt-6 text-[#3C65F5] hover:underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}