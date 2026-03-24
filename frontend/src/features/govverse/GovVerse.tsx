import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRealTimeAnalytics, useRealTimeAllUsers } from '../../lib/useRealTimeData';
import { 
  Globe, Users, Video, MessageSquare, Monitor, Headphones, 
  Camera, Mic, MicOff, VideoOff, Settings, Zap, Eye,
  Building2, MapPin, Calendar, Clock, Award, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VirtualOffice {
  id: string;
  name: string;
  type: 'meeting_room' | 'collaboration_space' | 'training_center' | 'citizen_service' | 'auditorium';
  capacity: number;
  currentOccupants: number;
  isActive: boolean;
  description: string;
  features: string[];
}

interface VirtualMeeting {
  id: string;
  title: string;
  type: 'team_meeting' | 'citizen_interaction' | 'training' | 'presentation';
  startTime: Date;
  endTime: Date;
  participants: string[];
  isVirtual: boolean;
  room: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

interface Avatar {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarUrl: string;
  isOnline: boolean;
  currentLocation: string;
  mood: 'focused' | 'collaborative' | 'creative' | 'analytical';
}

interface MetaverseStats {
  totalUsers: number;
  activeMeetings: number;
  virtualOffices: number;
  citizenInteractions: number;
  trainingSessions: number;
  satisfactionRate: number;
  timeSaved: number;
}

const GovVerse = () => {
  const { user } = useAuthStore();
  const { data: analyticsData } = useRealTimeAnalytics(user?.id);
  const { data: allUsersData } = useRealTimeAllUsers();

  const [selectedOffice, setSelectedOffice] = useState<VirtualOffice | null>(null);
  const [virtualOffices, setVirtualOffices] = useState<VirtualOffice[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<VirtualMeeting[]>([]);
  const [onlineAvatars, setOnlineAvatars] = useState<Avatar[]>([]);
  const [isInVR, setIsInVR] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<VirtualMeeting | null>(null);
  const [stats, setStats] = useState<MetaverseStats>({
    totalUsers: 1247,
    activeMeetings: 23,
    virtualOffices: 15,
    citizenInteractions: 892,
    trainingSessions: 45,
    satisfactionRate: 94,
    timeSaved: 127
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (analyticsData && allUsersData) {
      const data = Array.isArray(analyticsData) ? analyticsData[0] : analyticsData;
      
      const offices: VirtualOffice[] = [
        {
          id: '1',
          name: 'Main Collaboration Hub',
          type: 'collaboration_space',
          capacity: Math.floor((data?.team_size || 5) * 30),
          currentOccupants: Math.floor((data?.team_size || 5) * 15),
          isActive: true,
          description: 'Primary collaboration space',
          features: ['Video conf', 'Whiteboard', 'Document sharing']
        },
        {
          id: '2',
          name: 'Training Center',
          type: 'training_center',
          capacity: 200,
          currentOccupants: Math.floor((data?.performance_score || 0.75) * 100),
          isActive: true,
          description: 'Virtual training facility',
          features: ['VR modules', 'AR simulations', 'Records']
        }
      ];
      
      setVirtualOffices(offices);
      if (offices.length > 0) setSelectedOffice(offices[0]);
      
      const meetings: VirtualMeeting[] = [
        {
          id: '1',
          title: 'Team Sync',
          type: 'team_meeting',
          startTime: new Date(),
          endTime: new Date(Date.now() + 60 * 60 * 1000),
          participants: Array.from({ length: Math.floor((data?.team_size || 5) * 3) }, (_, i) => `User ${i + 1}`),
          isVirtual: true,
          room: 'Main Hub',
          status: 'in_progress'
        }
      ];
      
      setUpcomingMeetings(meetings);
      
      const avatars: Avatar[] = Array.isArray(allUsersData)
        ? allUsersData.slice(0, 5).map((_, i) => ({
            id: (i + 1).toString(),
            name: `User ${i + 1}`,
            role: 'Officer',
            department: 'Department ' + String.fromCharCode(65 + i),
            avatarUrl: '',
            isOnline: true,
            currentLocation: 'Main Hub',
            mood: ['focused', 'collaborative', 'creative', 'analytical'][i % 4] as any
          }))
        : [];
      
      setOnlineAvatars(avatars);
      
      const metaStats: MetaverseStats = {
        totalUsers: Array.isArray(allUsersData) ? allUsersData.length * 5 : 1247,
        activeMeetings: Math.floor((data?.performance_score || 0.75) * 50),
        virtualOffices: 15,
        citizenInteractions: Math.floor((data?.avg_kpi || 0.75) * 1200),
        trainingSessions: Math.floor((data?.performance_score || 0.75) * 60),
        satisfactionRate: Math.round((data?.avg_kpi || 0.75) * 100),
        timeSaved: Math.floor((data?.performance_score || 0.75) * 200)
      };
      
      setStats(metaStats);
    }
  }, [analyticsData, allUsersData]);

  const handleStartMeeting = async (office: VirtualOffice) => {
    const offices: VirtualOffice[] = [
      {
        id: '1',
        name: 'Prime Minister Office',
        type: 'meeting_room',
        capacity: 50,
        currentOccupants: 12,
        isActive: true,
        description: 'High-level strategic meetings and policy discussions',
        features: ['3D Presentation', 'Real-time Translation', 'Secure Voting', 'Document Sharing']
      },
      {
        id: '2',
        name: 'Citizen Service Hall',
        type: 'citizen_service',
        capacity: 200,
        currentOccupants: 45,
        isActive: true,
        description: 'Virtual citizen services and grievance redressal',
        features: ['Queue Management', 'Multi-language Support', 'Digital Signatures', 'AI Assistant']
      },
      {
        id: '3',
        name: 'Department Collaboration Hub',
        type: 'collaboration_space',
        capacity: 100,
        currentOccupants: 67,
        isActive: true,
        description: 'Inter-departmental collaboration and innovation',
        features: ['Virtual Whiteboards', '3D Models', 'Brainstorming Tools', 'Project Management']
      },
      {
        id: '4',
        name: 'Training Academy',
        type: 'training_center',
        capacity: 75,
        currentOccupants: 28,
        isActive: true,
        description: 'Immersive training and skill development',
        features: ['VR Simulations', 'Interactive Learning', 'Assessment Tools', 'Progress Tracking']
      },
      {
        id: '5',
        name: 'National Auditorium',
        type: 'auditorium',
        capacity: 500,
        currentOccupants: 234,
        isActive: true,
        description: 'Large-scale presentations and announcements',
        features: ['Live Streaming', 'Q&A Sessions', 'Polling System', 'Recording']
      }
    ];

    setVirtualOffices(offices);
  };

  const generateUpcomingMeetings = () => {
    const meetings: VirtualMeeting[] = [
      {
        id: '1',
        title: 'Digital India Strategy Meeting',
        type: 'team_meeting',
        startTime: new Date(Date.now() + 30 * 60 * 1000),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        participants: ['Arun Singh', 'Priya Sharma', 'Rajesh Kumar', 'Amit Patel'],
        isVirtual: true,
        room: 'Prime Minister Office',
        status: 'scheduled'
      },
      {
        id: '2',
        title: 'Citizen Grievance Session',
        type: 'citizen_interaction',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
        participants: ['Officer Team', '50+ Citizens'],
        isVirtual: true,
        room: 'Citizen Service Hall',
        status: 'scheduled'
      },
      {
        id: '3',
        title: 'AI Training Workshop',
        type: 'training',
        startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
        participants: ['All Department Heads'],
        isVirtual: true,
        room: 'Training Academy',
        status: 'scheduled'
      }
    ];

    setUpcomingMeetings(meetings);
  };

  const generateOnlineAvatars = () => {
    const avatars: Avatar[] = [
      {
        id: '1',
        name: 'Arun Singh',
        role: 'Department Head',
        department: 'IT',
        avatarUrl: '/avatars/arun.png',
        isOnline: true,
        currentLocation: 'Prime Minister Office',
        mood: 'focused'
      },
      {
        id: '2',
        name: 'Priya Sharma',
        role: 'Senior Officer',
        department: 'Revenue',
        avatarUrl: '/avatars/priya.png',
        isOnline: true,
        currentLocation: 'Citizen Service Hall',
        mood: 'collaborative'
      },
      {
        id: '3',
        name: 'Rajesh Kumar',
        role: 'Team Lead',
        department: 'Health',
        avatarUrl: '/avatars/rajesh.png',
        isOnline: true,
        currentLocation: 'Training Academy',
        mood: 'analytical'
      },
      {
        id: '4',
        name: 'Amit Patel',
        role: 'Officer',
        department: 'Transport',
        avatarUrl: '/avatars/amit.png',
        isOnline: false,
        currentLocation: 'Offline',
        mood: 'creative'
      }
    ];

    setOnlineAvatars(avatars);
  };

  const updateMetaverseStats = () => {
    setStats(prev => ({
      ...prev,
      activeMeetings: Math.max(15, prev.activeMeetings + Math.floor(Math.random() * 10) - 5),
      citizenInteractions: prev.citizenInteractions + Math.floor(Math.random() * 20) + 5,
      timeSaved: prev.timeSaved + Math.floor(Math.random() * 10) + 2
    }));
  };

  const enterVirtualOffice = (office: VirtualOffice) => {
    setSelectedOffice(office);
    setIsInVR(true);
  };

  const joinMeeting = (meeting: VirtualMeeting) => {
    setCurrentMeeting(meeting);
    setIsInVR(true);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (videoRef.current) {
      if (isCameraOn) {
        videoRef.current.srcObject = null;
      } else {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(stream => {
            videoRef.current!.srcObject = stream;
          })
          .catch(err => console.error('Camera access denied:', err));
      }
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const getOfficeIcon = (type: VirtualOffice['type']) => {
    switch (type) {
      case 'meeting_room': return Monitor;
      case 'collaboration_space': return Users;
      case 'training_center': return Award;
      case 'citizen_service': return MessageSquare;
      case 'auditorium': return Globe;
      default: return Building2;
    }
  };

  const getMoodColor = (mood: Avatar['mood']) => {
    switch (mood) {
      case 'focused': return 'bg-blue-500';
      case 'collaborative': return 'bg-green-500';
      case 'creative': return 'bg-purple-500';
      case 'analytical': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const meetingData = [
    { time: '9AM', meetings: 5, participants: 45 },
    { time: '11AM', meetings: 8, participants: 78 },
    { time: '1PM', meetings: 12, participants: 124 },
    { time: '3PM', meetings: 15, participants: 167 },
    { time: '5PM', meetings: 7, participants: 89 }
  ];

  const officeUsage = [
    { name: 'Meeting Rooms', usage: 78, color: '#3b82f6' },
    { name: 'Collaboration Spaces', usage: 92, color: '#10b981' },
    { name: 'Training Centers', usage: 65, color: '#f59e0b' },
    { name: 'Citizen Services', usage: 88, color: '#ef4444' },
    { name: 'Auditoriums', usage: 45, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl box-shadow-glow">
            <Globe className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">GovVerse</h1>
            <p className="text-gray-400">Virtual Government Metaverse</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
            isInVR ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            <Eye className="w-4 h-4" />
            <span className="font-semibold">{isInVR ? 'In VR' : 'Ready'}</span>
          </div>
          <button
            onClick={() => setIsInVR(!isInVR)}
            className="btn-primary"
          >
            {isInVR ? 'Exit VR' : 'Enter VR'}
          </button>
        </div>
      </div>

      {/* Metaverse Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{stats.activeMeetings}</div>
              <p className="text-sm text-gray-400">Active Meetings</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">{stats.virtualOffices}</div>
              <p className="text-sm text-gray-400">Virtual Offices</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">{stats.timeSaved}h</div>
              <p className="text-sm text-gray-400">Time Saved</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Virtual Offices Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-indigo-400" />
          Virtual Government Offices
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {virtualOffices.map((office) => {
            const Icon = getOfficeIcon(office.type);
            const occupancyRate = (office.currentOccupants / office.capacity) * 100;
            
            return (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="card p-6 cursor-pointer hover:border-indigo-500/50"
                onClick={() => enterVirtualOffice(office)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      office.isActive ? 'bg-indigo-500/20' : 'bg-gray-500/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        office.isActive ? 'text-indigo-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{office.name}</h3>
                      <p className="text-sm text-gray-400 capitalize">{office.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    office.isActive ? 'bg-green-500' : 'bg-gray-500'
                  } animate-pulse`} />
                </div>

                <p className="text-sm text-gray-300 mb-4">{office.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Occupancy</span>
                    <span className="text-white font-semibold">
                      {office.currentOccupants}/{office.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        occupancyRate > 80 ? 'bg-red-500' :
                        occupancyRate > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {office.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button className="btn-secondary text-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </button>
                  <button className="btn-primary text-sm">
                    <Users className="w-3 h-3 mr-1" />
                    Enter Office
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Meeting Activity */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Meeting Activity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={meetingData}>
              <defs>
                <linearGradient id="meetingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="meetings" stroke="#6366f1" fill="url(#meetingGrad)" />
              <Line type="monotone" dataKey="participants" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Office Usage */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Office Usage</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={officeUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#9aa6b2' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #111827', borderRadius: 8 }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="usage" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-green-400" />
          Upcoming Virtual Meetings
        </h2>
        <div className="space-y-3">
          {upcomingMeetings.map((meeting) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white">{meeting.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      meeting.type === 'team_meeting' ? 'bg-blue-500/20 text-blue-400' :
                      meeting.type === 'citizen_interaction' ? 'bg-green-500/20 text-green-400' :
                      meeting.type === 'training' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {meeting.type.replace('_', ' ')}
                    </span>
                    {meeting.isVirtual && (
                      <span className="px-2 py-1 text-xs bg-indigo-500/20 text-indigo-400 rounded">
                        <Globe className="w-3 h-3 inline mr-1" />
                        Virtual
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meeting.startTime.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {meeting.room}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {meeting.participants.length} participants
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => joinMeeting(meeting)}
                  className="btn-primary"
                >
                  Join Meeting
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Online Avatars */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-400" />
          Online Avatars
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {onlineAvatars.map((avatar) => (
            <motion.div
              key={avatar.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="card p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {avatar.name.charAt(0)}
                    </span>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                    avatar.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  } animate-pulse`} />
                </div>
                <div>
                  <p className="font-semibold text-white">{avatar.name}</p>
                  <p className="text-xs text-gray-400">{avatar.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Department</span>
                  <span className="text-white">{avatar?.department ? (typeof avatar.department === 'object' ? avatar.department.name : avatar.department) : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">{avatar.currentLocation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Mood</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getMoodColor(avatar.mood)}`} />
                    <span className="text-white capitalize">{avatar.mood}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* VR Controls (when in VR) */}
      <AnimatePresence>
        {isInVR && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="card p-4 flex items-center gap-3">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-16 h-16 rounded-lg bg-gray-800"
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={toggleCamera}
                  className={`p-2 rounded-lg ${
                    isCameraOn ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleMic}
                  className={`p-2 rounded-lg ${
                    isMicOn ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button className="p-2 rounded-lg bg-gray-500/20 text-gray-400">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GovVerse;
