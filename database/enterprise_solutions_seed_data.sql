-- ============================================================================
-- Enterprise Solutions Feature - Seed Data
-- Run this in Supabase SQL Editor to populate test data
-- ============================================================================

-- Note: Replace 'USER_ID_HERE' with actual user UUIDs from your users table
-- You can get user UUIDs from: SELECT id, name FROM users;

-- Sample user IDs (replace with actual values)
-- Run this query first to get real UUIDs:
-- SELECT id, email, name FROM users LIMIT 10;

-- ============================================================================
-- AI MENTOR - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_ai_mentor (id, user_id, mentor_level, mentoring_points, recent_recommendations, performance_insights, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'USER_ID_1', 7, 2450, 
   '["Focus on delegation to improve team productivity", "Consider advanced leadership certifications"]'::jsonb,
   '{"communication_effectiveness": 8.5, "decision_making": 7.8, "team_leadership": 8.2}'::jsonb,
   NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 5, 1200,
   '["Develop technical expertise in cloud infrastructure", "Improve cross-team collaboration"]'::jsonb,
   '{"communication_effectiveness": 7.2, "decision_making": 7.5, "team_leadership": 6.8}'::jsonb,
   NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 8, 3100,
   '["Ready for leadership promotion track", "Mentor junior team members"]'::jsonb,
   '{"communication_effectiveness": 9.1, "decision_making": 8.7, "team_leadership": 9.0}'::jsonb,
   NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 4, 800,
   '["Build foundational management skills", "Improve delegation techniques"]'::jsonb,
   '{"communication_effectiveness": 6.8, "decision_making": 6.5, "team_leadership": 6.2}'::jsonb,
   NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 6, 1900,
   '["Enhance strategic thinking capabilities", "Develop executive presence"]'::jsonb,
   '{"communication_effectiveness": 8.0, "decision_making": 7.9, "team_leadership": 7.7}'::jsonb,
   NOW(), NOW());

-- ============================================================================
-- EMPATHY ENGINE - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_empathy_engine (id, user_id, empathy_score, emotional_state, stress_level, well_being_index, team_harmony_score, recent_alerts, wellness_recommendations, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 78, 'neutral', 4, 82, 85,
   '["notification 1"]'::jsonb, '["Take breaks regularly"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 82, 'happy', 2, 88, 90,
   '[]'::jsonb, '["Maintain current wellness routine"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 75, 'stressed', 6, 76, 80,
   '["High stress detected"]'::jsonb, '["Schedule wellness activities"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 80, 'focused', 3, 85, 87,
   '[]'::jsonb, '["Good balance maintained"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 77, 'neutral', 4, 81, 83,
   '["Slight stress increase"]'::jsonb, '["Consider meditation practice"]'::jsonb, NOW(), NOW());

-- ============================================================================
-- BLOCKCHAIN KARMA - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_blockchain_karma (id, user_id, karma_score, reputation_level, badges, achievements, peer_recognition, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 756, 'trusted',
   '["Team Player Level 3", "Innovation Leader Level 2", "Mentor Level 2"]'::jsonb,
   '["Completed 100 days consistency", "Led 5 successful projects", "Mentored 3 junior employees"]'::jsonb,
   45, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 580, 'expert',
   '["Collaborator Level 2", "Problem Solver Level 3"]'::jsonb,
   '["Solved 20 critical issues", "Delivered 8 on-time projects"]'::jsonb,
   32, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 892, 'leader',
   '["Team Player Level 4", "Innovation Leader Level 3", "Mentor Level 3", "Executive Level 2"]'::jsonb,
   '["Led 12 successful projects", "Mentored 8 team members", "Executed strategic initiatives"]'::jsonb,
   67, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 420, 'novice',
   '["Contributor Level 1"]'::jsonb,
   '["Completed first project", "Resolved 5 issues"]'::jsonb,
   15, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 710, 'trusted',
   '["Team Player Level 3", "Innovator Level 2"]'::jsonb,
   '["Completed 50 days consistency", "Led 4 projects", "Mentored 2 employees"]'::jsonb,
   38, NOW(), NOW());

