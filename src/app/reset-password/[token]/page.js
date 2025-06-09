"use client";

import React, { useState } from "react";
import { Lock } from "lucide-react";
import { confirmPassword } from "../../api/auth";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ConfirmPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleConfirmPassword = async (e) => {
        e.preventDefault();

        if (!password || !confirm) {
            setError("Please fill in both fields.");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await confirmPassword(token, password);
            if (res.status === 200) {
                setSuccess("Password confirmed successfully.");
                setPassword("");
                setConfirm("");
                setError("");
                router.push("/sign-in");
            }
        } catch (err) {
            setError("Failed to confirm password.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8FF]">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-[#3C65F5]">Confirm Password</h2>
                <p className="text-gray-600 text-center mb-6 my-5">Please enter your new password.</p>
                <form className="space-y-5" onSubmit={handleConfirmPassword}>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-purple-300"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-purple-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#3C65F5] hover:bg-[rgba(60,101,245,0.8)] text-white py-2 rounded-lg transition-colors"
                    >
                        Confirm Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmPassword;
