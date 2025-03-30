// app/components/ReferralCard.tsx
import React from 'react';
import CopyButton from './CopyButton';
import { ReferralData } from '@/types';

interface ReferralCardProps {
  referralData: ReferralData;
}

export default function ReferralCard({ referralData }: ReferralCardProps) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const referralLink = `${baseUrl}?ref=${referralData.referralCode}`;

  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white">
      <h3 className="text-xl font-semibold mb-4">Your Referral Details</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Referral Code</p>
          <div className="flex items-center">
            <code className="bg-gray-100 px-3 py-1 rounded">{referralData.referralCode}</code>
            <CopyButton text={referralData.referralCode} />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Referral Link</p>
          <div className="flex items-center">
            <code className="bg-gray-100 px-3 py-1 rounded text-sm truncate max-w-xs">
              {referralLink}
            </code>
            <CopyButton text={referralLink} />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Reward Points</p>
          <p className="font-medium">{referralData.rewardPoints}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <span className={`px-2 py-1 rounded text-xs ${
            referralData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
            referralData.status === 'completed' ? 'bg-green-100 text-green-800' : 
            'bg-gray-100'
          }`}>
            {referralData.status.charAt(0).toUpperCase() + referralData.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}