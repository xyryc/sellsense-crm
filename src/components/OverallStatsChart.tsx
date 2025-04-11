"use client"

import { CreditCard, ShoppingBag, Truck, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

interface Order {
    totalPrice: number;
}

const OverallStatsChart = () => {
    const [totalOrders, setTotalOrders] = useState<Order[]>([]);
    const [totalProducts, setTotalProducts] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState([])

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

        const fetchAllCustomers = async () => {
            try {
                const response = await fetch(`/api/customers`)
                const result = await response.json()
                setTotalCustomers(result?.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllOrders()
        fetchAllProducts()
        fetchAllCustomers()
    }, [])

    // total price from orders
    const totalPrice = totalOrders?.reduce((sum, order) => sum + (order.totalPrice || 0), 0);


    return (
        <div className="px-4 grid grid-cols-2 xl:grid-cols-4 gap-7">
            {/* stat - 1 */}
            <div className="p-6 dark:bg-white/10 sm:inline-flex items-center gap-6 rounded-xl border drop-shadow-md">
                <div className="p-4 text-green-600 bg-green-200 rounded-full inline-flex">
                    <CreditCard />
                </div>

                <div>
                    <p className="font-bold text-xl">${Math.floor(totalPrice)}</p>
                    <p className="text-sm tracking-wide">Revenue</p>
                </div>
            </div>

            {/* stat - 2 */}
            <div className="p-6 dark:bg-white/10 sm:inline-flex items-center gap-6 rounded-xl border drop-shadow-md">
                <div className="p-4 text-red-600 bg-red-200 rounded-full inline-flex">
                    <Truck />
                </div>

                <div>
                    <p className="font-bold text-xl">{totalOrders.length}+</p>
                    <p className="text-sm tracking-wide">Orders</p>
                </div>
            </div>


            {/* stat - 3 */}
            <div className="p-6 dark:bg-white/10 sm:inline-flex items-center gap-6 rounded-xl border drop-shadow-md">
                <div className="p-4 text-purple-600 bg-purple-200 rounded-full inline-flex">
                    <ShoppingBag />
                </div>

                <div>
                    <p className="font-bold text-xl">{totalProducts.length}+</p>
                    <p className="text-sm tracking-wide">Products</p>
                </div>
            </div>

            {/* stat - 4 */}
            <div className="p-6 dark:bg-white/10 sm:inline-flex items-center gap-6 rounded-xl border drop-shadow-md">
                <div className="p-4 text-blue-600 bg-blue-200 rounded-full inline-flex">
                    <UsersRound />
                </div>

                <div>
                    <p className="font-bold text-xl">{totalCustomers.length}+</p>
                    <p className="text-sm tracking-wide">Customer</p>
                </div>
            </div>
        </div>
    );
};

export default OverallStatsChart;