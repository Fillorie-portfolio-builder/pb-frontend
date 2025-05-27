"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { getAllProjects } from "../api/project";
import Link from "next/link";

const ExploreProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response.data);
        setFilteredProjects(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    getProjects();
  }, []);

  useEffect(() => {
    const filtered = selectedCategory
      ? projects.filter(project => project.category === selectedCategory)
      : projects;

    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [selectedCategory, projects]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Explore Projects</h1>
          </div>

          <div className="relative inline-block">
            <select
              id="categories"
              name="categories"
              className="appearance-none w-full p-2 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"

              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="creative-design">Creative & Design</option>
              <option value="engineering-technical">
                Engineering & Technical
              </option>
              <option value="it-software">IT & Software Development</option>
              <option value="writing-content">Writing & Content</option>
              <option value="marketing-sales">Marketing & Sales</option>
              <option value="data-analytics">Data & Analytics</option>
            </select>


            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        {currentProjects.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-10">
            No projects found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {currentProjects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                {/* <div className="w-full h-36 bg-gray-200 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400">[ Image Placeholder ]</span>
              </div> */}
                <h3 className="text-lg font-semibold">
                  {project?.projectName}
                </h3>
                {/* <p className="text-gray-500 text-sm">📍 {project?.location}</p> */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project?.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-[rgba(60,101,245,0.1)]  text-[#3C65F5] text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mt-2 text-sm">
                  {project?.description}
                </p>
                <a href="#" className="text-[#3C65F5] font-medium mt-2 block">
                  {project?.subcategory}
                </a>
                <Link href={`/project/${project.id}`}>
                  <Button className="mt-4 w-full">View Project</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-[#3C65F5] hover:bg-purple-50 border-[#3C65F5]"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded border ${
                      currentPage === number
                        ? "bg-[#3C65F5] hover:bg-[rgba(60,101,245,0.8)] text-white border-[#3C65F5]"
                        : "bg-white text-[#3C65F5] hover:bg-purple-50 border-gray-300"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded border ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-[#3C65F5] hover:bg-purple-50 border-[#3C65F5]"
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreProjects;
