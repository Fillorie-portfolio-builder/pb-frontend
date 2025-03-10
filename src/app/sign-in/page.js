"use client"

import Link from "next/link";
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { login } from "../api/auth"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({email: email, password: password});

      const accountType = await res.data.accountType;

      if(accountType === "owner"){
        router.push("/explore-project"); 
      } else{
        router.push("/explore-talent"); 
      }
     

      
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-600">Sign In</h2>
        <p className="text-gray-600 text-center mb-6">Welcome back! Please sign in to your account.</p>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-purple-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-purple-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Sign In
          </Button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-purple-600 hover:text-purple-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
