import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "./ui/Button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-1/3">
            <Link
              href="/"
              className="flex items-center text-[#3C65F5] font-semibold mb-2"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/name.png"
                alt="Logo"
                width={100}
                height={40}
                className="h-7 w-auto"
              />

            </Link>
            <p className="text-sm text-gray-600">
              Level up your career with real-world projects and build an
              impressive portfolio.
            </p>
          </div>

          <div className="flex items-center">
            <ul className="flex flex-wrap gap-4 md:gap-6">
              <li>
                <Link
                  href="/about-us"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Spherekick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

