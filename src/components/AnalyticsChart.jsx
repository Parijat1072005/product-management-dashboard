"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AnalyticsChart({ data }) {
  // We format the data slightly to ensure Recharts can read it
  const chartData = data.map(item => ({
    name: item.name.substring(0, 10), // Shorten name for the axis
    Stock: item.stock,
    Price: item.price
  }));

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Inventory Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Stock" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Price" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}