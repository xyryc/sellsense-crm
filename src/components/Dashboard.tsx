import React from "react";
import ProductBarChart from "./ProductBarChart";
import ProductLineChart from "./ProductLineChart";
import ProductPieChart from "./ProductPieChart";
import OverallStatsChart from "./OverallStatsChart";
import { Calendar } from "./ui/calendar";


export default function Dashboard() {
  return (
    <div className="overflow-y-scroll max-h-[85vh]">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      <OverallStatsChart />

      <div className="grid grid-cols-2">
        <ProductBarChart />
        <div className="flex items-center justify-center">
          <Calendar />
        </div>
        <ProductPieChart />
        <ProductLineChart />
      </div>
    </div>
  );
}
