import React from "react";
import ProductBarChart from "./ProductBarChart";
import ProductLineChart from "./ProductLineChart";
import ProductPieChart from "./ProductPieChart";
import OverallStatsChart from "./OverallStatsChart";
import DashboardCalendar from "./DashboardCalendar";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Welcome Admin</h1>

      <OverallStatsChart />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ProductPieChart />
        <DashboardCalendar />
        <ProductBarChart />
        <ProductLineChart />
      </div>
    </div>
  );
}
