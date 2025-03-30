"use client"

import { useEffect, useState } from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


interface Order {
    totalPrice: number;
}

const OverallStatsChart = () => {
    const [totalOrders, setTotalOrders] = useState<Order[]>([]);
    const [totalProducts, setTotalProducts] = useState([]);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const response = await fetch(`/api/orders`)
                const result = await response.json()
                setTotalOrders(result?.data)
            } catch (error) {
                console.log(error)
            }
        }

        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`/api/products`)
                const result = await response.json()
                setTotalProducts(result?.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllOrders()
        fetchAllProducts()
    }, [])

    // total price from orders
    const totalPrice = totalOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    // data for the chart
    const chartData = [
        { name: "Total Orders", count: totalOrders.length },
        { name: "Total Products", count: totalProducts.length },
    ];

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold mb-4">
                    Overall Statistics
                </h2>

                <h2 className="text-xl font-semibold mb-4 text-right">
                    Revenue: ${totalPrice}
                </h2>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} barSize={50}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OverallStatsChart;