-- ============================================================================
-- BHARATNET INTEGRATION - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_bharatnet (id, user_id, citizen_feedback_count, feedback_sentiment_score, service_quality_rating, public_satisfaction_score, service_availability, response_time_avg, regions_served, recent_feedback_summary, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 1250, 78, 8.5, 82, 99.5, 2.3, 12,
   '["71.2% positive", "20% neutral", "8.8% negative"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 950, 81, 8.8, 85, 99.2, 2.1, 10,
   '["73.5% positive", "18% neutral", "8.5% negative"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 1500, 75, 8.2, 79, 98.8, 2.8, 15,
   '["68% positive", "22% neutral", "10% negative"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 650, 82, 8.9, 87, 99.7, 1.9, 8,
   '["76% positive", "17% neutral", "7% negative"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 1100, 79, 8.6, 83, 99.4, 2.2, 11,
   '["72% positive", "19% neutral", "9% negative"]'::jsonb, NOW(), NOW());

-- ============================================================================
-- CARNIVAL OF PRODUCTIVITY - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_carnival (id, user_id, points, level, current_streak, leaderboard_rank, badges, multipliers, upcoming_challenges, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 5200, 24, 18, 42,
   '{"Consistency Champion": {"level": 3}, "Performance Booster": {"level": 2}}'::jsonb,
   '{"Active Streak": 2.0, "Weekend Warrior": 1.5}'::jsonb,
   '["Challenge 1", "Challenge 2"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 4850, 22, 15, 58,
   '{"Consistency Champion": {"level": 2}, "Fast Executor": {"level": 2}}'::jsonb,
   '{"Active Streak": 1.5}'::jsonb,
   '["Challenge 1"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 7600, 35, 32, 8,
   '{"Consistency Champion": {"level": 4}, "Performance Booster": {"level": 3}, "Champion": {"level": 2}}'::jsonb,
   '{"Active Streak": 3.0, "Weekend Warrior": 2.0}'::jsonb,
   '["Challenge 1", "Challenge 2", "Challenge 3"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 2100, 12, 7, 156,
   '{"Contributor": {"level": 1}}'::jsonb,
   '{"Active Streak": 1.0}'::jsonb,
   '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 4500, 20, 12, 67,
   '{"Consistency Champion": {"level": 2}, "Performance Booster": {"level": 1}}'::jsonb,
   '{"Active Streak": 1.5}'::jsonb,
   '["Challenge 1"]'::jsonb, NOW(), NOW());

-- ============================================================================
-- GOVVERSE - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_govverse (id, user_id, avatar_name, avatar_level, virtual_office_score, metaverse_connections, virtual_presence_status, recent_virtual_events, avatar_customizations, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 'Professional Phoenix', 15, 78,
   '{"Team Members": 8, "Collaborators": 12, "Mentees": 3}'::jsonb, 'active',
   '["Team Standup", "Department Sync"]'::jsonb,
   '{"appearance": "professional", "accessories": ["leadership_badge"]}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 'Digital Innovator', 12, 72,
   '{"Team Members": 6, "Collaborators": 10, "Mentees": 1}'::jsonb, 'active',
   '["Team Meeting"]'::jsonb,
   '{"appearance": "tech_savvy", "accessories": ["tech_badge"]}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 'Executive Avatar', 22, 92,
   '{"Team Members": 15, "Collaborators": 25, "Mentees": 8}'::jsonb, 'active',
   '["Executive Board", "Leadership Council", "Strategic Planning"]'::jsonb,
   '{"appearance": "executive", "accessories": ["leadership_badge", "executive_pin"]}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 'Emerging Talent', 8, 65,
   '{"Team Members": 4, "Collaborators": 5, "Mentees": 0}'::jsonb, 'online',
   '["Onboarding Session"]'::jsonb,
   '{"appearance": "casual", "accessories": []}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 'Strategic Thinker', 18, 85,
   '{"Team Members": 10, "Collaborators": 18, "Mentees": 4}'::jsonb, 'active',
   '["Strategy Session", "Planning Meeting"]'::jsonb,
   '{"appearance": "professional", "accessories": ["strategist_badge"]}'::jsonb, NOW(), NOW());

