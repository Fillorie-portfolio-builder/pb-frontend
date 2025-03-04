import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ExploreTalent() {
  return (
    <div className="min-h-screen bg-[#FAF8FF] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Explore Talent</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="space-y-4">
              <Link
                href={`/explore-talent/${category.slug}`}
                className="flex items-center text-purple-600 font-semibold hover:text-purple-700"
              >
                <ChevronRight className="h-5 w-5" />
                {category.title}
              </Link>
              <ul className="space-y-2">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <Link
                      href={`/explore-talent/${category.slug}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
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
    </div>
  )
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
]

