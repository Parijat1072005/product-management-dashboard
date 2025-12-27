"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 uppercase tracking-tight">
          Admin Login
        </h1>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm mb-6 border border-red-200 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border-2 rounded-xl border-gray-200 focus:border-blue-500 text-gray-900 placeholder-gray-400 outline-none transition-all bg-white"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border-2 rounded-xl border-gray-200 focus:border-blue-500 text-gray-900 placeholder-gray-400 outline-none transition-all bg-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}