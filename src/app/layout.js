import AuthProvider from "@/components/SessionProvider"; // Default import
import "./globals.css";

export const metadata = {
  title: "Product Management Dashboard",
  description: "College Project Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Only one wrapper is needed to provide session context */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}