
"use client"

import Link from "next/link";
import { Button } from "../components/ui/Button"; // Ensure you have this button component
import { categories } from "../utils/categories";
import { useEffect, useState } from "react";
import { getAllBuilders } from "../api/builder"
import { MapPinCheckInside ,CircleCheckBig } from "lucide-react"; 

export default function ExploreTalent() {
  const [activeFilters, setActiveFilters] = useState({});
  const [builders, setBuilders] = useState(null);

  const handleSubcategorySelect = (categorySlug, subcategory) => {
    setActiveFilters((prev) => ({
      ...prev,
      [categorySlug]: subcategory,
    }));
  };

  useEffect(() => {
    const getAllTalents = async () => {
      const response = await getAllBuilders();
      console.log("repspfddf", response.data);
      setBuilders(response.data);
    };
    getAllTalents();
  }, []);
  // Sample categories with talents
  // const categories = [
  //   {
  //     name: "Creative & Design",
  //     subcategory: "UX Design",
  //     slug: "creative-design",
  //     talents: [
  //       {
  //         id: 1,
  //         name: "Alice Johnson",
  //         role: "UX Designer",
  //         avatar: "/placeholder.svg",
  //         location: "New York, USA",
  //         completedProjects: 15,
  //         skills: ["Figma", "User Research", "Prototyping"],
  //         description: "Experienced UX Designer focused on human-centered design.",
  //         available: true,
  //       },
  //       {
  //         id: 2,
  //         name: "Mark Smith",
  //         role: "Graphic Designer",
  //         avatar: "/placeholder.svg",
  //         location: "London, UK",
  //         completedProjects: 20,
  //         skills: ["Photoshop", "Illustrator", "Branding"],
  //         description: "Passionate about visual storytelling and branding.",
  //         available: false,
  //         availableIn: "2 weeks",
  //       },
  //       {
  //         id: 3,
  //         name: "Samantha Lee",
  //         role: "UI Designer",
  //         avatar: "/placeholder.svg",
  //         location: "Toronto, Canada",
  //         completedProjects: 10,
  //         skills: ["Sketch", "Wireframing", "User Testing"],
  //         description: "Focused on creating seamless user experiences.",
  //         available: true,
  //       },
  //       {
  //         id: 4,
  //         name: "Daniel Carter",
  //         role: "Product Designer",
  //         avatar: "/placeholder.svg",
  //         location: "Berlin, Germany",
  //         completedProjects: 18,
  //         skills: ["Figma", "Product Strategy", "Prototyping"],
  //         description: "Blending design with business strategy.",
  //         available: true,
  //       },
  //     ],
  //   },
  //   {
  //     name: "IT & Software Development",
  //     subcategory: "Web Development",
  //     slug: "it-software",
  //     talents: [
  //       {
  //         id: 5,
  //         name: "John Doe",
  //         role: "Frontend Developer",
  //         avatar: "/placeholder.svg",
  //         location: "San Francisco, USA",
  //         completedProjects: 25,
  //         skills: ["React", "Next.js", "Tailwind CSS"],
  //         description: "Building modern web applications.",
  //         available: true,
  //       },
  //       {
  //         id: 6,
  //         name: "Jane Smith",
  //         role: "Backend Developer",
  //         avatar: "/placeholder.svg",
  //         location: "Austin, USA",
  //         completedProjects: 30,
  //         skills: ["Node.js", "GraphQL", "PostgreSQL"],
  //         description: "Specialized in scalable backend systems.",
  //         available: false,
  //         availableIn: "1 month",
  //       },
  //       {
  //         id: 7,
  //         name: "David Wilson",
  //         role: "Full-Stack Developer",
  //         avatar: "/placeholder.svg",
  //         location: "Sydney, Australia",
  //         completedProjects: 22,
  //         skills: ["MERN Stack", "REST APIs", "AWS"],
  //         description: "End-to-end web development expertise.",
  //         available: true,
  //       },
  //       {
  //         id: 8,
  //         name: "Emily Davis",
  //         role: "Mobile Developer",
  //         avatar: "/placeholder.svg",
  //         location: "Dubai, UAE",
  //         completedProjects: 12,
  //         skills: ["Flutter", "React Native", "Swift"],
  //         description: "Building seamless mobile experiences.",
  //         available: true,
  //       },
  //     ],
  //   },
  // ];
  return (
    <div className="min-h-screen bg-[#FAF8FF] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Explore Talents</h1>
        {categories.map((category) => {
          const selectedSubcategory = activeFilters[category.slug];

          const filteredBuilders = builders?.filter((builder) => {
            return (
              builder?.category === category.slug &&
              (!selectedSubcategory ||
                builder?.subcategories.includes(selectedSubcategory))
            );
          });

          return (
            <div key={category.slug} className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="mb-4">
                  <div className="text-gray-600 font-semibold text-md mb-2">
                    {category.title}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleSubcategorySelect(category.slug, sub)
                        }
                        className={`px-3 py-1 rounded-full text-sm border ${selectedSubcategory === sub
                          ? "bg-[#3C65F5] text-white"
                          : "bg-white text-[#3C65F5] border-purple-300"
                          } hover:bg-[rgba(60,101,245,0.1)] hover:text-[#3C65F5]`}
                      >
                        {sub}
                      </button>
                    ))}
                    {selectedSubcategory && (
                      <button
                        className="text-xs ml-2 text-[#3C65F5] underline"
                        onClick={() =>
                          handleSubcategorySelect(category.slug, null)
                        }
                      >
                        Clear Filter
                      </button>
                    )}
                  </div>
                </div>
                {filteredBuilders?.length > 4 && (
                  <div className="flex justify-end mt-6 ">
                    <Link
                      className="text-[#3C65F5] border border-purple-600 px-3 py-2 rounded-md hover:text-gray-800 text-sm font-medium"
                      href={{
                        pathname: `/explore-talent/${category.slug}`,
                        query: selectedSubcategory ? { subcategory: selectedSubcategory } : {}
                      }}>
                      View All
                    </Link>
                  </div>
                )}
              </div>
              {filteredBuilders?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredBuilders?.slice(0, 4).map((talent) => (
                      <div
                        key={talent.id}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            {/* <img
                              src={talent.avatar || "/placeholder.svg"}
                              alt={talent.name}
                              className="w-full h-full object-cover"
                            /> */}
                            <span className="text-2xl text-[#3C65F5] flex items-center justify-center h-full">
                              {talent.firstName?.charAt(0)}                        
                              {talent.lastName?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {talent.firstName} {talent.lastName}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {talent.profession}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPinCheckInside size={20} color="#3c65f5" />{talent.location}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                         <CircleCheckBig size={18} color="#36fa00" />{talent.projectsCompleted} completed projects
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {talent.skillSets?.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded-full text-sm bg-purple-100 text-[#3C65F5]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {talent.bio}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${talent.availability
                                ? "bg-green-500"
                                : "bg-red-500"
                                }`}
                            />
                            <span className="text-sm text-gray-600">
                              {talent.availability
                                ? "Available"
                                : "Not Available"}
                            </span>
                          </div>
                          <Link
                            href={`/portfolio-builder/${talent.id}`}
                            className="text-[#3C65F5] hover:text-gray-800 text-sm font-medium"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm mt-4">
                  This category doesn’t have any profiles yet. New talent is added often, so check back soon!
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
