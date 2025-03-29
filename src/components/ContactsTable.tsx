"use client";

import { useState } from "react";
import { Contacts } from "../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Trash2 } from "lucide-react";

interface ContactsTableProps {
  initialContacts: Contacts[];
}

export default function ContactsTable({
  initialContacts: initialContacts,
}: ContactsTableProps) {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contacts[]>(initialContacts);
  const [sortContacts, setSortContacts] = useState<"newest" | "oldest">(
    "newest"
  );
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredContacts = (contacts || []).filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.company.toLowerCase().includes(search.toLowerCase())
  );

  const sortedContacts = filteredContacts.sort((a, b) => {
    switch (sortContacts) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contacts");
      }

      setContacts(contacts.filter((contact) => contact._id !== id));
      alert("Supplier deleted successfully");
    } catch (error) {
      console.error("Error deleting supplier:", error);
      alert("Failed to delete supplier");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="items-center flex">
          <Input
            type="search"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded mb-4 w-[50vw] dark:bg-gray-700 pr-10"
          />
          <Button className="relative -left-12 bottom-2 bg-transparent dark:text-white text-black shadow-none hover:bg-transparent">
            <Search />
          </Button>
        </div>
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortContacts}
            onChange={(e) =>
              setSortContacts(e.target.value as "newest" | "oldest")
            }
            className="border p-2 rounded dark:bg-gray-700"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-auto">
        <table className="w-full border-collapse border border-gray-300 min-w-[800px]">
          <thead>
            <tr>
              <th className="border p-2"></th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contact, idx) => (
              <tr
                key={contact._id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-center"
              >
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{contact.name}</td>
                <td className="border p-2">{contact.email}</td>
                <td className="border p-2">{contact.phone}</td>
                <td className="border p-2">{contact.company}</td>
                <td className="border p-2">{contact.status}</td>
                <td className="border p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(contact._id)}
                    disabled={isDeleting === contact._id}
                    className="text-red-500 hover:text-red-700"
                  >
                    {isDeleting === contact._id ? (
                      "Deleting..."
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
