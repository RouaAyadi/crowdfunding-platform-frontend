import { useState, useEffect } from 'react';
import { Startup } from '@/types';
import { startupAPI, StartupQueryParams, StartupsResponse } from '@/lib/api/startups';

export function useStartups(params: StartupQueryParams = {}) {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0,
  });

  const fetchStartups = async (queryParams: StartupQueryParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response: StartupsResponse = await startupAPI.getStartups({
        ...params,
        ...queryParams,
      });
      
      setStartups(response.startups);
      setPagination({
        total: response.total,
        page: response.page,
        totalPages: response.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch startups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  const refetch = (newParams?: StartupQueryParams) => {
    fetchStartups(newParams);
  };

  return {
    startups,
    loading,
    error,
    pagination,
    refetch,
  };
}

export function useStartup(id: string) {
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStartup = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await startupAPI.getStartup(id);
      setStartup(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch startup');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStartup();
    }
  }, [id]);

  const refetch = () => {
    fetchStartup();
  };

  return {
    startup,
    loading,
    error,
    refetch,
  };
}

export function useStartupDashboard(id: string) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await startupAPI.getStartupDashboard(id);
      setDashboard(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDashboard();
    }
  }, [id]);

  const refetch = () => {
    fetchDashboard();
  };

  return {
    dashboard,
    loading,
    error,
    refetch,
  };
}
