# Real-Time Data System for Revolutionary Features

## Overview

This system replaces all mock/dummy data in revolutionary features with real data fetched from the backend APIs. Each account now has its own personalized, live-updating data.

## Architecture

###1. API Service Layer (`frontend/src/lib/realtimeApi.ts`)
Provides direct methods for fetching real data from backend endpoints:
- `fetchAnalyticsOverview()` - User's performance metrics
- `fetchPredictions()` - AI predictions for user
- `fetchAnomalies()` - Detected anomalies
- `fetchInsights()` - AI-generated insights
- `fetchUserGoals()` - User's actual goals
- `fetchUserKPIs()` - Key performance indicators
- `fetchAllUsers()` - All system users
- `fetchTeamRankings()` - Team performance rankings

### 2. React Hooks (`frontend/src/lib/useRealTimeData.ts`)
Custom hooks that handle real-time data fetching and automatic updates:
- `useRealTimeAnalytics(userId)` - Updates every 30 seconds
- `useRealTimePredictions(userId)` - Updates every 45 seconds
- `useRealTimeAnomalies(userId)` - Updates every 60 seconds
- `useRealTimeInsights(userId)` - Updates every 50 seconds
- `useRealTimeUserGoals(userId)` - Updates every 30 seconds
- `useRealTimeTeamRankings()` - Updates every 40 seconds
- `useRealTimeAllUsers()` - Updates every 60 seconds

### 3. Data Flow
```
Backend API ↓
  ↓
realtimeApi.ts (Direct API calls)
  ↓
useRealTimeData.ts (React Hooks with auto-refresh)
  ↓
Revolutionary Features (Display real-time data)
  ↓
Each user sees only their data
```

## Implementation Status

### ✅ COMPLETED
- **AIMentor** - Now fetches real insights, predictions, and analytics
- **Infrastructure** - Real-time API layer and hooks built
- **Auth** - user.id properly wired from auth store

### ⏳ IN PROGRESS (Priority Order)

#### Phase 1 (High Priority)
- [ ] **EnhancedGamification** - Use user analytics for levels/points, all users for leaderboard
- [ ] **BlockchainKarma** - Real reputation from user analytics
- [ ] **CarnivalOfProductivity** - Real productivity metrics + team rankings

#### Phase 2 (Medium Priority)  
- [ ] **DigitalMirror** - Real self-awareness metrics from analytics
- [ ] **DigitalTwinSimulation** - Real department data simulation
- [ ] **BharatNetIntegration** - Real citizen feedback data

#### Phase 3 (Remaining)
- [ ] **ZeroKnowledgeGovernance**
- [ ] **TidalWaveAnalytics**
- [ ] **PrecognitionEngine**
- [ ] **EcosystemIntelligence**
- [ ] **DNAGovernance**
- [ ] **LaboratoryOfGovernance**
- [ ] **MoodAdaptiveUI**

## Updating a Component: Step-by-Step

### Before (Mock Data Pattern)
```tsx
const [data, setData] = useState<T[]>([]);

useEffect(() => {
  // Hardcoded mock data
  const mockData = [
    { id: '1', name: 'Item 1', value: 100 },
    { id: '2', name: 'Item 2', value: 200 },
  ];
  setData(mockData);
}, []);
```

### After (Real-Time Data Pattern)
```tsx
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics, useRealTimePredictions } from '../../lib/useRealTimeData';

const MyComponent = () => {
  const { user } = useAuthStore();
  const { data: analyticsData, loading } = useRealTimeAnalytics(user?.id);
  const { data: predictionsData } = useRealTimePredictions(user?.id);

  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    if (analyticsData && predictionsData) {
      // Transform real API data to match component requirements
      const transformedData = [
        {
          id: analyticsData.id,
          name: analyticsData.title,
          value: analyticsData.score
        },
        ...
      ];
      setData(transformedData);
    }
  }, [analyticsData, predictionsData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <div>{/* Display real data */}</div>;
};
```

## Key Features

### ✅ User-Specific Data
Each user automatically sees only their own data:
```tsx
const userId = user?.id; // From auth store
const { data } = useRealTimeAnalytics(userId);
// API automatically filters data for this user
```

### ✅ Real-Time Updates
Components automatically refresh at configured intervals:
- No manual refresh needed
- Automatic updates in background
- Smooth user experience

### ✅ Error Handling
All hooks include error handling:
```tsx
const { data, loading, error } = useRealTimeData(...);
if (error) {
  return <ErrorMessage message={error} />;
}
```

### ✅ Loading States
Components can show loading UI while fetching:
```tsx
if (loading) {
  return <LoadingSpinner />;
}
```

## API Endpoints Used

All data comes from these backend endpoints (authenticated):

| Endpoint | Purpose | User-Specific |
|----------|---------|---|
| `/analytics/overview` | Performance metrics | Yes |
| `/analytics/predictions` | AI predictions | Yes |
| `/analytics/anomalies` | Detected anomalies | Yes |
| `/analytics/insights` | AI insights | Yes |
| `/analytics/team-rankings` | Team rankings | No |
| `/users` | All user profiles | No |
| `/goals` | User's goals | Yes |
| `/kpis` | Key performance indicators | Yes |

(Authentication via JWT token in Authorization header)

## Testing Real-Time Updates

1. Log in as User A - see User A's data
2. Open another browser/tab, log in as User B
3. Both tabs show different, user-specific data
4. Make changes to user data via API/Dashboard
5. Revolutionary features automatically update within 30-60 seconds

## Performance Considerations

- Each component updates at different intervals (30-60s)
- Updates are staggered to avoid thundering herd
- Error handling prevents failed API calls from breaking UI
- Loading states manage async operations smoothly

## Next Steps

1. **Update remaining components** - Follow the pattern above for each feature
2. **Test cross-user data isolation** - Verify each account sees only their data
3. **Performance monitoring** - Check API load with multiple concurrent users
4. **Feedback** - Collect issues from real-time behavior

## Files Created/Modified

**Created:**
- `frontend/src/lib/realtimeApi.ts` - Direct API calls
- `frontend/src/lib/useRealTimeData.ts` - React hooks for real-time data
- `frontend/src/lib/MigrationGuide.ts` - Migration steps for each component
- `frontend/src/REALTIME_MIGRATION.md` - This document

**Modified:**
- `frontend/src/features/ai-mentor/AIMentor.tsx` - Now uses real API data

## Support

For questions on implementing real-time data in a specific component:
- Reference `MigrationGuide.ts` for the pattern
- Check existing implementations in `AIMentor.tsx`
- Follow the "Updating a Component" section above
