"use client";

import { useEffect, useState } from "react";
import LoadingState from "@/components/LoadingState";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [salesData, setSalesData] = useState<any>(null); // Use `any` for simplicity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch("/api/sales-predict");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSalesData(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Sales Analytics</h1>
      <h2>Total Sales for 2025: {salesData?.total_sales_2025} TK</h2>
      <h2 className="text-xl font-semibold mb-4">Next 1 year Sales Prediction</h2>
      {/* Line Chart for Sales Prediction */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={salesData?.monthly_sales_prediction}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `${value.toFixed(2)} TK`}
            labelFormatter={(label: string) => `Month: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={2}
            name="Estimated Revenue"
            dot={false} // Optional: can display dots or not
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
