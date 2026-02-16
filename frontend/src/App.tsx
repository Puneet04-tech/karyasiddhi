import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuthStore } from './store/authStore';

// Lazy load all components for code splitting
const Layout = lazy(() => import('./components/Layout'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Goals = lazy(() => import('./pages/Goals'));
const KPIs = lazy(() => import('./pages/KPIs'));
const Analytics = lazy(() => import('./pages/Analytics'));
const TeamRankings = lazy(() => import('./pages/TeamRankings'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const AllAccounts = lazy(() => import('./pages/AllAccounts'));
const Issues = lazy(() => import('./pages/Issues'));
const ManageEmployee = lazy(() => import('./pages/ManageEmployee'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
  </div>
);

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/goals" element={isAuthenticated ? <Goals /> : <Navigate to="/login" />} />
            <Route path="/issues" element={isAuthenticated ? <Issues /> : <Navigate to="/login" />} />
            <Route path="/kpis" element={isAuthenticated ? <KPIs /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} />
            <Route path="/team-rankings" element={isAuthenticated ? <TeamRankings /> : <Navigate to="/login" />} />
            <Route path="/all-accounts" element={isAuthenticated && user?.role === 'manager' ? <AllAccounts /> : <Navigate to="/" />} />
            <Route path="/manage-employee/:employeeId" element={isAuthenticated && user?.role === 'manager' ? <ManageEmployee /> : <Navigate to="/" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
