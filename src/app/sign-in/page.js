"use client"

import Link from "next/link";

import React, { useContext, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { signin, forgotPassword } from "../api/auth"
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [showResetPassword, setShowResetPassword] = useState(false);


  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signin({ email: email, password: password });

      const { user, token } = res.data; // ✅ Extract user & token

      login(user, token); // ✅ Set user data via AuthContext

      if (user.accountType === "owner") {
        router.push("/explore-talent"); // Redirect for owners
      } else {
        router.push("/explore-project"); // Redirect for portfolio builders
      }

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await forgotPassword(email);
      if (res.status === 200) {
        setShowResetPassword(false);
      }
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    }
  }

  const ResetPassword = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF]">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg ">
          <h2 className="text-2xl font-bold text-center text-purple-600 ">Reset Password</h2>
          <p className="text-gray-600 text-center mb-6 my-5">Enter your email to reset your password.</p>
          <form className="space-y-5" onSubmit={handleForgotPassword}>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-purple-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showResetPassword) {
    return <ResetPassword />;
  }

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
        <p className="text-gray-600 text-center">
          <button
            onClick={() => setShowResetPassword(true)}
            className="text-purple-600 hover:text-purple-700"
          >
            Forgotten password?
          </button>
        </p>
      </div>
    </div>
  );
}
