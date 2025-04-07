"use client"

import Link from "next/link"
import { Button } from ".././../components/ui/Button"
import { Star, LinkedinIcon } from "lucide-react"
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getBuilderById } from "../../api/builder";
import { getProjectById } from "../../api/project";
import { AuthContext } from "../../context/AuthContext";

export default function TalentProfile() {
  const params = useParams();
  const builderId = params.id;
  const [builder, setBuilder] = useState(null);
  const { user } = useContext(AuthContext);
  const [ projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchBuilderAndProjects = async () => {
      try {
        const builderRes = await getBuilderById(builderId);
        const builderData = builderRes.data;
        setBuilder(builderData);

        // If builder has project IDs, fetch each project
        if (builderData.projects && builderData.projects.length > 0) {
          const projectPromises = builderData.projects.map((projectId) =>
            getProjectById(projectId).then((res) => res.data)
          );
          const projectsData = await Promise.all(projectPromises);
          setProjects(projectsData); // You’ll need a `projects` state
        } else {
          setProjects([]); // Optional: handle empty case
        }
      } catch (err) {
        console.error("Error fetching builder or projects:", err);
      }
    };

    if (builderId) {
      fetchBuilderAndProjects();
    }
  }, [builderId]);

  if (!builder) {
    return <div className="text-center py-20">Loading profile...</div>;
  }
  

  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <div className="w-full md:w-48 flex flex-col items-center">
            <div className="w-32 h-32 bg-purple-100 rounded-full overflow-hidden mb-4">
              {builder.profileImage ? (
                <img
                  src={builder.profileImage}
                  alt={builder.firstName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl text-purple-600 flex items-center justify-center h-full">
                  {builder.firstName?.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="text-xl font-semibold text-center mb-2">
              {builder.firstName} {builder.lastName}
            </h1>
            <p className="text-gray-600 mb-4">{builder.profession}</p>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{builder.ratings || "0.0"}</span>
              <span className="text-gray-600 text-sm">
                ({builder.reviewCount || 0} reviews)
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {builder.projectsCompleted || 0} Projects Completed
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-2 h-2 rounded-full ${
                  builder.availability ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  builder.availability ? "text-green-600" : "text-red-600"
                }`}
              >
                {builder.availability ? "Available" : "Not Available"}
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button className="w-full">Contact</Button>
              {user?.id === builder.id && (
                <Link href={`/portfolio-builder/${builder.id}/edit`}>
                  <Button variant="outline" className="w-full mt-1">
                    Edit Profile
                  </Button>
                </Link>
              )}
              {builder.linkedin && (
                <a href={builder.linkedin} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="w-full">
                    <LinkedinIcon className="h-4 w-4 mr-2" />
                    LinkedIn Profile
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="flex-1">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-600">{builder.bio}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {builder.skillSets?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Educational Background
              </h2>
              <p className="text-gray-600">{builder.educationalBackground}</p>
            </section>
            {/* 
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Preferred Job Types
              </h2>
              <p className="text-gray-600">
                {builder.preferredJobTypes?.join(", ")}
              </p>
            </section> */}

            {/* <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <p className="text-gray-600">
                {builder.availability ? "Available" : "Not Available"}
              </p>
            </section> */}
          </div>
        </div>

        {/* Portfolio Section (optional if included in API) */}
        <div className="flex justify-center mt-10">
          <div className="max-w-7xl w-full bg-white p-6 rounded-lg shadow">
            {projects.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow">
                      <div className="w-full h-36 bg-gray-200 rounded mb-4 flex items-center justify-center">
                        <span className="text-gray-400">
                          [ Image Placeholder ]
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">
                        {project.projectName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {project.timeline || "⏳ Flexible Timeline"}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies?.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                        {project.description}
                      </p>
                      <p className="text-purple-600 font-medium mt-2 text-sm">
                        {project.subcategory}
                      </p>
                      <Link href={`/project/${project.id}`} passHref>
                        <Button className="mt-4 w-full">View Project</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const portfolioItems = [
  {
    title: "E-commerce UX Redesign",
    description: "Led the redesign of the checkout process, resulting in a 15% increase in conversion rate.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Mobile App UI/UX",
    description: "Designed and prototyped a new feature for a fitness tracking app, improving user engagement by 25%.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Website Accessibility Audit",
    description:
      "Conducted a comprehensive accessibility audit and implemented improvements, achieving WCAG 2.1 AA compliance.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Healthcare Dashboard",
    description: "Created an intuitive dashboard for healthcare providers to monitor patient data.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Restaurant Ordering System",
    description: "Designed a user-friendly mobile ordering system for a chain of restaurants.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Travel App Redesign",
    description: "Improved the user experience of a travel booking app through comprehensive research and testing.",
    domain: "example.com",
    link: "https://example.com",
    image: "/placeholder.svg?height=300&width=300",
  },
]

