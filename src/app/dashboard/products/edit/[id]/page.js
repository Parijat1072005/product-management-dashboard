"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductById, updateProduct } from "@/actions/productActions";
import { Loader2 } from "lucide-react"; // Loading icon from lucide-react

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // For Save/Update process
  const [fetching, setFetching] = useState(true); // For initial data load
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", category: "", stock: ""
  });

  // Load existing product data on mount
  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock
        });
      } catch (err) {
        alert("Could not find product");
        router.push("/dashboard/products");
      } finally {
        setFetching(false);
      }
    }
    loadProduct();
  }, [id, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append("image", file);

    try {
      await updateProduct(id, data);
      router.push("/dashboard/products");
    } catch (err) {
      alert("Update failed: Check your connection");
      setLoading(false);
    }
  };

  // Initial Fetching UI
  if (fetching) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="animate-spin text-blue-600 mb-2" size={40} />
      <p className="text-gray-500 font-medium text-lg">Loading product data...</p>
    </div>
  );

  return (
    <div className="relative max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      
      {/* LOADING OVERLAY: Appears during Save */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={50} />
          <h3 className="text-xl font-bold text-gray-800">Updating Product</h3>
          <p className="text-gray-500">Please wait while we save your changes...</p>
        </div>
      )}

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-10">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
              step >= num ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-400"
            }`}>
              {num}
            </div>
            <span className={`text-xs mt-2 font-medium ${step >= num ? "text-blue-600" : "text-gray-400"}`}>
              {num === 1 ? "Details" : num === 2 ? "Inventory" : "Media"}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Edit Details</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-3 border rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={() => router.push("/dashboard/products")} className="px-6 py-3 border rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition">Cancel</button>
            <button onClick={() => setStep(2)} className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition">Next: Inventory</button>
          </div>
        </div>
      )}

      {/* Step 2: Pricing */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Edit Inventory</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
              <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-900 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
              <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full p-3 border rounded-xl text-gray-900 bg-gray-50" />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={() => router.push("/dashboard/products")} className="px-6 py-3 border rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition">Cancel</button>
            <button onClick={() => setStep(1)} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold">Back</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition">Next: Media</button>
          </div>
        </div>
      )}

      {/* Step 3: Media */}
      {step === 3 && (
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 text-left">Update Image (Optional)</h2>
          <div className="border-4 border-dashed border-gray-200 rounded-2xl p-10 bg-gray-50 flex flex-col items-center">
            <input type="file" accept="image/*" id="file-upload" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor="file-upload" className="cursor-pointer bg-white border-2 border-blue-500 text-blue-600 px-6 py-2 rounded-lg font-bold">
              {file ? file.name : "Choose New Image"}
            </label>
            <p className="text-xs text-gray-400 mt-4 italic">Leave empty to keep the current image.</p>
          </div>
          
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => router.push("/dashboard/products")} className="px-6 py-3 border rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition">Cancel</button>
            <button onClick={() => setStep(2)} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold">Back</button>
            <button 
              onClick={handleUpdate} 
              disabled={loading}
              className={`flex-1 bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700 ${loading && 'opacity-50'}`}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}