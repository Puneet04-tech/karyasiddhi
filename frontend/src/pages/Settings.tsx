import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Bell, Lock, Globe, 
  Moon, Sun, Shield, Database, Wifi, WifiOff
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';

const Settings = () => {
  const { user, setUser } = useAuthStore();
  const [localSettings, setLocalSettings] = useState({
    notifications: true,
    emailAlerts: true,
    darkMode: true,
    offlineMode: false,
    twoFactor: false,
    language: 'English',
  });
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Initialize settings from user store on component mount
  useEffect(() => {
    if (user?.settings) {
      setLocalSettings(user.settings);
    }
  }, [user]);

  const toggleSwitch = async (key: keyof typeof localSettings) => {
    const newSettings = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(newSettings);
    
    // Update local user immediately for responsive UI
    if (user) {
      setUser({ ...user, settings: newSettings });
    }
    
    // Save to backend
    try {
      setLoading(true);
      const response = await api.put('/settings', newSettings);
      if (response.data) {
        // Backend confirmed the update
        console.log('Settings saved successfully');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      // Revert on error
      setLocalSettings(user?.settings || localSettings);
      if (user) {
        setUser({ ...user, settings: user?.settings || localSettings });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (language: string) => {
    const newSettings = { ...localSettings, language };
    setLocalSettings(newSettings);
    
    // Update local user immediately for responsive UI
    if (user) {
      setUser({ ...user, settings: newSettings });
    }
    
    // Save to backend
    try {
      setLoading(true);
      const response = await api.put('/settings', newSettings);
      if (response.data) {
        console.log('Language saved successfully');
      }
    } catch (error) {
      console.error('Failed to save language:', error);
      // Revert on error
      setLocalSettings(user?.settings || localSettings);
      if (user) {
        setUser({ ...user, settings: user?.settings || localSettings });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (changePasswordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/settings/change-password', {
        currentPassword: changePasswordData.currentPassword,
        newPassword: changePasswordData.newPassword,
      });
      
      alert('Password changed successfully!');
      setChangePasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowChangePasswordModal(false);
    } catch (error: any) {
      console.error('Failed to change password:', error);
      alert(error.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      setExportLoading(true);
      const response = await api.post('/settings/export-data');
      
      // Create and download JSON file
      const dataStr = JSON.stringify(response.data.data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `karyasiddhi-data-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      alert('Data exported successfully!');
    } catch (error: any) {
      console.error('Failed to export data:', error);
      alert(error.response?.data?.message || 'Failed to export data. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone and your account will be permanently deleted within 30 days.');
    
    if (!confirmed) return;
    
    const finalConfirmation = confirm('This is your final warning. Your account and all associated data will be permanently deleted. Are you absolutely sure?');
    
    if (!finalConfirmation) return;

    try {
      setDeleteLoading(true);
      const response = await api.delete('/settings/account');
      
      alert(response.data.message || 'Account deletion initiated. You will be logged out.');
      
      // Log out the user
      localStorage.removeItem('karyasiddhi-auth');
      window.location.href = '/login';
    } catch (error: any) {
      console.error('Failed to delete account:', error);
      alert(error.response?.data?.message || 'Failed to delete account. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center">
          <SettingsIcon className="mr-3" size={36} />
          Settings
        </h1>
        <p className="text-gray-400 mt-1">Manage your preferences and account settings</p>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Bell className="mr-2 text-blue-500" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">Push Notifications</h3>
              <p className="text-sm text-gray-400">Receive notifications about goal updates</p>
            </div>
            <button
              onClick={() => toggleSwitch('notifications')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                localSettings.notifications ? 'bg-primary-600' : 'bg-slate-700'
              }`}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full"
                animate={{ left: localSettings.notifications ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">Email Alerts</h3>
              <p className="text-sm text-gray-400">Get email notifications for important updates</p>
            </div>
            <button
              onClick={() => toggleSwitch('emailAlerts')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                localSettings.emailAlerts ? 'bg-primary-600' : 'bg-slate-700'
              }`}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full"
                animate={{ left: localSettings.emailAlerts ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          {localSettings.darkMode ? <Moon className="mr-2 text-purple-500" /> : <Sun className="mr-2 text-yellow-500" />}
          Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">Dark Mode</h3>
              <p className="text-sm text-gray-400">Use dark theme for better viewing</p>
            </div>
            <button
              onClick={() => toggleSwitch('darkMode')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                localSettings.darkMode ? 'bg-primary-600' : 'bg-slate-700'
              }`}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full"
                animate={{ left: localSettings.darkMode ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-white font-semibold mb-3">Language</h3>
            <select className="input-field" value={localSettings.language} onChange={(e) => handleLanguageChange(e.target.value)}>
              <option>English</option>
              <option>हिंदी (Hindi)</option>
              <option>தமிழ் (Tamil)</option>
              <option>తెలుగు (Telugu)</option>
              <option>বাংলা (Bengali)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Shield className="mr-2 text-green-500" />
          Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-400">Add extra security to your account</p>
            </div>
            <button
              onClick={() => toggleSwitch('twoFactor')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                localSettings.twoFactor ? 'bg-green-600' : 'bg-slate-700'
              }`}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full"
                animate={{ left: localSettings.twoFactor ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Change Password</h3>
            <p className="text-sm text-gray-400 mb-4">Update your password regularly for security</p>
            <button onClick={() => setShowChangePasswordModal(true)} className="btn-secondary">Change Password</button>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Database className="mr-2 text-yellow-500" />
          Data & Privacy
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <h3 className="text-white font-semibold">Offline Mode</h3>
              <p className="text-sm text-gray-400">Work offline and sync when connected</p>
            </div>
            <button
              onClick={() => toggleSwitch('offlineMode')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                localSettings.offlineMode ? 'bg-primary-600' : 'bg-slate-700'
              }`}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 bg-white rounded-full"
                animate={{ left: localSettings.offlineMode ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Data Export</h3>
            <p className="text-sm text-gray-400 mb-4">Download all your data in JSON format</p>
            <button 
              onClick={handleExportData} 
              disabled={exportLoading}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exportLoading ? 'Exporting...' : 'Export Data'}
            </button>
          </div>

          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">Delete Account</h3>
            <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all data</p>
            <button 
              onClick={handleDeleteAccount} 
              disabled={deleteLoading}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white rounded-lg transition-all"
            >
              {deleteLoading ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Globe className="mr-2 text-blue-500" />
          System Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-gray-400">Version</p>
            <p className="text-white font-semibold">1.0.0</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-gray-400">Server Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-white font-semibold">Online</p>
            </div>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-gray-400">Last Sync</p>
            <p className="text-white font-semibold">Just now</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-gray-400">Storage Used</p>
            <p className="text-white font-semibold">2.4 GB / 10 GB</p>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                <input
                  type="password"
                  value={changePasswordData.currentPassword}
                  onChange={(e) => setChangePasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="input-field"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  value={changePasswordData.newPassword}
                  onChange={(e) => setChangePasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="input-field"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={changePasswordData.confirmPassword}
                  onChange={(e) => setChangePasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="input-field"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 disabled:cursor-not-allowed text-white rounded-lg transition-all"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
