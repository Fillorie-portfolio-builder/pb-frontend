"use client"

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { getAllBuilders } from "../../api/builder";
import { categories } from "../../utils/categories";
import Link from "next/link";

export default function ExploreTalentbycategory() {
  const { category } = useParams();
  const searchParams = useSearchParams();
  const selectedSubcategory = searchParams.get("subcategory");

  const [builders, setBuilders] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState(selectedSubcategory || null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(4);//

  const currentCategory = categories.find((cat) => cat.slug === category);

  const filteredBuilders = builders.filter((builder) => {
    return (
      builder.category === category &&
      (!activeSubcategory || builder.subcategories.includes(activeSubcategory))
    );
  });

  const totalPages = Math.ceil(filteredBuilders.length / projectsPerPage);
  const indexOfLastBuilder = currentPage * projectsPerPage;
  const indexOfFirstBuilder = indexOfLastBuilder - projectsPerPage;
  const currentBuilders = filteredBuilders.slice(indexOfFirstBuilder, indexOfLastBuilder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchBuilders = async () => {
      const response = await getAllBuilders();
      setBuilders(response.data);
    };
    fetchBuilders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSubcategory]);

  return (
    <div className="min-h-screen bg-[#FAF8FF] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{currentCategory?.title || "Talents"}</h1>

        <div className="mb-6 flex flex-wrap gap-2 items-center">
          {currentCategory?.subcategories.map((sub, index) => (
            <button
              key={index}
              onClick={() => setActiveSubcategory(sub)}
              className={`px-3 py-1 rounded-full text-sm border ${activeSubcategory === sub
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border-purple-300"
                } hover:bg-purple-100 hover:text-purple-600`}
            >
              {sub}
            </button>
          ))}
          {activeSubcategory && (
            <button
              className="text-xs ml-2 text-red-500 underline"
              onClick={() => setActiveSubcategory(null)}
            >
              Clear Filter
            </button>
          )}
        </div>

        {currentBuilders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentBuilders.map((talent) => (
                <div
                  key={talent.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={talent.avatar || "/placeholder.svg"}
                        alt={`${talent.firstName} ${talent.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {talent.firstName} {talent.lastName}
                      </h3>
                      <p className="text-gray-600 text-sm">{talent.profession}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">📍 {talent.location}</div>
                  <div className="text-sm text-gray-600 mb-2">
                    ✅ {talent.projectsCompleted} completed projects
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {talent.skillSets?.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{talent.bio}</p>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${talent.availability ? "bg-green-500" : "bg-red-500"
                        }`} />
                      <span className="text-sm">
                        {talent.availability ? "Available" : "Not Available"}
                      </span>
                    </span>
                    <Link
                      href={`/talent/${talent.id}`}
                      className="text-sm text-purple-600 hover:text-gray-800 font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded border ${currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-purple-600 hover:bg-purple-50 border-purple-600"
                      }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded border ${currentPage === number
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white text-purple-600 hover:bg-purple-50 border-gray-300"
                        }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded border ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-purple-600 hover:bg-purple-50 border-purple-600"
                      }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm mt-4">
            No builders found {activeSubcategory ? `for ${activeSubcategory}` : "in this category"}.
          </p>
        )}
      </div>
    </div>
  );
}