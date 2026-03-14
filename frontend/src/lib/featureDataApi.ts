import api from './api';

/**
 * Feature-Specific Data Fetching API
 * Each Enterprise Solutions feature has its own data structure and endpoints
 */

// ============= AI MENTOR =============
export const fetchAIMentorData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/ai-mentor', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching AI Mentor data:', error);
    return null;
  }
};

// ============= EMPATHY ENGINE =============
export const fetchEmpathyEngineData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/empathy-engine', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Empathy Engine data:', error);
    return null;
  }
};

// ============= BLOCKCHAIN KARMA =============
export const fetchBlockchainKarmaData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/blockchain-karma', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Blockchain Karma data:', error);
    return null;
  }
};

// ============= BHARATNET INTEGRATION =============
export const fetchBharatNetData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/bharatnet', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching BharatNet data:', error);
    return null;
  }
};

// ============= CARNIVAL OF PRODUCTIVITY =============
export const fetchCarnivalData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/carnival', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Carnival data:', error);
    return null;
  }
};

// ============= GOVVERSE =============
export const fetchGovVerseData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/govverse', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching GovVerse data:', error);
    return null;
  }
};

// ============= DIGITAL MIRROR =============
export const fetchDigitalMirrorData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/digital-mirror', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Digital Mirror data:', error);
    return null;
  }
};

// ============= DIGITAL TWIN SIMULATION =============
export const fetchDigitalTwinData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/digital-twin', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Digital Twin data:', error);
    return null;
  }
};

// ============= AR/VR TRAINING =============
export const fetchARVRTrainingData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/ar-vr-training', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching AR/VR Training data:', error);
    return null;
  }
};

// ============= MOOD ADAPTIVE UI =============
export const fetchMoodAdaptiveData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/mood-adaptive-ui', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Mood Adaptive UI data:', error);
    return null;
  }
};

// ============= DNA GOVERNANCE =============
export const fetchDNAGovernanceData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/dna-governance', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching DNA Governance data:', error);
    return null;
  }
};

// ============= PRECOGNITION ENGINE =============
export const fetchPrecognitionData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/precognition-engine', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Precognition Engine data:', error);
    return null;
  }
};

// ============= ZERO KNOWLEDGE GOVERNANCE =============
export const fetchZeroKnowledgeData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/zero-knowledge', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Zero Knowledge Governance data:', error);
    return null;
  }
};

// ============= ECOSYSTEM INTELLIGENCE =============
export const fetchEcosystemData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/ecosystem-intelligence', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Ecosystem Intelligence data:', error);
    return null;
  }
};

// ============= ENHANCED GAMIFICATION =============
export const fetchGamificationData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/gamification', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Gamification data:', error);
    return null;
  }
};

// ============= LABORATORY OF GOVERNANCE =============
export const fetchLaboratoryData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/laboratory-governance', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Laboratory data:', error);
    return null;
  }
};

// ============= TIDAL WAVE ANALYTICS =============
export const fetchTidalWaveData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/tidal-wave-analytics', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Tidal Wave Analytics data:', error);
    return null;
  }
};

// ============= DEEPFAKE DETECTION =============
export const fetchDeepfakeData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/deepfake-detection', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Deepfake Detection data:', error);
    return null;
  }
};

// ============= ALGORITHMIC JUSTICE =============
export const fetchAlgorithmicJusticeData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/algorithmic-justice', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Algorithmic Justice data:', error);
    return null;
  }
};

// ============= QUANTUM MANAGEMENT =============
export const fetchQuantumManagementData = async (userId?: string) => {
  try {
    const response = await api.get('/enterprise/quantum-management', {
      params: userId ? { userId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Quantum Management data:', error);
    return null;
  }
};

// ============= MANAGER-SPECIFIC DATA =============
export const fetchManagerDashboardData = async (managerId?: string) => {
  try {
    const response = await api.get('/enterprise/manager/dashboard', {
      params: managerId ? { managerId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching manager dashboard data:', error);
    return null;
  }
};

export const fetchTeamEnterpriseMetrics = async (managerId?: string) => {
  try {
    const response = await api.get('/enterprise/manager/team-metrics', {
      params: managerId ? { managerId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching team enterprise metrics:', error);
    return null;
  }
};

export const fetchDepartmentEnterpriseStats = async (departmentId?: string) => {
  try {
    const response = await api.get('/enterprise/manager/department-stats', {
      params: departmentId ? { departmentId } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching department enterprise stats:', error);
    return null;
  }
};
