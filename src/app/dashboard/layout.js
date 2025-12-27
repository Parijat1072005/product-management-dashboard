import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Permanent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold text-gray-700">Management Dashboard</h1>
          <div className="text-sm text-gray-500">Welcome, Admin</div>
        </header>
        {children}
      </main>
    </div>
  );
}