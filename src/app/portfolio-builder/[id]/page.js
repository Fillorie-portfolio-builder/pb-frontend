"use client";

import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { Star, LinkedinIcon, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBuilderById } from "../../api/builder";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function TalentProfile() {
  const params = useParams();
  const builderId = params.id;
  const [builder, setBuilder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReview, setIsOpenReview] = useState(false);

  useEffect(() => {
    const fetchBuilder = async () => {
      try {
        const res = await getBuilderById(builderId);
        setBuilder(res.data);
      } catch (err) {
        console.error("Error fetching builder:", err);
      }
    };

    if (builderId) {
      fetchBuilder();
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
              <span className="font-medium">{builder.rating || "0.0"}</span>
              <span className="text-gray-600 text-sm">({builder.reviewCount || 0} reviews)</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {builder.projectsCompleted || 0} Projects Completed
            </p>
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={() => setIsOpen(true)}>
                Contact
              </Button>
              <button onClick={() => setIsOpenReview(true)} className="bg-purple-600 text-white px-5 py-2 mb-3 rounded hover:bg-purple-700 transition w-full">
                Give a Review
              </button>
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
              <p className="text-gray-600">{builder.skillSets?.join(", ")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Educational Background
              </h2>
              <p className="text-gray-600">{builder.educationalBackground}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Preferred Job Types</h2>
              <p className="text-gray-600">
                {builder.preferredJobTypes?.join(", ")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <p className="text-gray-600">{builder.availability}</p>
            </section>
          </div>
        </div>

        {/* Portfolio Section (optional if included in API) */}
        <div className="flex justify-center mt-10">
            <div className="max-w-7xl w-full bg-white p-6 rounded-lg shadow">
              {builder.projects.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Projects</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {builder.projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow"
                      >
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

      {/* Modal for Contact Info */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <p className="text-gray-700 mb-2">
          <strong>Phone:</strong> {builder.phone || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {builder.email || "N/A"}
        </p>
      </Modal>

      <Modal isOpen={isOpenReview} onClose={() => setIsOpenReview(false)} className="w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Give a Review </h2>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Write a review..."
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full" />
          </div>
          <div className="">
            <button className="w-full px-5 py-3 bg-gray-500 rounded-lg text-white hover:bg-gray-700 font-semibold" type="submit">Submit a review</button>
          </div>
        </div>
      </Modal>
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

