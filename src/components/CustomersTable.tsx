"use client";

import { useState } from "react";
import { Customer } from "../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

// Define the interface for the props passed to this component
interface CustomersTableProps {
  initialCustomers: Customer[]; // Initial customer data passed as a prop
}

export default function CustomersTable({
  initialCustomers,
}: CustomersTableProps) {
  // State to store the search query entered by the user
  const [search, setSearch] = useState("");

  // State to store the list of customers, initialized with the passed data
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  // State to store the sorting order (newest or oldest)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Filter the customers based on the search query, checking if the name or location matches the input
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.location.toLowerCase().includes(search.toLowerCase())
  );

  // Sort customers based on the selected order (newest or oldest)
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); // Oldest first
    }
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="items-center flex">
          <Input
            type="search"
            placeholder="Search by name or location..."
            value={search} // Controlled input value is tied to the 'search' state
            onChange={(e) => setSearch(e.target.value)} // Update 'search' state when the user types
            className="border p-2 rounded mb-4 w-[50vw] dark:bg-gray-700 pr-10"
          />
          <Button className="relative -left-12 bottom-2 bg-transparent dark:text-white text-black shadow-none hover:bg-transparent">
            <Search />
          </Button>
        </div>
        {/* Sort dropdown */}
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="border p-2 rounded dark:bg-gray-700"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Table to display the customers */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the sorted and filtered customers to display each in a table row */}
          {sortedCustomers.map((customer) => (
            <tr
              key={customer._id}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {/* Table data cells for each customer property */}
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">{customer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
