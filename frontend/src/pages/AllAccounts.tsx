import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { Users, Search, Edit, Eye, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId?: string;
  designation?: string;
  department?: any;
  role: string;
  avatar?: string;
}

const AllAccounts = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Check if user is manager
  const isManager = user?.role === 'Department Head' || user?.role === 'Director' || 
                    user?.role === 'Additional Secretary' || user?.role === 'Joint Secretary';

  useEffect(() => {
    if (!isManager) {
      navigate('/');
      return;
    }
    fetchEmployees();
  }, [isManager, navigate]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      const employeeData = Array.isArray(response.data) ? response.data : [];
      setEmployees(employeeData);
      setFilteredEmployees(employeeData);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      alert('Failed to load employees. Please try again.');
      setEmployees([]);
      setFilteredEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = employees.filter(emp => {
      const searchLower = searchTerm.toLowerCase();
      return (
        emp.name?.toLowerCase().includes(searchLower) ||
        emp.email?.toLowerCase().includes(searchLower) ||
        emp.employeeId?.toLowerCase().includes(searchLower) ||
        emp.designation?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const handleEditEmployee = (employeeId: string) => {
    navigate(`/manage-employee/${employeeId}`);
  };

  if (!isManager) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="text-primary-400" />
            All Accounts
          </h1>
          <p className="text-gray-400 mt-2">Manage employee goals and KPIs</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, employee ID, or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Employee List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="text-gray-400 mt-4">Loading employees...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card p-6 hover:shadow-lg hover:shadow-primary-500/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">
                    {employee.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{employee.name || 'Unknown'}</h3>
                    <p className="text-sm text-gray-400">{employee.designation || 'No designation'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-gray-500 w-24">Email:</span>
                  <span className="truncate">{employee.email || 'N/A'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-gray-500 w-24">Emp ID:</span>
                  <span>{employee.employeeId || 'N/A'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-gray-500 w-24">Department:</span>
                  <span className="truncate">{employee.department?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-gray-500 w-24">Role:</span>
                  <span className="truncate">{employee.role || 'N/A'}</span>
                </div>
              </div>

              <button
                onClick={() => handleEditEmployee(employee.id)}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Edit size={18} />
                Manage Goals & KPIs
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {filteredEmployees.length === 0 && !loading && (
        <div className="text-center py-12 card">
          <Users className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-400">No employees found</p>
        </div>
      )}
    </div>
  );
};

export default AllAccounts;
