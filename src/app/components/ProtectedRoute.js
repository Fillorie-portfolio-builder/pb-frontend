"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/sign-in"); // Redirect to sign-in if not logged in
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>; // Show a loading message while checking auth
  }

  return children; // Render protected content if user is authenticated
}
