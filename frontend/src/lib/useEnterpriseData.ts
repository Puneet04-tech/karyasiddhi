import { useState, useEffect } from 'react';
import {
  fetchAIMentorData,
  fetchEmpathyEngineData,
  fetchBlockchainKarmaData,
  fetchBharatNetData,
  fetchCarnivalData,
  fetchGovVerseData,
  fetchDigitalMirrorData,
  fetchDigitalTwinData,
  fetchARVRTrainingData,
  fetchMoodAdaptiveData,
  fetchDNAGovernanceData,
  fetchPrecognitionData,
  fetchZeroKnowledgeData,
  fetchEcosystemData,
  fetchGamificationData,
  fetchLaboratoryData,
  fetchTidalWaveData,
  fetchDeepfakeData,
  fetchAlgorithmicJusticeData,
  fetchQuantumManagementData,
} from './featureDataApi';

type FeatureDataFetcher = (userId?: string) => Promise<any>;

const featureFetchers: { [key: string]: FeatureDataFetcher } = {
  'ai-mentor': fetchAIMentorData,
  'empathy-engine': fetchEmpathyEngineData,
  'blockchain-karma': fetchBlockchainKarmaData,
  'bharatnet': fetchBharatNetData,
  'carnival': fetchCarnivalData,
  'govverse': fetchGovVerseData,
  'digital-mirror': fetchDigitalMirrorData,
  'digital-twin': fetchDigitalTwinData,
  'ar-vr-training': fetchARVRTrainingData,
  'mood-ui': fetchMoodAdaptiveData,
  'dna-governance': fetchDNAGovernanceData,
  'precognition': fetchPrecognitionData,
  'zero-knowledge': fetchZeroKnowledgeData,
  'ecosystem': fetchEcosystemData,
  'gamification': fetchGamificationData,
  'laboratory': fetchLaboratoryData,
  'tidal-wave': fetchTidalWaveData,
  'deepfake': fetchDeepfakeData,
  'algorithmic-justice': fetchAlgorithmicJusticeData,
  'quantum': fetchQuantumManagementData,
};

/**
 * Custom Hook for fetching enterprise feature data
 * @param featureKey - Key of the enterprise feature (e.g., 'ai-mentor', 'empathy-engine')
 * @param userId - Optional user ID (uses current user if not provided)
 */
export const useEnterpriseData = (featureKey: string, userId?: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetcher = featureFetchers[featureKey];
        
        if (!fetcher) {
          throw new Error(`Unknown feature: ${featureKey}`);
        }
        
        const result = await fetcher(userId);
        
        if (!result || (typeof result === 'object' && Object.keys(result).length === 0)) {
          console.warn(`Empty data returned for ${featureKey}, using fallback values`);
          setData({ _isDefaultData: true });
        } else {
          setData(result);
        }
        setError(null);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch enterprise data';
        console.error(`Error fetching ${featureKey}:`, err);
        setError(errorMsg);
        // Still set some data so component shows with fallbacks
        setData({ _isDefaultData: true, _error: errorMsg });
      } finally {
        setLoading(false);
      }
    };

    if (userId || featureKey) {
      fetchData();
      // Refresh every 30 seconds for real-time updates
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [featureKey, userId]);

  return { data, loading, error };
};
