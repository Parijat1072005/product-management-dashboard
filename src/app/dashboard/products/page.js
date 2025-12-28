import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import ProductList from "@/components/ProductList";

export default async function ProductsPage() {
  await dbConnect();
  // Fetch data on the server
  const productsData = await Product.find({}).sort({ createdAt: -1 }).lean();
  
  // Convert MongoDB data to a plain JavaScript array to avoid serialization errors
  const products = JSON.parse(JSON.stringify(productsData));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products Inventory</h1>
        <Link 
          href="/dashboard/products/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          + Add Product
        </Link>
      </div>

      {/* Interactive Client Component */}
      <ProductList initialProducts={products} />
    </div>
  );
}