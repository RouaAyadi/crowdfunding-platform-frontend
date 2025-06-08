'use client';

import { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { RiWallet3Line, RiLogoutBoxLine, RiErrorWarningLine } from '@remixicon/react';

export default function WalletConnect() {
  const { 
    account, 
    chainId, 
    isConnected, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet 
  } = useWeb3();
  
  const [showDropdown, setShowDropdown] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = (chainId: number) => {
    const networks: { [key: number]: string } = {
      1: 'Ethereum',
      5: 'Goerli',
      11155111: 'Sepolia',
      137: 'Polygon',
      80001: 'Mumbai',
      31337: 'Localhost',
    };
    return networks[chainId] || `Chain ${chainId}`;
  };

  if (isConnected && account) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RiWallet3Line size={20} />
          <span className="hidden sm:block">{formatAddress(account)}</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4">
              <div className="text-sm text-gray-600 mb-2">Connected Account</div>
              <div className="font-mono text-sm break-all mb-3">{account}</div>
              
              {chainId && (
                <div className="mb-3">
                  <div className="text-sm text-gray-600 mb-1">Network</div>
                  <div className="text-sm font-medium">{getNetworkName(chainId)}</div>
                </div>
              )}

              <button
                onClick={() => {
                  disconnectWallet();
                  setShowDropdown(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <RiLogoutBoxLine size={16} />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        )}

        {/* Click outside to close dropdown */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <RiWallet3Line size={20} />
        <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
      </button>

      {error && (
        <div className="mt-2 flex items-center space-x-1 text-red-600 text-sm">
          <RiErrorWarningLine size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
