"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import TalentDropdown from "./TalentDropdown";
import { AuthContext } from "../context/AuthContext";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/Dropdown";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto relative">
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        <Link
          href={`/${user
            ? user.accountType === "owner"
              ? "explore-talent"
              : "explore-project"
            : ""
            }`}
          className="flex items-center text-[#3C65F5] font-semibold"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={40}
            className="h-10 w-auto"
          />
          <Image
            src="/name.png"
            alt="Logo"
            width={100}
            height={40}
            className="h-7 w-auto"
          />
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

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-4 space-y-4 text-center">
          <div className="flex flex-col space-y-3">
            <Link
              href="/explore-talent"
              className="text-gray-600 hover:text-gray-900 p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Talents
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <Link
              href="/explore-project"
              className="text-gray-600 hover:text-gray-900 p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Projects
            </Link>
          </div>
          {user ? (
            <div className="border-t text-center pt-3">
              <Link
                href={`/${user.accountType === "owner"
                  ? "project-owner"
                  : "portfolio-builder"
                  }/${user.id}`}
                className="block p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/profile-settings"
                className="block p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center p-2 text-red-500 hover:text-red-700 flex items-center align-center justify-center"
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 pt-3 border-t ">
              <Button asChild>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
              <Link
                href="/sign-in"
                className="text-center text-gray-600 hover:text-gray-900 p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          // ✅ Show "Account" dropdown when logged in
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none">
                <User className="h-5 w-5 mr-2" />
                {user?.firstName?.split("@")[0] || "Account"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link
                  href={`/${user.accountType === "owner"
                    ? "project-owner"
                    : "portfolio-builder"
                    }/${user.id}`}
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile-settings"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Settings
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