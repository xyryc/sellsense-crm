import React from "react";
import ProductBarChart from "./ProductBarChart";
import ProductLineChart from "./ProductLineChart";
import ProductPieChart from "./ProductPieChart";
import OverallStatsChart from "./OverallStatsChart";

export default function Dashboard() {
  return (
    <div className="overflow-y-scroll max-h-[85vh]">
      <OverallStatsChart/>
      <ProductBarChart />
      <ProductLineChart />
      <ProductPieChart />
    </div>
  );
}
