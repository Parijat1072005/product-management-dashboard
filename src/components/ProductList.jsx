"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Search, AlertTriangle, Trash2 } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

export default function ProductList({ initialProducts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showLowStock, setShowLowStock] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  useEffect(() => {
    let result = initialProducts;

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (showLowStock) {
      result = result.filter((p) => p.stock < 10);
    }

    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, showLowStock, initialProducts]);

  return (
    <>
      {/* Search and Filter Bar - High Contrast */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 mb-8 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-3 text-slate-500" size={20} />
          <input 
            type="text"
            placeholder="Search products by name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home & Kitchen</option>
        </select>

        <button 
          onClick={() => setShowLowStock(!showLowStock)}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all font-bold ${
            showLowStock 
              ? "bg-red-600 border-red-600 text-white shadow-lg" 
              : "bg-white border-gray-300 text-slate-700 hover:bg-gray-50 shadow-sm"
          }`}
        >
          <AlertTriangle size={18} />
          Low Stock
        </button>
      </div>

      {/* Table Section - High Visibility */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100 border-b-2 border-slate-200">
            <tr>
              <th className="p-5 font-bold text-slate-800 uppercase text-xs tracking-wider">Product</th>
              <th className="p-5 font-bold text-slate-800 uppercase text-xs tracking-wider">Category</th>
              <th className="p-5 font-bold text-slate-800 uppercase text-xs tracking-wider">Price</th>
              <th className="p-5 font-bold text-slate-800 uppercase text-xs tracking-wider">Stock</th>
              <th className="p-5 font-bold text-slate-800 uppercase text-xs tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-5 flex items-center gap-4 text-slate-900 font-semibold">
                  {product.imageUrl && (
                    <img 
                      src={product.imageUrl} 
                      alt="" 
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm" 
                    />
                  )}
                  <span className="group-hover:text-blue-600 transition-colors">{product.name}</span>
                </td>
                <td className="p-5 text-slate-700 font-medium">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="p-5 font-black text-slate-900 text-lg">
                  ${product.price}
                </td>
                <td className="p-5">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                    product.stock < 10 
                      ? 'bg-red-100 text-red-700 border border-red-200' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-3">
                    <Link 
                      href={`/dashboard/products/edit/${product._id}`} 
                      className="p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all border border-blue-100"
                    >
                      <Edit size={20} />
                    </Link>
                    <DeleteButton productId={product._id.toString()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="p-20 text-center bg-gray-50">
            <Search className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold text-xl">No products match your search.</p>
            <p className="text-slate-400">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>
    </>
  );
}