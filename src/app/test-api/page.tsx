'use client';

import { useState } from 'react';
import { startupAPI } from '@/lib/api/startups';

export default function TestAPIPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startupId, setStartupId] = useState('');

  const testGetAllStartups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await startupAPI.getStartups();
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testGetStartupById = async () => {
    if (!startupId) {
      setError('Please enter a startup ID');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await startupAPI.getStartup(startupId);
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
      const response = await startupAPI.getStartup('0'); // This should trigger the validation error
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
        <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
        
        <div className="space-y-6">
          {/* Test Get All Startups */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Get All Startups</h2>
            <button
              onClick={testGetAllStartups}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get All Startups'}
            </button>
          </div>

          {/* Test Get Startup by ID */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Get Startup by ID</h2>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                value={startupId}
                onChange={(e) => setStartupId(e.target.value)}
                placeholder="Enter startup ID (24-char hex string)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded"
              />
              <button
                onClick={testGetStartupById}
                disabled={loading || !startupId}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Startup'}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Tip: First run "Get All Startups" to see available IDs, then copy one here.
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
                <strong>Type:</strong> {Array.isArray(result.startups) ? 'Startup List' : 'Single Startup'}
              </div>
              {Array.isArray(result.startups) && (
                <div className="mb-4">
                  <strong>Available Startup IDs:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {result.startups.slice(0, 5).map((startup: any) => (
                      <li key={startup.id} className="text-sm">
                        <code className="bg-gray-100 px-2 py-1 rounded">{startup.id}</code> - {startup.name}
                      </li>
                    ))}
                    {result.startups.length > 5 && (
                      <li className="text-sm text-gray-500">... and {result.startups.length - 5} more</li>
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
