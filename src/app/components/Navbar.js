import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "./ui/Button";
import TalentDropdown from "./TalentDropdown";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center text-purple-600 font-semibold">
          <Building2 className="h-5 w-5 mr-2" />
          Build Your Portfolio
        </Link>
        <div className="hidden md:flex space-x-6">
          <TalentDropdown />
          {/* <Link href="/explore-talent" className="text-gray-600 hover:text-gray-900">
            Explore Talent
          </Link> */}
          <Link href="/explore-projects" className="text-gray-600 hover:text-gray-900">
            Explore Projects
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Link href="/account" className="text-gray-600 hover:text-gray-900">
          My Account
        </Link>
      </div>
    </nav>
  );
}
