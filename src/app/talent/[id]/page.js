import Link from "next/link"
import { Button } from ".././../components/ui/Button"
import { Star, LinkedinIcon } from "lucide-react"

export default function TalentProfile() {
  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          {/* Left Column - Avatar and Stats */}
          <div className="w-full md:w-48 flex flex-col items-center">
            <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-6xl text-purple-600">J</span>
            </div>
            <h1 className="text-xl font-semibold text-center mb-2">Jane Doe</h1>
            <p className="text-gray-600 mb-4">Aspiring UX Designer</p>
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8</span>
              <span className="text-gray-600 text-sm">(112 reviews)</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">5 Projects Completed</p>
            <div className="flex flex-col gap-2 w-full">
              <Button className="w-full">Contact</Button>
              <Button variant="outline" className="w-full">
                <LinkedinIcon className="h-4 w-4 mr-2" />
                LinkedIn Profile
              </Button>
            </div>
          </div>

          {/* Right Column - Profile Info */}
          <div className="flex-1">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-600">
                I'm an aspiring UX designer with a passion for creating intuitive and visually appealing user
                interfaces. Although I'm new to the field, I've completed several personal projects and online courses
                to develop my skills. I'm eager to work on real-world projects to gain more experience and build my
                portfolio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <p className="text-gray-600">
                UI Design, Wireframing, Prototyping, User Research, Figma, Adobe XD, HTML/CSS, Responsive Design,
                User-Centered Design, Information Architecture, Usability Testing, Interaction Design, Visual Design,
                Design Thinking, Sketch, InVision, User Flows, Persona Creation, A/B Testing, Accessibility Design
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Educational Background</h2>
              <ul className="text-gray-600 space-y-2">
                <li>Bachelor of Science in Graphic Design, State University (2018-2022)</li>
                <li>UX Design Certification, Google (2022)</li>
                <li>Various online courses in UX/UI design from platforms like Coursera and Udacity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Preferred Job Types</h2>
              <ul className="text-gray-600 space-y-2">
                <li>• UX/UI Design projects</li>
                <li>• Web and mobile app design</li>
                <li>• User research and usability testing</li>
                <li>• Redesign and optimization projects</li>
                <li>• Collaborative team projects</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <p className="text-gray-600">
                Available for part-time and project-based work (20-30 hours per week)
                <br />
                Flexible schedule, can work remotely or on-site in the San Francisco Bay Area
              </p>
            </section>
          </div>
        </div>

        {/* Portfolio Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Portfolio</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={item.image || "/placeholder.svg?height=300&width=300"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <Link href={item.link} className="text-sm text-purple-600 hover:text-purple-700" target="_blank">
                      {item.domain}
                    </Link>
                    <Button variant="secondary" size="sm" className="bg-black text-white hover:bg-gray-800">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
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

