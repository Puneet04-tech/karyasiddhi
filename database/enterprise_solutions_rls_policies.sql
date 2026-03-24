-- ============================================================================
-- Row Level Security (RLS) Policies for Enterprise Solutions Tables
-- Run this in Supabase SQL Editor to enable data isolation
-- ============================================================================

-- Enable RLS on all enterprise tables
ALTER TABLE enterprise_ai_mentor ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_empathy_engine ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_blockchain_karma ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_bharatnet ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_carnival ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_govverse ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_digital_mirror ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_digital_twin ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_ar_vr_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_mood_adaptive_ui ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_dna_governance ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_precognition_engine ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_zero_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_ecosystem_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_laboratory_governance ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_tidal_wave_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_deepfake_detection ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_algorithmic_justice ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_quantum_management ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_manager_dashboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_team_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_department_stats ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- AI MENTOR - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own AI Mentor data"
  ON enterprise_ai_mentor
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own AI Mentor data"
  ON enterprise_ai_mentor
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- EMPATHY ENGINE - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Empathy Engine data"
  ON enterprise_empathy_engine
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Empathy Engine data"
  ON enterprise_empathy_engine
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- BLOCKCHAIN KARMA - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Blockchain Karma data"
  ON enterprise_blockchain_karma
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Blockchain Karma data"
  ON enterprise_blockchain_karma
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- BHARATNET - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own BharatNet data"
  ON enterprise_bharatnet
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own BharatNet data"
  ON enterprise_bharatnet
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- CARNIVAL - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Carnival data"
  ON enterprise_carnival
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Carnival data"
  ON enterprise_carnival
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- GOVVERSE - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own GovVerse data"
  ON enterprise_govverse
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own GovVerse data"
  ON enterprise_govverse
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- DIGITAL MIRROR - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Digital Mirror data"
  ON enterprise_digital_mirror
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Digital Mirror data"
  ON enterprise_digital_mirror
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- DIGITAL TWIN - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Digital Twin data"
  ON enterprise_digital_twin
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Digital Twin data"
  ON enterprise_digital_twin
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- AR/VR TRAINING - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own AR/VR Training data"
  ON enterprise_ar_vr_training
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own AR/VR Training data"
  ON enterprise_ar_vr_training
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- MOOD-ADAPTIVE UI - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Mood-Adaptive UI data"
  ON enterprise_mood_adaptive_ui
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Mood-Adaptive UI data"
  ON enterprise_mood_adaptive_ui
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- DNA GOVERNANCE - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own DNA Governance data"
  ON enterprise_dna_governance
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own DNA Governance data"
  ON enterprise_dna_governance
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- PRECOGNITION ENGINE - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Precognition Engine data"
  ON enterprise_precognition_engine
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Precognition Engine data"
  ON enterprise_precognition_engine
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- ZERO KNOWLEDGE PROOF - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Zero Knowledge Proof data"
  ON enterprise_zero_knowledge
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Zero Knowledge Proof data"
  ON enterprise_zero_knowledge
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- ECOSYSTEM INTELLIGENCE - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Ecosystem Intelligence data"
  ON enterprise_ecosystem_intelligence
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Ecosystem Intelligence data"
  ON enterprise_ecosystem_intelligence
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- GAMIFICATION - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Gamification data"
  ON enterprise_gamification
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Gamification data"
  ON enterprise_gamification
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- LABORATORY GOVERNANCE - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Laboratory Governance data"
  ON enterprise_laboratory_governance
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Laboratory Governance data"
  ON enterprise_laboratory_governance
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- TIDAL WAVE ANALYTICS - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Tidal Wave Analytics data"
  ON enterprise_tidal_wave_analytics
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Tidal Wave Analytics data"
  ON enterprise_tidal_wave_analytics
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- DEEPFAKE DETECTION - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Deepfake Detection data"
  ON enterprise_deepfake_detection
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Deepfake Detection data"
  ON enterprise_deepfake_detection
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- ALGORITHMIC JUSTICE - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Algorithmic Justice data"
  ON enterprise_algorithmic_justice
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Algorithmic Justice data"
  ON enterprise_algorithmic_justice
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- QUANTUM MANAGEMENT - RLS Policies
-- ============================================================================
CREATE POLICY "Users can view own Quantum Management data"
  ON enterprise_quantum_management
  FOR SELECT
  USING (auth.uid()::text = user_id OR 
         auth.uid()::text IN (SELECT user_id FROM users WHERE role = 'Department Head'));

CREATE POLICY "Users can update own Quantum Management data"
  ON enterprise_quantum_management
  FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- ============================================================================
-- MANAGER DASHBOARD - RLS Policies
-- ============================================================================
CREATE POLICY "Managers can view their team Dashboard data"
  ON enterprise_manager_dashboard
  FOR SELECT
  USING (auth.uid()::text = manager_id);

CREATE POLICY "Managers can update their Dashboard data"
  ON enterprise_manager_dashboard
  FOR UPDATE
  USING (auth.uid()::text = manager_id)
  WITH CHECK (auth.uid()::text = manager_id);

-- ============================================================================
-- TEAM METRICS - RLS Policies
-- ============================================================================
CREATE POLICY "Managers can view their Team Metrics"
  ON enterprise_team_metrics
  FOR SELECT
  USING (auth.uid()::text = manager_id);

CREATE POLICY "Managers can update their Team Metrics"
  ON enterprise_team_metrics
  FOR UPDATE
  USING (auth.uid()::text = manager_id)
  WITH CHECK (auth.uid()::text = manager_id);

-- ============================================================================
-- DEPARTMENT STATS - RLS Policies
-- ============================================================================
CREATE POLICY "Department heads can view department stats"
  ON enterprise_department_stats
  FOR SELECT
  USING (auth.uid()::text IN (
    SELECT u.user_id FROM users u 
    WHERE u.role = 'Department Head' 
    AND u.department_id = enterprise_department_stats.department_id
  ));

CREATE POLICY "Department heads can update department stats"
  ON enterprise_department_stats
  FOR UPDATE
  USING (auth.uid()::text IN (
    SELECT u.user_id FROM users u 
    WHERE u.role = 'Department Head' 
    AND u.department_id = enterprise_department_stats.department_id
  ))
  WITH CHECK (auth.uid()::text IN (
    SELECT u.user_id FROM users u 
    WHERE u.role = 'Department Head' 
    AND u.department_id = enterprise_department_stats.department_id
  ));
