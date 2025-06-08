'use client';

import { useState } from 'react';
import { useBlockchain } from '@/hooks/useBlockchain';
import { useWeb3 } from '@/contexts/Web3Context';
import { RiWallet3Line, RiSendPlaneLine } from '@remixicon/react';

interface CampaignContributionProps {
  campaignAddress: string;
  campaignTitle: string;
  onContributionSuccess?: () => void;
}

export default function CampaignContribution({ 
  campaignAddress, 
  campaignTitle, 
  onContributionSuccess 
}: CampaignContributionProps) {
  const [amount, setAmount] = useState('');
  const [isContributing, setIsContributing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { isConnected, connectWallet } = useWeb3();
  const { contributeToCampaign, loading } = useBlockchain();

  const handleContribute = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    setIsContributing(true);
    setMessage(null);

    try {
      const result = await contributeToCampaign(campaignAddress, amount);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Contribution successful!' });
        setAmount('');
        onContributionSuccess?.();
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to contribute' 
      });
    } finally {
      setIsContributing(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Support This Campaign</h3>
        <p className="text-gray-600 mb-4">Connect your wallet to contribute to this campaign</p>
        <button
          onClick={connectWallet}
          className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RiWallet3Line size={20} />
          <span>Connect Wallet</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Support This Campaign</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Contribution Amount (ETH)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            step="0.001"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            disabled={isContributing || loading}
          />
        </div>

        {/* Quick amount buttons */}
        <div className="flex space-x-2">
          {['0.01', '0.1', '0.5', '1'].map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isContributing || loading}
            >
              {quickAmount} ETH
            </button>
          ))}
        </div>

        <button
          onClick={handleContribute}
          disabled={!amount || isContributing || loading || parseFloat(amount) <= 0}
          className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RiSendPlaneLine size={20} />
          <span>
            {isContributing || loading ? 'Contributing...' : `Contribute ${amount || '0'} ETH`}
          </span>
        </button>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Your contribution will be sent directly to the campaign smart contract</p>
          <p>• Funds are released to the startup only when milestones are completed</p>
          <p>• You can get a refund if the campaign fails to reach its goal</p>
        </div>
      </div>
    </div>
  );
}
