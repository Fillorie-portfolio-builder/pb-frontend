"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TalentDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    // Clear any timeout that would close the dropdown
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay closing the dropdown to allow smoother transitions
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Adjust delay if needed
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown Trigger */}
      <Link href="/explore-talent" passHref>
        <button
          className={`text-gray-600 hover:text-gray-900 ${
            isOpen ? "text-gray-900" : ""
          }`}
        >
          Explore Talent
        </button>
      </Link>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-screen max-w-6xl bg-white shadow-lg rounded-lg p-6 z-50">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.title} className="space-y-4">
                <Link
                  href={`/explore-talent/${category.slug}`}
                  className="flex items-center text-[#3C65F5] font-semibold hover:text-[#E1E7FE]"
                >
                  <ChevronRight className="h-5 w-5" />
                  {category.title}
                </Link>
                <ul className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <Link
                        href={`/explore-talent/${category.slug}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const categories = [
  {
    title: "Creative & Design",
    slug: "creative-design",
    subcategories: ["Graphic Design", "UX/UI Design", "Illustration", "Animation", "Branding"],
  },
  {
    title: "Engineering & Technical",
    slug: "engineering-technical",
    subcategories: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "Civil Engineering",
      "CAD & 3D Modeling",
      "Product Design",
    ],
  },
  {
    title: "IT & Software Development",
    slug: "it-software",
    subcategories: ["Web Development", "Mobile App Development", "DevOps", "Cloud Computing", "Cybersecurity"],
  },
  {
    title: "Data & Analytics",
    slug: "data-analytics",
    subcategories: [
      "Data Science",
      "Machine Learning",
      "Business Intelligence",
      "Data Visualization",
      "Statistical Analysis",
    ],
  },
  {
    title: "Writing & Content",
    slug: "writing-content",
    subcategories: ["Copywriting", "Content Marketing", "Technical Writing", "Editing & Proofreading", "Scriptwriting"],
  },
  {
    title: "Marketing & Sales",
    slug: "marketing-sales",
    subcategories: ["Digital Marketing", "Social Media Marketing", "SEO", "Email Marketing", "Sales Strategy"],
  },
];
