import api from './api';

/**
 * Real-time Data Fetching API
 * Provides methods to fetch real user-specific data from the backend
 */

// ============= ANALYTICS DATA =============
export const fetchAnalyticsOverview = async (userId?: string) => {
  try {
    const response = await api.get('/analytics/overview', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    return null;
  }
};

export const fetchTeamRankings = async () => {
  try {
    const response = await api.get('/analytics/team-rankings');
    return response.data;
  } catch (error) {
    console.error('Error fetching team rankings:', error);
    return [];
  }
};

export const fetchPredictions = async (userId?: string) => {
  try {
    const response = await api.get('/analytics/predictions', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return [];
  }
};

export const fetchAnomalies = async (userId?: string) => {
  try {
    const response = await api.get('/analytics/anomalies', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching anomalies:', error);
    return [];
  }
};

export const fetchInsights = async (userId?: string) => {
  try {
    const response = await api.get('/analytics/insights', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching insights:', error);
    return [];
  }
};

// ============= USER DATA =============
export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
};

// ============= GOALS DATA =============
export const fetchUserGoals = async (userId: string) => {
  try {
    const response = await api.get('/goals', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user goals:', error);
    return [];
  }
};

export const fetchAllGoals = async () => {
  try {
    const response = await api.get('/goals');
    return response.data;
  } catch (error) {
    console.error('Error fetching all goals:', error);
    return [];
  }
};

// ============= ISSUES DATA =============
export const fetchUserIssues = async (userId: string) => {
  try {
    const response = await api.get('/issues', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user issues:', error);
    return [];
  }
};

export const fetchAllIssues = async () => {
  try {
    const response = await api.get('/issues');
    return response.data;
  } catch (error) {
    console.error('Error fetching all issues:', error);
    return [];
  }
};

// ============= KPIs DATA =============
export const fetchUserKPIs = async (userId: string) => {
  try {
    const response = await api.get('/kpis', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user KPIs:', error);
    return [];
  }
};

export const fetchAllKPIs = async () => {
  try {
    const response = await api.get('/kpis');
    return response.data;
  } catch (error) {
    console.error('Error fetching all KPIs:', error);
    return [];
  }
};

// ============= DEPARTMENTS DATA =============
export const fetchAllDepartments = async () => {
  try {
    const response = await api.get('/departments');
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

export const fetchDepartmentDetails = async (departmentId: string) => {
  try {
    const response = await api.get(`/departments/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching department details:', error);
    return null;
  }
};

// ============= AI SERVICE =============
export const fetchAIInsights = async (userId: string) => {
  try {
    // This would connect to the AI service if available
    const response = await api.get('/analytics/insights', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching AI insights:', error);
    return null;
  }
};

// ============= COMBINED DATA FETCHING (for dashboards) =============
export const fetchDashboardData = async (userId: string) => {
  try {
    const [overview, rankings, predictions, anomalies, insights] = await Promise.all([
      fetchAnalyticsOverview(userId),
      fetchTeamRankings(),
      fetchPredictions(userId),
      fetchAnomalies(userId),
      fetchInsights(userId),
    ]);

    return {
      overview,
      rankings,
      predictions,
      anomalies,
      insights,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      overview: null,
      rankings: [],
      predictions: [],
      anomalies: [],
      insights: [],
    };
  }
};

// ============= REAL-TIME SETUP HOOKS =============
/**
 * Setup real-time data fetching with interval
 * @param fetchFn Function to call for fetching data
 * @param setData State setter function
 * @param interval Interval in milliseconds (default: 30 seconds)
 * @returns Cleanup function
 */
export const setupRealTimeData = (
  fetchFn: () => Promise<any>,
  setData: (data: any) => void,
  interval: number = 30000
): (() => void) => {
  // Fetch immediately
  fetchFn().then(setData).catch(err => console.error('Initial fetch error:', err));

  // Setup interval
  const intervalId = setInterval(() => {
    fetchFn().then(setData).catch(err => console.error('Fetch error:', err));
  }, interval);

  // Return cleanup function
  return () => clearInterval(intervalId);
};
