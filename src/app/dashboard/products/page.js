import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import { Edit } from "lucide-react";
import DeleteButton from "@/components/DeleteButton"; // Import the new client component

export default async function ProductsPage() {
  await dbConnect();
  const products = await Product.find({}).sort({ createdAt: -1 });

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

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Product</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4 flex items-center gap-3 text-gray-900">
                  {product.imageUrl && (
                    <img src={product.imageUrl} className="w-10 h-10 rounded object-cover" />
                  )}
                  {product.name}
                </td>
                <td className="p-4 text-gray-600">{product.category}</td>
                <td className="p-4 font-bold text-gray-900">${product.price}</td>
                <td className="p-4 font-bold text-gray-900">${product.stock}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link 
                      href={`/dashboard/products/edit/${product._id}`} 
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                    >
                      <Edit size={18} />
                    </Link>
                    
                    {/* Use the new interactive component here */}
                    <DeleteButton productId={product._id.toString()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}