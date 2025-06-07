'use client';

import { useState } from 'react';
import { campaignAPI } from '@/lib/api/campaigns';

export default function TestCampaignAPIPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [campaignId, setCampaignId] = useState('');

  const testGetAllCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await campaignAPI.getCampaigns();
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testGetCampaignById = async () => {
    if (!campaignId) {
      setError('Please enter a campaign ID');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await campaignAPI.getCampaign(campaignId);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testInvalidId = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await campaignAPI.getCampaign('0'); // This should trigger the validation error
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Campaign API Test Page</h1>
        
        <div className="space-y-6">
          {/* Test Get All Campaigns */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Get All Campaigns</h2>
            <button
              onClick={testGetAllCampaigns}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get All Campaigns'}
            </button>
          </div>

          {/* Test Get Campaign by ID */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Get Campaign by ID</h2>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                placeholder="Enter campaign ID (24-char hex string)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded"
              />
              <button
                onClick={testGetCampaignById}
                disabled={loading || !campaignId}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Campaign'}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Tip: First run "Get All Campaigns" to see available IDs, then copy one here.
            </p>
          </div>

          {/* Test Invalid ID */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Invalid ID Validation</h2>
            <button
              onClick={testInvalidId}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Test Invalid ID (0)'}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              This should return a validation error instead of crashing.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">API Response</h2>
              <div className="mb-4">
                <strong>Type:</strong> {Array.isArray(result.campaigns) ? 'Campaign List' : 'Single Campaign'}
              </div>
              {Array.isArray(result.campaigns) && (
                <div className="mb-4">
                  <strong>Available Campaign IDs:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {result.campaigns.slice(0, 5).map((campaign: any) => (
                      <li key={campaign.id} className="text-sm">
                        <code className="bg-gray-100 px-2 py-1 rounded">{campaign.id}</code> - {campaign.title}
                      </li>
                    ))}
                    {result.campaigns.length > 5 && (
                      <li className="text-sm text-gray-500">... and {result.campaigns.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
