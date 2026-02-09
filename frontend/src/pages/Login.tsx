import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Fingerprint, FileText, ArrowRight, Eye, EyeOff, TrendingUp, Users, Award, Zap } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email.trim().toLowerCase(), password.trim());
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || error.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: TrendingUp, title: 'Real-time Analytics', desc: 'Track performance metrics instantly' },
    { icon: Users, title: 'Team Collaboration', desc: 'Seamless cross-department coordination' },
    { icon: Award, title: 'Goal Management', desc: 'Set and achieve strategic objectives' },
    { icon: Zap, title: 'AI-Powered Insights', desc: 'Smart predictions and recommendations' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden" role="main" aria-label="Login page">
      {/* Simplified Background - static gradients for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-8 p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start space-x-4"
            >
              <Shield className="w-20 h-20 text-primary-400" aria-hidden="true" />
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold gradient-text">KaryaSiddhi</h1>
                <p className="text-gray-300 text-base mt-2">AI-Enhanced Performance Platform</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Digital India Initiative
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Transforming government performance management across India with AI-powered insights, real-time tracking, and seamless collaboration.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '50M+', label: 'Government Employees' },
                { value: '99.95%', label: 'System Uptime' },
                { value: '100+', label: 'Departments' },
                { value: '24/7', label: 'Support Available' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card p-5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
                >
                  <h3 className="text-3xl font-bold gradient-text">{stat.value}</h3>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-2 gap-3"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
                  >
                    <Icon className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* India Flag Colors */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex space-x-2"
            >
              <motion.div whileHover={{ scaleY: 1.2 }} className="w-full h-3 bg-orange-500 rounded"></motion.div>
              <motion.div whileHover={{ scaleY: 1.2 }} className="w-full h-3 bg-white rounded"></motion.div>
              <motion.div whileHover={{ scaleY: 1.2 }} className="w-full h-3 bg-green-600 rounded"></motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="card p-8 lg:p-10 bg-slate-800/70 backdrop-blur-xl border border-slate-700/50 shadow-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400">Sign in to access your performance dashboard</p>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary-400 transition-colors" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-11 focus:ring-2 focus:ring-primary-500/50 transition-all"
                      placeholder="officer@gov.in"
                      required
                      aria-required="true"
                      aria-label="Email address"
                      autoComplete="email"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary-400 transition-colors" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pl-11 pr-11 focus:ring-2 focus:ring-primary-500/50 transition-all"
                      placeholder="Enter your password"
                      required
                      aria-required="true"
                      aria-label="Password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-primary-600 border-gray-600 rounded focus:ring-2 focus:ring-primary-500/50 bg-slate-700" 
                    />
                    <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors" aria-label="Reset forgotten password">
                    Forgot password?
                  </button>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center space-x-2 py-3.5 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={loading ? 'Signing in, please wait' : 'Sign in to your account'}
                >
                  <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                  {!loading && <ArrowRight size={20} />}
                  {loading && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Shield size={20} />
                    </motion.div>
                  )}
                </motion.button>
              </form>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="text-xs text-center text-gray-500 mt-8 flex items-center justify-center space-x-2"
              >
                <Shield size={14} className="text-green-500" />
                <span>Protected by end-to-end encryption and MeitY Cloud infrastructure</span>
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Login;
