"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
const LoyaltyPage = ({ userId }: { userId: string }) => {
  const [loyaltyData, setLoyaltyData] = useState<{
    points: number;
    history: { action: string; points: number; date: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hardcoded Loyalty Points Data
  const hardcodedLoyaltyPoints = {
    points: 200, // Set a fixed number of points
    history: [
      { action: "Sign-up Bonus", points: 50, date: new Date().toISOString() },
      { action: "Purchase", points: 100, date: new Date().toISOString() },
      { action: "Referral Bonus", points: 50, date: new Date().toISOString() },
    ],
  };

  // Simulate API fetching with hardcoded data
  const fetchLoyaltyPoints = async () => {
    setLoading(true);
    setError("");
    try {
      // Simulating a delay like an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoyaltyData(hardcodedLoyaltyPoints);
    } catch (err: any) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Simulate adding points (hardcoded, no real API call)
  const addPoints = async (points: number, action: string) => {
    setError("");
    try {
      const newHistory = [
        ...loyaltyData!.history,
        { action, points, date: new Date().toISOString() },
      ];
      setLoyaltyData({
        points: loyaltyData!.points + points,
        history: newHistory,
      });
    } catch (err: any) {
      setError("Failed to add points");
    }
  };

  useEffect(() => {
    fetchLoyaltyPoints();
  }, [userId]);

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Loyalty Rewards
      </h2>
      {loading ? (
        <div className="flex justify-center mt-4" aria-live="polite">
          <Loader2 className="animate-spin text-gray-500 w-6 h-6" />
        </div>
      ) : error ? (
        <div className="text-center mt-4" aria-live="assertive">
          <p className="text-red-500">{error}</p>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={fetchLoyaltyPoints}
          >
            Retry
          </button>
        </div>
      ) : loyaltyData ? (
        <div className="mt-4">
          <p className="text-lg text-gray-700">
            Total Points:{" "}
            <span className="font-semibold">{loyaltyData.points}</span>
          </p>
          <h3 className="mt-4 text-lg font-semibold">History:</h3>
          <ul className="bg-gray-100 p-4 rounded-md mt-2">
            {loyaltyData.history.length > 0 ? (
              loyaltyData.history.map((entry, index) => (
                <li key={index} className="text-gray-600 text-sm mb-1">
                  {new Date(entry.date).toLocaleDateString()} - {entry.action}{" "}
                  (+{entry.points} points)
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No history yet.</p>
            )}
          </ul>
          <Link href="/referral"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => addPoints(50, "Referral Bonus")}
          >
            Earn 50 Points (Referral Bonus)
          </Link>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No data available.</p>
      )}
    </section>
  );
};

export default LoyaltyPage;
