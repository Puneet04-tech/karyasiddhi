-- ============================================
-- Seed Data for Enterprise Solutions Features
-- This adds sample data for testing
-- ============================================

-- Get a test user ID (using first user)
DO $$
DECLARE
  test_user_id UUID;
BEGIN
  SELECT id INTO test_user_id FROM users LIMIT 1;
  
  -- AI MENTOR SEED DATA
  INSERT INTO enterprise_ai_mentor (user_id, mentor_level, mentoring_points, recent_recommendations, performance_insights)
  VALUES (
    test_user_id,
    3,
    250,
    ARRAY['Improve presentation skills', 'Develop strategic thinking', 'Practice delegation'],
    '{"score": 78, "trend": "up", "insights": "Strong communication skills"}'::jsonb
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- EMPATHY ENGINE SEED DATA
  INSERT INTO enterprise_empathy_engine (user_id, empathy_score, emotional_state, stress_level, well_being_index)
  VALUES (
    test_user_id,
    8.2,
    'balanced',
    35,
    7.8
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- BLOCKCHAIN KARMA SEED DATA
  INSERT INTO enterprise_blockchain_karma (user_id, karma_score, reputation_level, badges, achievements)
  VALUES (
    test_user_id,
    850,
    'Gold',
    ARRAY['team-player', 'innovator', 'mentor'],
    ARRAY['5-star reviewer', 'community-leader']
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- BHARATNET SEED DATA
  INSERT INTO enterprise_bharatnet (user_id, citizen_feedback_count, feedback_sentiment_score, service_quality_rating)
  VALUES (
    test_user_id,
    234,
    8.6,
    8.9
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- CARNIVAL OF PRODUCTIVITY SEED DATA
  INSERT INTO enterprise_carnival (user_id, points, level, current_streak, leaderboard_rank)
  VALUES (
    test_user_id,
    5420,
    12,
    15,
    8
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- GOVVERSE SEED DATA
  INSERT INTO enterprise_govverse (user_id, avatar_name, avatar_level, virtual_office_score)
  VALUES (
    test_user_id,
    'Digital Citizen',
    7,
    415
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- DIGITAL MIRROR SEED DATA
  INSERT INTO enterprise_digital_mirror (user_id, self_awareness_score, reflection_depth, goal_alignment_score)
  VALUES (
    test_user_id,
    8.1,
    4,
    7.8
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- DIGITAL TWIN SEED DATA
  INSERT INTO enterprise_digital_twin (user_id, simulation_score, virtual_team_size, processes_simulated)
  VALUES (
    test_user_id,
    278,
    8,
    12
  )
  ON CONFLICT DO NOTHING;

  -- AR/VR TRAINING SEED DATA
  INSERT INTO enterprise_ar_vr_training (user_id, training_modules_completed, vr_competency_score, certifications_earned)
  VALUES (
    test_user_id,
    14,
    8.3,
    ARRAY['VR Leadership', 'Digital Citizenship']
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- MOOD ADAPTIVE UI SEED DATA
  INSERT INTO enterprise_mood_adaptive_ui (user_id, current_mood, mood_confidence_score, energy_level)
  VALUES (
    test_user_id,
    'energized',
    8.5,
    78
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- DNA GOVERNANCE SEED DATA
  INSERT INTO enterprise_dna_governance (user_id, genetic_fitness_score, evolved_strategies, optimization_generation)
  VALUES (
    test_user_id,
    8.4,
    ARRAY['Adaptive planning', 'Dynamic resource allocation'],
    12
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- PRECOGNITION ENGINE SEED DATA
  INSERT INTO enterprise_precognition_engine (user_id, prediction_accuracy, forecast_score, predictions_made)
  VALUES (
    test_user_id,
    0.82,
    8.2,
    89
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- ZERO KNOWLEDGE GOVERNANCE SEED DATA
  INSERT INTO enterprise_zero_knowledge (user_id, privacy_score, zero_knowledge_proofs_generated)
  VALUES (
    test_user_id,
    9.2,
    42
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- ECOSYSTEM INTELLIGENCE SEED DATA
  INSERT INTO enterprise_ecosystem_intelligence (user_id, ecosystem_health_score, resource_flow_efficiency)
  VALUES (
    test_user_id,
    8.1,
    0.83
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- GAMIFICATION SEED DATA
  INSERT INTO enterprise_gamification (user_id, experience_points, level, achievements, leaderboard_rank)
  VALUES (
    test_user_id,
    8420,
    15,
    ARRAY['First achievement', 'Consistency champion'],
    7
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- LABORATORY OF GOVERNANCE SEED DATA
  INSERT INTO enterprise_laboratory_governance (user_id, experiments_conducted, tests_completed, hypothesis_validation_rate)
  VALUES (
    test_user_id,
    8,
    34,
    0.79
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- TIDAL WAVE ANALYTICS SEED DATA
  INSERT INTO enterprise_tidal_wave_analytics (user_id, wave_prediction_score, trend_sensitivity, surge_alerts)
  VALUES (
    test_user_id,
    8.5,
    8.2,
    2
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- DEEPFAKE DETECTION SEED DATA
  INSERT INTO enterprise_deepfake_detection (user_id, detection_accuracy, authenticity_verification_score, threats_detected)
  VALUES (
    test_user_id,
    0.94,
    8.7,
    3
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- ALGORITHMIC JUSTICE SEED DATA
  INSERT INTO enterprise_algorithmic_justice (user_id, fairness_score, bias_detection_count, transparency_rating)
  VALUES (
    test_user_id,
    8.6,
    2,
    8.8
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- QUANTUM MANAGEMENT SEED DATA
  INSERT INTO enterprise_quantum_management (user_id, superposition_decisions, quantum_entanglement_score, decision_coherence)
  VALUES (
    test_user_id,
    12,
    7.9,
    8.1
  )
  ON CONFLICT (user_id) DO NOTHING;

  RAISE NOTICE 'Seed data created for user: %', test_user_id;
END $$;