-- ============================================================================
-- DIGITAL MIRROR - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_digital_mirror (id, user_id, self_awareness_score, goal_alignment_score, action_consistency_score, recent_reflections, behavior_patterns, development_areas, personal_values_alignment, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 82, 88, 75, 12,
   '["Peak productivity 9-11 AM", "Collaborative style", "Detail-oriented"]'::jsonb,
   '["Delegation skills", "Quick decision-making"]'::jsonb,
   '{"integrity": 90, "innovation": 85, "collaboration": 88, "excellence": 92}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 85, 90, 82, 18,
   '["Peak productivity 10 AM-1 PM", "Technical focus", "Quality-driven"]'::jsonb,
   '["Strategic thinking", "People management"]'::jsonb,
   '{"integrity": 92, "innovation": 88, "collaboration": 85, "excellence": 94}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 92, 95, 90, 25,
   '["Early morning focus", "Strategic mindset", "Executive presence"]'::jsonb,
   '["Work-life balance", "Vulnerability"]'::jsonb,
   '{"integrity": 97, "innovation": 95, "collaboration": 92, "excellence": 98}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 72, 78, 68, 8,
   '["Afternoon productivity", "Team player", "Learning-focused"]'::jsonb,
   '["Confidence", "Initiative", "Leadership"]'::jsonb,
   '{"integrity": 85, "innovation": 75, "collaboration": 88, "excellence": 80}'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 80, 87, 78, 15,
   '["Mid-morning focus", "Collaborative", "Process-oriented"]'::jsonb,
   '["Bold decision-making", "Risk-taking"]'::jsonb,
   '{"integrity": 90, "innovation": 82, "collaboration": 90, "excellence": 88}'::jsonb, NOW(), NOW());

-- ============================================================================
-- DIGITAL TWIN - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_digital_twin (id, user_id, simulation_score, virtual_team_size, processes_simulated, efficiency_gain_percent, current_simulations, predicted_outcomes, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 86, 12, 8, 23,
   '["Team Resource Reallocation", "Process Optimization"]'::jsonb,
   '["Hiring impact: +15% productivity", "Remote shift: -5% productivity"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 82, 10, 6, 18,
   '["Workflow Optimization"]'::jsonb,
   '["Tool adoption: +12% efficiency", "Training time: 2 weeks"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 91, 20, 12, 35,
   '["Strategic Restructuring", "Portfolio Rebalancing", "Risk Mitigation"]'::jsonb,
   '["Department merge: +22% efficiency", "New process: +18% capacity"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 75, 8, 4, 12,
   '["Basic Workflow Sim"]'::jsonb,
   '["Process change: +8% efficiency"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 84, 14, 9, 28,
   '["Cross-team Collaboration", "Resource Optimization"]'::jsonb,
   '["Outsourcing: +20% capacity", "Team expansion: +15% output"]'::jsonb, NOW(), NOW());

-- ============================================================================
-- AR/VR TRAINING - Seed Data (5 records)
-- ============================================================================
INSERT INTO enterprise_ar_vr_training (id, user_id, training_modules_completed, vr_competency_score, certifications_earned, progress_percent, active_trainings, next_available_course, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 8, 82,
   '["Advanced Leadership", "Digital Innovation"]'::jsonb, 65,
   '["Strategic Decision Making", "Advanced Analytics"]'::jsonb, 'Executive Communication Skills', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 6, 78,
   '["Technical Excellence"]'::jsonb, 52,
   '["Cloud Architecture"]'::jsonb, 'AI and Machine Learning', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 15, 95,
   '["Executive Leadership", "Strategic Management", "Advanced Analytics", "Innovation Mastery"]'::jsonb, 92,
   '["Executive Presence Coaching"]'::jsonb, 'Global Leadership', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 2, 58,
   '[]'::jsonb, 18,
   '["Fundamentals Course"]'::jsonb, 'Leadership Basics', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 10, 85,
   '["Project Management", "Stakeholder Engagement"]'::jsonb, 72,
   '["Advanced Project Management"]'::jsonb, 'Strategic Planning', NOW(), NOW());

-- ============================================================================
-- CARNIVAL - Additional Gamification Tables
-- For MOOD-ADAPTIVE UI, DNA GOVERNANCE, PRECOGNITION ENGINE (etc)
-- These follow similar patterns
-- ============================================================================

-- Insert 5 more sets of data for remaining features (abbreviated for brevity)

