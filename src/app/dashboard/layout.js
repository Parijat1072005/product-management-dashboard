"use client"; // Required to use useSession
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();

  // Extract name or fallback to Admin
  const adminName = session?.user?.name || "Admin";

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Permanent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold text-gray-700">Management Dashboard</h1>
          {/* DYNAMIC NAME DISPLAY */}
          <div className="text-sm text-gray-500 font-medium">
            Welcome, <span className="text-blue-600 font-bold">{adminName}</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}