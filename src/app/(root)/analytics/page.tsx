"use client";

import React, { useEffect, useState } from 'react';

const Analytics = () => {
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with your actual API URL
        const fetchSalesData = async () => {
            try {
                const response = await fetch('/api/sales-predict');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setSalesData(data.data.sales_prediction); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // console.log(salesData);

    return (
        <div>
            <h1>Sales Analytics</h1>
            <h2>Total Sales for 2025: {salesData?.total_revenue_next_12_months} TK</h2>
            <h3>Monthly Sales Prediction</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Estimated Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData?.monthly_sales?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.month}</td>
                            <td>{item.estimated_revenue.toFixed(2)} TK</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Analytics;