-- MOOD-ADAPTIVE UI
INSERT INTO enterprise_mood_adaptive_ui (id, user_id, current_mood, mood_confidence_score, energy_level, focus_level, recommended_ui_theme, mood_history, adaptive_suggestions, wellness_suggestions, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 'focused', 87, 78, 85, 'concentrated_work', '[]'::jsonb, '["UI simplified"]'::jsonb, '["Stay hydrated"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 'energetic', 91, 88, 82, 'high_energy', '[]'::jsonb, '["Enable all features"]'::jsonb, '["Sleep 8 hours"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 'calm', 89, 85, 88, 'creative_mode', '[]'::jsonb, '["Creative tools enabled"]'::jsonb, '["Meditation"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 'neutral', 82, 72, 75, 'standard', '[]'::jsonb, '["Standard interface"]'::jsonb, '["Light exercise"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 'focused', 85, 80, 84, 'concentrated_work', '[]'::jsonb, '["Deep work mode"]'::jsonb, '["Regular breaks"]'::jsonb, NOW(), NOW());

-- DNA GOVERNANCE
INSERT INTO enterprise_dna_governance (id, user_id, genetic_fitness_score, evolved_strategies, optimization_generation, organization_structure_efficiency, culture_evolution_score, recommended_mutations, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 78, '[]'::jsonb, 12, 85, 82, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 82, '[]'::jsonb, 8, 88, 85, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 92, '[]'::jsonb, 18, 95, 93, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 70, '[]'::jsonb, 4, 76, 75, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 81, '[]'::jsonb, 10, 86, 84, '[]'::jsonb, NOW(), NOW());

-- PRECOGNITION ENGINE
INSERT INTO enterprise_precognition_engine (id, user_id, prediction_accuracy, forecast_score, future_events, risk_alerts, trend_forecasts, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 87, 92, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 85, 88, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 93, 96, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 78, 82, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 88, 91, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW());

-- ZERO KNOWLEDGE PROOF
INSERT INTO enterprise_zero_knowledge (id, user_id, privacy_score, zero_knowledge_proofs_generated, privacy_settings, verified_credentials, anonymity_status, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 95, 145, '{"data_sharing": "minimal"}'::jsonb, '[]'::jsonb, 'protected', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 92, 128, '{"data_sharing": "minimal"}'::jsonb, '[]'::jsonb, 'protected', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 98, 267, '{"data_sharing": "minimal"}'::jsonb, '[]'::jsonb, 'protected', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 88, 42, '{"data_sharing": "standard"}'::jsonb, '[]'::jsonb, 'standard', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 94, 165, '{"data_sharing": "minimal"}'::jsonb, '[]'::jsonb, 'protected', NOW(), NOW());

-- ECOSYSTEM INTELLIGENCE
INSERT INTO enterprise_ecosystem_intelligence (id, user_id, ecosystem_health_score, collaboration_network, resource_flow_efficiency, partnership_opportunities, dependency_risks, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 88, '{"Internal": 8, "External": 12}'::jsonb, 82, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 85, '{"Internal": 6, "External": 10}'::jsonb, 80, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 94, '{"Internal": 15, "External": 25}'::jsonb, 92, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 78, '{"Internal": 4, "External": 5}'::jsonb, 75, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 87, '{"Internal": 10, "External": 18}'::jsonb, 85, '[]'::jsonb, '[]'::jsonb, NOW(), NOW());

-- GAMIFICATION
INSERT INTO enterprise_gamification (id, user_id, experience_points, level, achievements, leaderboard_rank, team_achievements, upcoming_rewards, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 8500, 28, '[]'::jsonb, 38, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 7200, 24, '[]'::jsonb, 52, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 14750, 48, '[]'::jsonb, 3, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 3200, 10, '[]'::jsonb, 185, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 6800, 22, '[]'::jsonb, 65, '[]'::jsonb, '[]'::jsonb, NOW(), NOW());

-- LABORATORY GOVERNANCE
INSERT INTO enterprise_laboratory_governance (id, user_id, experiments_conducted, hypothesis_validation_rate, active_experiments, experiment_results, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 28, 82, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 22, 78, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 45, 91, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 8, 68, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 32, 85, '[]'::jsonb, '[]'::jsonb, NOW(), NOW());

-- TIDAL WAVE ANALYTICS  
INSERT INTO enterprise_tidal_wave_analytics (id, user_id, wave_prediction_score, momentum_indicators, current_wave, trend_analysis, wave_timing_opportunity, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 84, '{"Growth Momentum": 7.8}'::jsonb, '{"name": "Digital Transformation"}'::jsonb, '[]'::jsonb, 'Optimal', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 81, '{"Growth Momentum": 7.2}'::jsonb, '{"name": "Cloud Migration"}'::jsonb, '[]'::jsonb, 'Good', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 92, '{"Growth Momentum": 8.8}'::jsonb, '{"name": "Innovation Wave"}'::jsonb, '[]'::jsonb, 'Perfect', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 76, '{"Growth Momentum": 6.5}'::jsonb, '{"name": "Consolidation"}'::jsonb, '[]'::jsonb, 'Fair', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 87, '{"Growth Momentum": 8.0}'::jsonb, '{"name": "Growth Phase"}'::jsonb, '[]'::jsonb, 'Excellent', NOW(), NOW());

-- DEEPFAKE DETECTION
INSERT INTO enterprise_deepfake_detection (id, user_id, detection_accuracy, authenticity_verification_score, threats_detected, recent_analyses, security_recommendations, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 94, 96, 3, '[]'::jsonb, '["Verify sources"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 92, 94, 1, '[]'::jsonb, '["Be cautious"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 97, 98, 2, '[]'::jsonb, '["Standard practices"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 88, 90, 4, '[]'::jsonb, '["Increase vigilance"]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 95, 96, 2, '[]'::jsonb, '["Verify content"]'::jsonb, NOW(), NOW());

-- ALGORITHMIC JUSTICE
INSERT INTO enterprise_algorithmic_justice (id, user_id, fairness_score, bias_detection_count, audit_results, demographic_balance, compliance_status, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 91, 2, '[]'::jsonb, '{"gender": 48.5}'::jsonb, 'Compliant', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 88, 1, '[]'::jsonb, '{"gender": 50.2}'::jsonb, 'Compliant', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 96, 0, '[]'::jsonb, '{"gender": 49.8}'::jsonb, 'Fully Compliant', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 82, 3, '[]'::jsonb, '{"gender": 45.5}'::jsonb, 'Review Needed', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 90, 1, '[]'::jsonb, '{"gender": 49.1}'::jsonb, 'Compliant', NOW(), NOW());

-- QUANTUM MANAGEMENT
INSERT INTO enterprise_quantum_management (id, user_id, superposition_decisions, quantum_entanglement_score, current_uncertainty_factors, simultaneous_scenarios, probability_calculations, decision_recommendations, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 5, 76, 3, '[]'::jsonb, '[]'::jsonb, 'Prepare contingencies', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_2', 4, 72, 2, '[]'::jsonb, '[]'::jsonb, 'Monitor scenarios', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 8, 88, 4, '[]'::jsonb, '[]'::jsonb, 'Optimize strategy', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_4', 2, 65, 1, '[]'::jsonb, '[]'::jsonb, 'Simple decisions', NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 6, 80, 3, '[]'::jsonb, '[]'::jsonb, 'Balance options', NOW(), NOW());

-- ============================================================================
-- Manager Dashboard & Aggregation Tables
-- ============================================================================

INSERT INTO enterprise_manager_dashboard (id, manager_id, team_size, team_productivity_average, team_engagement_score, department_metrics, top_performers, team_alerts, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 12, 84, 82, '{"goal_completion": 78}'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 20, 89, 87, '{"goal_completion": 85}'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_5', 15, 86, 84, '{"goal_completion": 82}'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW());

INSERT INTO enterprise_team_metrics (id, manager_id, team_id, feature_adoption_rates, team_engagement_with_features, feature_effectiveness_scores, trending_features, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'USER_ID_1', 'TEAM-001', '{"AI Mentor": 92}'::jsonb, 85, '{"AI Mentor": 8.7}'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'USER_ID_3', 'TEAM-002', '{"AI Mentor": 95}'::jsonb, 90, '{"AI Mentor": 8.9}'::jsonb, '[]'::jsonb, NOW(), NOW());

INSERT INTO enterprise_department_stats (id, department_id, total_employees, department_productivity_index, feature_penetration_rate, department_benchmarks, department_trends, recommendations, created_at, updated_at)
VALUES
  (gen_random_uuid(), 'DEPT-001', 45, 86, 81, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'DEPT-002', 38, 88, 84, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW()),
  (gen_random_uuid(), 'DEPT-003', 52, 83, 79, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, NOW(), NOW());
