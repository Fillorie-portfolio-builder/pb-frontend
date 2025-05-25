import Link from "next/link"
import { Building2, User2, ArrowRight } from "lucide-react"
import { Button } from "../ui/Button"

export default function StartJourney() {
  return (
    <div className="min-h-screen bg-[#FAF8FF] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-[#3C65F5] mb-4">Start Your Journey</h1>
        <p className="text-gray-600 text-lg">Choose how you want to be part of our community</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
        {/* Project Owner Card */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
            <Building2 className="h-6 w-6 text-[#3C65F5]" />
          </div>
          <h2 className="text-xl font-semibold mb-4">Project Owner</h2>
          <p className="text-gray-600 mb-6">
            Post projects and connect with talented individuals who are eager to gain experience and build their
            portfolios.
          </p>
          <Link
            href="/signup/project-owner"
            className="inline-flex items-center text-[#3C65F5] hover:text-[#E1E7FE] font-medium"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Portfolio Builder Card */}
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
            <User2 className="h-6 w-6 text-[#3C65F5]" />
          </div>
          <h2 className="text-xl font-semibold mb-4">Portfolio Builder</h2>
          <p className="text-gray-600 mb-6">
            Gain real-world experience, build your portfolio, and receive valuable feedback from project owners.
          </p>
          <Link
            href="/signup/portfolio-builder"
            className="inline-flex items-center text-[#3C65F5] hover:text-[#E1E7FE] font-medium"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="text-center space-y-4">
        <Button asChild className="w-full max-w-sm bg-black hover:bg-gray-800">
          <Link href="/signup">Create Your Account</Link>
        </Button>
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#3C65F5] hover:text-[#E1E7FE]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

