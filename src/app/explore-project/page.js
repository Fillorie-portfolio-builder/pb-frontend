"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { getAllProjects } from "../api/project";
import Link from "next/link";

const ExploreProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };

    getProjects();
  }, []);

  return (
    <div className="min-h-screen max-w bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Explore Projects</h1>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="w-full h-36 bg-gray-200 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400">[ Image Placeholder ]</span>
              </div>
              <h3 className="text-lg font-semibold">{project?.projectName}</h3>
              {/* <p className="text-gray-500 text-sm">📍 {project?.location}</p> */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project?.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                {project?.description}
              </p>
              <a href="#" className="text-purple-600 font-medium mt-2 block">
                {project?.subcategory}
              </a>
              <Link href={`/project/${project.id}`}>
                <Button className="mt-4 w-full">View Project</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreProjects;
