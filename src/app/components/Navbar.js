"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, User, LogOut } from "lucide-react";
import { Button } from "./ui/Button";
import TalentDropdown from "./TalentDropdown";
import { AuthContext } from "../context/AuthContext"; // ✅ Import AuthContext
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/Dropdown"; // ✅ Import dropdown menu components


export default function Navbar() {
  const { user, logout } = useContext(AuthContext); // ✅ Use AuthContext
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    router.push("/"); // Redirect to home after logout
  };

  return (
    <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        <Link
          href={`/${
            user
              ? user.accountType === "owner"
                ? "explore-talent"
                : "explore-project"
              : ""
          }`}
          className="flex items-center text-purple-600 font-semibold"
        >
          <Building2 className="h-5 w-5 mr-2" />
          Build Your Portfolio
        </Link>
        <div className="hidden md:flex space-x-6">
          <TalentDropdown />
          <Link
            href="/explore-project"
            className="text-gray-600 hover:text-gray-900"
          >

            Explore Projects
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {user ? (
          // ✅ Show "Account" dropdown when logged in
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none">
                <User className="h-5 w-5 mr-2" />
                {user?.email?.split("@")[0] || "Account"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link
                  href={`/${
                    user.accountType === "owner"
                      ? "project-owner"
                      : "portfolio-builder"
                  }/${user.id}`}
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 cursor-pointer"
              >
                <LogOut className="h-4 w-4 inline mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // ✅ Show Sign Up / Sign In buttons when logged out
          <>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Link href="/sign-in" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}
