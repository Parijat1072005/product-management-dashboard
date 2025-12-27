import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function ProductsPage() {
  await dbConnect();
  // Fetch products from Atlas, converted to plain objects for Next.js
  const products = await Product.find({}).lean();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Catalog</h2>
        <Link 
          href="/dashboard/products/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 font-semibold text-gray-600">Product</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  No products found. Start by adding one!
                </td>
              </tr>
            ) : (
              products.map((prod) => (
                <tr key={prod._id.toString()} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
                        {prod.imageUrl ? (
                          <img src={prod.imageUrl} alt={prod.name} className="object-cover w-full h-full" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{prod.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{prod.category}</td>
                  <td className="p-4 font-medium text-blue-600">${prod.price}</td>
                  <td className={`p-4 font-bold ${prod.stock < 5 ? 'text-red-500' : 'text-gray-600'}`}>
                    {prod.stock}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button className="text-gray-500 hover:text-blue-600"><Edit size={18} /></button>
                      <button className="text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}