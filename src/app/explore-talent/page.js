import Link from "next/link";
import { Button } from "../components/ui/Button"; // Ensure you have this button component

export default function ExploreTalent() {
  // Sample categories with talents
  const categories = [
    {
      name: "Creative & Design",
      subcategory: "UX Design",
      slug: "creative-design",
      talents: [
        {
          id: 1,
          name: "Alice Johnson",
          role: "UX Designer",
          avatar: "/placeholder.svg",
          location: "New York, USA",
          completedProjects: 15,
          skills: ["Figma", "User Research", "Prototyping"],
          description: "Experienced UX Designer focused on human-centered design.",
          available: true,
        },
        {
          id: 2,
          name: "Mark Smith",
          role: "Graphic Designer",
          avatar: "/placeholder.svg",
          location: "London, UK",
          completedProjects: 20,
          skills: ["Photoshop", "Illustrator", "Branding"],
          description: "Passionate about visual storytelling and branding.",
          available: false,
          availableIn: "2 weeks",
        },
        {
          id: 3,
          name: "Samantha Lee",
          role: "UI Designer",
          avatar: "/placeholder.svg",
          location: "Toronto, Canada",
          completedProjects: 10,
          skills: ["Sketch", "Wireframing", "User Testing"],
          description: "Focused on creating seamless user experiences.",
          available: true,
        },
        {
          id: 4,
          name: "Daniel Carter",
          role: "Product Designer",
          avatar: "/placeholder.svg",
          location: "Berlin, Germany",
          completedProjects: 18,
          skills: ["Figma", "Product Strategy", "Prototyping"],
          description: "Blending design with business strategy.",
          available: true,
        },
      ],
    },
    {
      name: "IT & Software Development",
      subcategory: "Web Development",
      slug: "it-software",
      talents: [
        {
          id: 5,
          name: "John Doe",
          role: "Frontend Developer",
          avatar: "/placeholder.svg",
          location: "San Francisco, USA",
          completedProjects: 25,
          skills: ["React", "Next.js", "Tailwind CSS"],
          description: "Building modern web applications.",
          available: true,
        },
        {
          id: 6,
          name: "Jane Smith",
          role: "Backend Developer",
          avatar: "/placeholder.svg",
          location: "Austin, USA",
          completedProjects: 30,
          skills: ["Node.js", "GraphQL", "PostgreSQL"],
          description: "Specialized in scalable backend systems.",
          available: false,
          availableIn: "1 month",
        },
        {
          id: 7,
          name: "David Wilson",
          role: "Full-Stack Developer",
          avatar: "/placeholder.svg",
          location: "Sydney, Australia",
          completedProjects: 22,
          skills: ["MERN Stack", "REST APIs", "AWS"],
          description: "End-to-end web development expertise.",
          available: true,
        },
        {
          id: 8,
          name: "Emily Davis",
          role: "Mobile Developer",
          avatar: "/placeholder.svg",
          location: "Dubai, UAE",
          completedProjects: 12,
          skills: ["Flutter", "React Native", "Swift"],
          description: "Building seamless mobile experiences.",
          available: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Explore Talents</h1>

        {categories.map((category) => (
          <div key={category.slug} className="mb-12">
            {/* Breadcrumb + View All Button */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-600 text-sm">
                {category.name} &gt;{" "}
                <span className="font-semibold">{category.subcategory}</span>
              </div>
              <Link href={`/explore-talent/${category.slug}`} passHref>
                <Button className="bg-purple-600 text-white hover:bg-gray-800">
                  View All
                </Button>
              </Link>
            </div>

            {/* Talent Grid - 4 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.talents.map((talent) => (
                <div
                  key={talent.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={talent.avatar || "/placeholder.svg"}
                        alt={talent.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{talent.name}</h3>
                      <p className="text-gray-600 text-sm">{talent.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    📍 {talent.location}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    ✅ {talent.completedProjects} completed projects
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {talent.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          talent.available ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-sm text-gray-600">
                        {talent.available
                          ? "Available"
                          : `Available in ${talent.availableIn}`}
                      </span>
                    </div>
                    <Link
                      href={`/talent/${talent.id}`}
                      className="text-purple-600 hover:text-gray-800"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
