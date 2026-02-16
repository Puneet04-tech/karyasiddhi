import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

interface Achievement {
  id: number;
  title: string;
  icon: string;
  color: string;
  earnedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  aadhaar?: string;
  avatar?: string;
  designation?: string;
  phone?: string;
  goals?: any[];
  aadhaarVerified?: boolean;
  digilockerVerified?: boolean;
  achievements?: Achievement[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Normalize inputs to avoid accidental whitespace/case issues from the UI
        const normalizedEmail = (email || '').trim().toLowerCase();
        const normalizedPassword = (password || '').trim();
        try {
          console.debug('Attempting login with:', { email: normalizedEmail });
          const response = await api.post('/auth/login', { email: normalizedEmail, password: normalizedPassword });
          console.debug('Login response:', response.data);
          const { access_token, user } = response.data;
          
          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              department: user.department?.name || 'N/A',
              role: user.role,
              designation: user.designation,
              aadhaar: user.aadhaar,
              aadhaarVerified: user.aadhaarVerified || false,
              digilockerVerified: user.digilockerVerified || false,
              avatar: user.avatar,
              phone: user.phone,
              achievements: user.achievements,
            },
            token: access_token,
            isAuthenticated: true,
          });
        } catch (error: any) {
          // Log detailed info to help debugging in production builds
          console.error('Login failed:', error?.response?.status, error?.response?.data || error?.message || error);
          const serverMessage = error?.response?.data?.message || error?.message || 'Invalid credentials';
          throw new Error(serverMessage);
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      
      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'karyasiddhi-auth',
    }
  )
);
