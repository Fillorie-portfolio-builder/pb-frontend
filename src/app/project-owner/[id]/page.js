"use client"

import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import { getProjectsByOwner } from "../../api/project"
import { getOwnerById } from "../../api/owner"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/ui/Button"

export default function ProjectOwner() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    if (user) {
      const getProjects = async () =>{
        const response = await getProjectsByOwner(user.id);
        console.log("roeps", response.data);
        setProjects(response.data);
      }

      
      getProjects();
    }
  }, [user]);

  useEffect(() => {
    const getOwnerDetails = async () => {
      const response = await getOwnerById(user.id);
      console.log("rowner", response.data);
      setOwner(response.data);
    };
    getOwnerDetails();
  }, [user]);

    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto mt-6 grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {owner?.firstName} {owner?.lastName}
                  </h2>
                  <p className="text-gray-500">{owner?.profession}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg">Bio</h3>
                <p className="text-gray-600 mt-1">{owner?.bio}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg">What We Offer</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {owner?.offers.map((offer) => {
                    return <li>{offer}</li>;
                  })}
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <Link href="/project-owner/project">
                <button className="bg-purple-600 text-white px-5 py-2 mb-3 rounded hover:bg-purple-700 transition w-full">
                  + Post a Project
                </button>
              </Link>
              <h3 className="text-lg font-semibold">Projects Sponsored</h3>
              <div className="mt-4">
                <h4 className="font-medium">Bakery Website Redesign</h4>
                <p className="text-gray-500 text-sm">Completed - June 2023</p>
                <div className="flex gap-2 mt-1">
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Web Design
                  </span>
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    UI/UX
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Social Media Marketing Campaign</h4>
                <p className="text-gray-500 text-sm">Completed: August 2023</p>
                <div className="flex gap-2 mt-1">
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Digital Marketing
                  </span>
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Content Creation
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Inventory Management System</h4>
                <p className="text-gray-500 text-sm">Ongoing</p>
                <div className="flex gap-2 mt-1">
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Software Development
                  </span>
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                    Database Design
                  </span>
                </div>
              </div>
              {/* 
                <button className="mt-4 w-full bg-black text-white py-2 rounded">
                  Contact for Opportunities
                </button> */}
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <div className="max-w-7xl w-full bg-white p-6 rounded-lg shadow">
              {projects.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow"
                      >
                        {/* <div className="w-full h-36 bg-gray-200 rounded mb-4 flex items-center justify-center">
                          <span className="text-gray-400">
                            [ Image Placeholder ]
                          </span>
                        </div> */}
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
                        <p className="text-[#3C65F5] font-medium mt-2 text-sm">
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
      </ProtectedRoute>
    );
}
