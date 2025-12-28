"use client"; // This makes the button interactive

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/productActions";

export default function DeleteButton({ productId }) {
  const handleDelete = async () => {
    // Confirmation dialog now works because this is a Client Component
    const confirmed = confirm("Are you sure you want to delete this product?");
    
    if (confirmed) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
      title="Delete Product"
    >
      <Trash2 size={18} />
    </button>
  );
}