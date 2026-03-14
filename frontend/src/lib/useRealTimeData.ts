import { useState, useEffect, useCallback } from 'react';
import {
  fetchAnalyticsOverview,
  fetchPredictions,
  fetchAnomalies,
  fetchInsights,
  fetchUserGoals,
  fetchUserKPIs,
  fetchAllUsers,
  fetchTeamRankings,
  fetchAIInsights,
} from './realtimeApi';

/**
 * Custom React Hook for Real-time Data Fetching
 * Usage: const { data, loading, error } = useRealTimeData('analytics', userId);
 */

export const useRealTimeAnalytics = (userId?: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchAnalyticsOverview(userId);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return { data, loading, error };
};

export const useRealTimePredictions = (userId?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchPredictions(userId);
        setData(Array.isArray(result) ? result : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch predictions');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 45000); // Update every 45 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return { data, loading, error };
};

export const useRealTimeAnomalies = (userId?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchAnomalies(userId);
        setData(Array.isArray(result) ? result : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch anomalies');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return { data, loading, error };
};

export const useRealTimeInsights = (userId?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchInsights(userId);
        setData(Array.isArray(result) ? result : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch insights');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 50000); // Update every 50 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return { data, loading, error };
};

export const useRealTimeUserGoals = (userId: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchUserGoals(userId);
        setData(Array.isArray(result) ? result : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch goals');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  return { data, loading, error };
};

export const useRealTimeUserKPIs = (userId: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchUserKPIs(userId);
        setData(Array.isArray(result) ? result : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch KPIs');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
      const interval = setInterval(fetchData, 35000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  return { data, loading, error };
};

export const useRealTimeTeamRankings = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchTeamRankings();
        setData(Array.isArray(result) ? result : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch team rankings');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 40000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

export const useRealTimeAllUsers = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchAllUsers();
        setData(Array.isArray(result) ? result : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
