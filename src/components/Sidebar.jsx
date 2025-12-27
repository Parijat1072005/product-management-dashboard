"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBasket, Users, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Products", icon: <ShoppingBasket size={20} />, path: "/dashboard/products" },
    { name: "Onboard Admin", icon: <Users size={20} />, path: "/dashboard/onboard" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-blue-400 px-2">Admin Panel</h2>
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
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition mt-auto"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}