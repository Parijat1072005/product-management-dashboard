import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import AnalyticsChart from "@/components/AnalyticsChart";

export default async function DashboardHome() {
  await dbConnect();
  
  // Fetch products to calculate stats and show in chart
  const products = await Product.find({}).lean();
  
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStockItems = products.filter(p => p.stock < 5).length;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-blue-500">
          <p className="text-gray-500 text-sm font-medium uppercase">Total Products</p>
          <h3 className="text-3xl font-bold mt-1 text-blue-600">{totalProducts}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-green-500">
          <p className="text-gray-500 text-sm font-medium uppercase">Total Units in Stock</p>
          <h3 className="text-3xl font-bold mt-1 text-green-600">{totalStock}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-red-500">
          <p className="text-gray-500 text-sm font-medium uppercase">Low Stock Alerts</p>
          <h3 className="text-3xl font-bold mt-1 text-red-600">{lowStockItems}</h3>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-sm p-2">
        {totalProducts > 0 ? (
          <AnalyticsChart data={JSON.parse(JSON.stringify(products))} />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400 italic">
            Add products to see data visualization
          </div>
        )}
      </div>
    </div>
  );
}