"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBasket, Users, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react"; // Added useSession

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession(); // Fetch session data

  // Extract the name from the session or fallback to "Admin"
  const adminName = session?.user?.name || "Admin";

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Products", icon: <ShoppingBasket size={20} />, path: "/dashboard/products" },
    { name: "Onboard Admin", icon: <Users size={20} />, path: "/dashboard/onboard" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-400 px-2">Admin Panel</h2>
      
      {/* Dynamic Name Section */}
      <div className="mb-8 px-2">
        <p className="text-xs text-gray-400 italic">Welcome,</p>
        <p className="text-sm font-medium text-gray-200">{adminName}</p>
      </div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition ${
              pathname === item.path ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center space-x-3 p-3 rounded-lg bg-red-600 hover:bg-white hover:text-red-600 transition mt-auto"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}