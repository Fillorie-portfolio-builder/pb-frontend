import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "./ui/Button";

export default function Footer(){
    return (
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link
                href="/"
                className="flex items-center text-[#3C65F5] font-semibold mb-4"
              >
                <Building2 className="h-5 w-5 mr-2" />
                Build Your Portfolio
              </Link>
              <p className="text-sm text-gray-600">
                Level up your career with real-world projects and build an
                impressive portfolio.
              </p>
            </div>
            {/* <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/explore"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Explore Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/talent"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Find Talent
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enterprise"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div> */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about-us"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    About Us
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/careers"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Blog
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {/* <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Privacy Policy
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Terms of Service
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/cookies"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Cookie Policy
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} Build Your Portfolio. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    );
}

