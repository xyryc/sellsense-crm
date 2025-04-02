// app/referral/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../components/Button';
import ReferralCard from '../components/ReferralCard';
import { ReferralData, ApiResponse } from '@/types';

export default function ReferralPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // This would normally come from a user context or auth service
  const userId = "65d8b3c4e6d78e001b4fc945";
  
  const generateReferralCode = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referrerId: userId }),
      });
      
      const data: ApiResponse<ReferralData> = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate referral code');
      }
      
      if (data.data) {
        setReferralData(data.data);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error('Error generating referral code:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if user already has a referral code
  useEffect(() => {
    const checkExistingReferral = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/referrals?referrerId=${userId}`);
        
        if (response.ok) {
          const data: ApiResponse<ReferralData> = await response.json();
          if (data.success && data.data) {
            setReferralData(data.data);
          }
        }
      } catch (err) {
        console.error('Error checking existing referral:', err);
      }
    };
    
    checkExistingReferral();
  }, [userId]);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Referral Program</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}
      
      {!referralData ? (
        <div className="p-6 rounded-lg shadow-md border mb-8">
          <h2 className="text-xl font-semibold mb-4">Generate Your Referral Code</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Generate a unique referral code to share with friends. You'll earn 50 points for each successful referral!
          </p>
          <Button 
            onClick={generateReferralCode} 
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Referral Code'}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <ReferralCard referralData={referralData} />
          
          <div className="text-right">
            <Link href="/referral/dashboard">
              <Button className="bg-green-500 hover:bg-green-600">
                View Your Referral Stats
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-lg shadow-sm border">
            <div className="font-bold text-blue-500 text-xl mb-2">1.</div>
            <h3 className="font-medium mb-2">Generate Your Code</h3>
            <p className="text-gray-600 text-sm">Click the button to create your unique referral code.</p>
          </div>
          <div className="p-5 rounded-lg shadow-sm border">
            <div className="font-bold text-blue-500 text-xl mb-2">2.</div>
            <h3 className="font-medium mb-2">Share With Friends</h3>
            <p className="text-gray-600 text-sm">Send your referral code or link to friends and invite them to join.</p>
          </div>
          <div className="p-5 rounded-lg shadow-sm border">
            <div className="font-bold text-blue-500 text-xl mb-2">3.</div>
            <h3 className="font-medium mb-2">Earn Rewards</h3>
            <p className="text-gray-600 text-sm">Get 50 points for each friend who signs up using your code.</p>
          </div>
        </div>
      </div>
    </div>
  );
}