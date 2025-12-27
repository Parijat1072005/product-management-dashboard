"use server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary"; // Corrected this path
import { revalidatePath } from "next/cache";

export async function createProduct(formData) {
  await dbConnect();
  
  const file = formData.get("image"); 
  let imageUrl = "";

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "products" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });
    
    imageUrl = uploadResponse.secure_url;
  }

  await Product.create({
    name: formData.get("name"),
    price: parseFloat(formData.get("price")),
    description: formData.get("description"),
    category: formData.get("category"),
    stock: parseInt(formData.get("stock")),
    imageUrl: imageUrl
  });

  revalidatePath("/dashboard/products");
}