"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const LoyaltyPage = () => {
  const [loyaltyData, setLoyaltyData] = useState<{
    points: number;
    history: { action: string; points: number; date: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hardcoded Loyalty Points Data
  const hardcodedLoyaltyPoints = {
    points: 200,
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoyaltyData(hardcodedLoyaltyPoints);
    } catch {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Simulate adding points
  const addPoints = (points: number, action: string) => {
    if (!loyaltyData) return;
    setLoyaltyData({
      points: loyaltyData.points + points,
      history: [
        ...loyaltyData.history,
        { action, points, date: new Date().toISOString() },
      ],
    });
  };

  useEffect(() => {
    fetchLoyaltyPoints();
  }, []);

  return (
    <section className="max-w-3xl mx-auto p-8 text-gray-800 shadow-xl rounded-3xl">
      <h2 className="text-3xl font-extrabold text-center text-[#06b6d4] drop-shadow-md">
        Loyalty Rewards
      </h2>
      {loading ? (
        <div className="flex justify-center mt-6" aria-live="polite">
          <Loader2 className="animate-spin text-[#06b6d4] w-8 h-8" />
        </div>
      ) : error ? (
        <div className="text-center mt-6" aria-live="assertive">
          <p className="text-red-500 font-semibold">{error}</p>
          <button
            className="mt-3 bg-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={fetchLoyaltyPoints}
          >
            Retry
          </button>
        </div>
      ) : loyaltyData ? (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-medium">
            Total Points:{" "}
            <span className="font-bold text-blue-600">
              {loyaltyData.points}
            </span>
          </p>
          <h3 className="mt-5 text-lg font-semibold text-gray-700">History:</h3>
          <ul className="bg-gray-200 p-5 rounded-lg mt-3">
            {loyaltyData.history.length > 0 ? (
              loyaltyData.history.map((entry, index) => (
                <li key={index} className="text-gray-700 text-sm mb-2">
                  {new Date(entry.date).toLocaleDateString()} - {entry.action}{" "}
                  (+{entry.points} points)
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No history yet.</p>
            )}
          </ul>
          <Link
            href="/referral"
            className="mt-5 inline-block bg-[#06B6D4] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#04b3ce] transition"
            onClick={() => addPoints(50, "Referral Bonus")}
          >
            Earn 50 Points (Referral Bonus)
          </Link>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">No data available.</p>
      )}
    </section>
  );
};

export default LoyaltyPage;
