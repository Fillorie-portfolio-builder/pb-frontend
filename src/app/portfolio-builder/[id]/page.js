"use client"

import Link from "next/link"
import { Button } from ".././../components/ui/Button"
import { Star, LinkedinIcon } from "lucide-react"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBuilderById } from "../../api/builder";

export default function TalentProfile() {
  const params = useParams();
  const builderId = params.id;
  const [builder, setBuilder] = useState(null);

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
              <span className="text-gray-600 text-sm">
                ({builder.reviewCount || 0} reviews)
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {builder.projectsCompleted || 0} Projects Completed
            </p>
            <div className="flex flex-col gap-2 w-full">
              <Button className="w-full">Contact</Button>
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
              <h2 className="text-xl font-semibold mb-4">
                Preferred Job Types
              </h2>
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
        {builder.portfolio && builder.portfolio.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Portfolio</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {builder.portfolio.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>
                    <Link
                      href={item.link}
                      className="text-sm text-purple-600 hover:text-purple-700"
                      target="_blank"
                    >
                      Visit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
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

