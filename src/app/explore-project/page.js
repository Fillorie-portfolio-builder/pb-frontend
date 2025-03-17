import React from "react";
import { Button } from "../components/ui/Button";

const projects = [
  {
    title: "Redesign E-commerce Website",
    location: "United States",
    description:
      "We're looking for a UX designer to revamp our e-commerce platform, focusing on improving the checkout process and overall user experience.",
    tags: ["UI Design", "User Research", "Prototyping"],
    category: "UX Design",
  },
  {
    title: "Develop React Native Mobile App",
    location: "Canada",
    description:
      "We need a mobile developer to create a cross-platform app for our innovative health tracking solution. Experience with React Native is a must.",
    tags: ["React Native", "API Integration", "State Management"],
    category: "Mobile Development",
  },
  {
    title: "SEO Optimization for Blog",
    location: "Australia",
    description:
      "We're seeking an SEO specialist to optimize our blog content, improve our search engine rankings, and increase organic traffic to our website.",
    tags: ["Keyword Research", "On-page SEO", "Link Building"],
    category: "SEO",
  },
];

const ExploreProjects = () => {
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
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-500 text-sm">📍 {project.location}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                {project.description}
              </p>
              <a href="#" className="text-purple-600 font-medium mt-2 block">
                {project.category}
              </a>
              <Button className="mt-4 w-full">Contact Project Owner</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreProjects;
