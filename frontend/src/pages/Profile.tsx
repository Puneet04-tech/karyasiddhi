import { useState } from 'react';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { 
  Mail, Phone, Building, MapPin, Shield,
  Award, Target, TrendingUp, Calendar, Edit, Save,
  Users, Zap, Trophy, Star, Heart, Briefcase, BookOpen, Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';

// Map icon names to lucide-react components
const iconMap: Record<string, any> = {
  Award,
  Target,
  TrendingUp,
  Users,
  Zap,
  Trophy,
  Star,
  Heart,
  Briefcase,
  BookOpen,
  Rocket,
  Shield,
};

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = () => {
    setIsEditing(false);
    alert('Profile changes saved successfully!');
    // In a real app, this would make an API call to update the user profile
  };

  // Use achievements from user object, or show default message if none
  const achievements = user?.achievements || [];

  const stats = [
    { label: 'Total Goals', value: '0', change: '+12%' },
    { label: 'Completed', value: '0', change: '+18%' },
    { label: 'In Progress', value: '0', change: '-5%' },
    { label: 'Avg. Score', value: '87', change: '+8%' },
  ];

  const recentActivities = [
    { date: '2025-10-04', activity: 'Completed Digital Infrastructure Goal', type: 'success' },
    { date: '2025-10-03', activity: 'Updated 3 KPI metrics', type: 'info' },
    { date: '2025-10-02', activity: 'Started new goal: AI Integration', type: 'info' },
    { date: '2025-10-01', activity: 'Achieved productivity milestone', type: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <button 
          onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
          className={isEditing ? 'btn-primary' : 'btn-secondary'}
        >
          {isEditing ? (
            <><Save size={20} className="inline mr-2" /> Save Changes</>
          ) : (
            <><Edit size={20} className="inline mr-2" /> Edit Profile</>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 space-y-6">
            {/* Avatar */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4">
                {user?.name?.charAt(0)}
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield size={20} className="text-primary-400" />
                <div className="flex items-center gap-3">
                  <span className="text-sm">Digilocker</span>
                  {user?.digilockerVerified ? (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Verified</span>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const start = await api.post('/users/verify/digilocker/start');
                          if (start.data?.providerUrl) {
                            window.open(start.data.providerUrl, '_blank');
                          }
                          const resp = await api.post('/users/verify/digilocker/complete');
                          setUser({ ...user, digilockerVerified: resp.data.digilockerVerified });
                          alert('Digilocker verified successfully');
                        } catch (err) {
                          console.error(err);
                          alert('Digilocker verification failed');
                        }
                      }}
                      className="text-xs bg-yellow-500 text-black px-2 py-1 rounded"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
              <p className="text-gray-400 mt-1">{user?.role}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail size={20} className="text-primary-400" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone size={20} className="text-primary-400" />
                <span className="text-sm">{user?.phone || '+91 98765 43210'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Building size={20} className="text-primary-400" />
                <span className="text-sm">{user?.department}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} className="text-primary-400" />
                <span className="text-sm">New Delhi, India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield size={20} className="text-primary-400" />
                <div className="flex items-center gap-3">
                  <span className="text-sm">Aadhaar: {user?.aadhaar || '—'}</span>
                  {user?.aadhaarVerified ? (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Verified</span>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          // start flow (provider URL may be returned);
                          const start = await api.post('/users/verify/aadhaar/start');
                          if (start.data?.providerUrl) {
                            window.open(start.data.providerUrl, '_blank');
                          }
                          // For now, support immediate complete (test flow)
                          const resp = await api.post('/users/verify/aadhaar/complete');
                          setUser({ ...user, aadhaarVerified: resp.data.aadhaarVerified });
                          alert('Aadhaar verified successfully');
                        } catch (err) {
                          console.error(err);
                          alert('Aadhaar verification failed');
                        }
                      }}
                      className="text-xs bg-yellow-500 text-black px-2 py-1 rounded"
                    >
                      Verify
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="pt-4 border-t border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.length > 0 ? (
                  achievements.map((achievement: any) => {
                    const Icon = iconMap[achievement.icon] || Award;
                    return (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                        title={`Earned on ${new Date(achievement.earnedAt).toLocaleDateString()}`}
                      >
                        <Icon className={achievement.color} size={24} />
                        <div className="flex-1">
                          <span className="text-sm text-gray-300">{achievement.title}</span>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(achievement.earnedAt).toLocaleDateString('en-IN', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400 italic">No achievements yet. Keep working towards your goals!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-4"
              >
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Personal Information */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Employee ID</label>
                <input
                  type="text"
                  defaultValue="EMP-2025-1234"
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                <input
                  type="text"
                  defaultValue={user?.department}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Designation</label>
                <input
                  type="text"
                  defaultValue={user?.role}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date of Joining</label>
                <input
                  type="date"
                  defaultValue="2020-01-15"
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                <input
                  type="text"
                  defaultValue="New Delhi"
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Calendar className="mr-2 text-blue-500" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full ${item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-white">{item.activity}</p>
                    <p className="text-sm text-gray-400 mt-1">{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
