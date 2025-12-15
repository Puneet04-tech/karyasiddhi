import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Target, BarChart3, TrendingUp, Users, User, Settings, 
  Menu, X, Bell, LogOut, Shield, FileText
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // If there's no authenticated user, redirect to login. Use effect so
  // the redirect happens as soon as the store is hydrated and avoids
  // the layout rendering a blank page when nested routes try to render.
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  const location = useLocation();

  const baseNavigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'KPIs', href: '/kpis', icon: BarChart3 },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  ];

  const managerNavigation = [
    { name: 'All Accounts', href: '/all-accounts', icon: Users, managerOnly: true },
    { name: 'Team Rankings', href: '/team-rankings', icon: TrendingUp, managerOnly: true },
  ];

  const bottomNavigation = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isManager = user?.role === 'Department Head';
  const navigation = [
    ...baseNavigation,
    ...(isManager ? managerNavigation : []),
    ...bottomNavigation,
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full glass-morphism border-b border-white/10" role="navigation" aria-label="Top navigation">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-white/10 lg:hidden"
                aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={sidebarOpen}
                aria-controls="sidebar-navigation"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="flex items-center ml-4 lg:ml-0">
                <Shield className="w-8 h-8 text-primary-500" aria-hidden="true" />
                <div className="ml-3">
                  <h1 className="text-xl font-bold gradient-text">KaryaSiddhi</h1>
                  <p className="text-xs text-gray-400">Digital India Initiative</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-white/10 relative" aria-label="View notifications, 1 unread">
                <Bell size={20} aria-hidden="true" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 glass-morphism border-r border-white/10"
            id="sidebar-navigation"
            aria-label="Main navigation"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center p-3 rounded-lg transition-all ${
                          active
                            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                            : 'text-gray-300 hover:bg-white/10'
                        }`}
                        aria-current={active ? 'page' : undefined}
                        aria-label={item.name}
                      >
                        <Icon size={20} aria-hidden="true" />
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="flex items-center w-full p-3 text-gray-300 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all"
                  aria-label="Logout from your account"
                >
                  <LogOut size={20} />
                  <span className="ml-3">Logout</span>
                </button>
              </div>

              {/* Government Branding */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/20 via-white/10 to-green-500/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-center space-x-2">
                  <FileText size={16} className="text-orange-500" />
                  <span className="text-xs font-semibold">Digital India</span>
                  <FileText size={16} className="text-green-500" />
                </div>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Ministry of Electronics & IT
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 pt-20" id="main-content">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          role="button"
          aria-label="Close navigation menu"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
