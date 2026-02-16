-- KaryaSiddhi Database Initialization Script
-- Digital India Initiative - SIH 2025
-- Compatible with Render, Supabase, and other managed PostgreSQL services

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Departments table
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    ministry VARCHAR(255) NOT NULL,
    head_of_department VARCHAR(255),
    employee_count INTEGER DEFAULT 0,
    state VARCHAR(100),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    aadhaar VARCHAR(20),
    role VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    employee_id VARCHAR(50),
    avatar TEXT,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Goals table
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'not_started',
    priority VARCHAR(50) DEFAULT 'medium',
    progress DECIMAL(5,2) DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    assigned_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    parent_goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create KPIs table
CREATE TABLE IF NOT EXISTS kpis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    unit VARCHAR(50) NOT NULL,
    target DECIMAL(10,2) NOT NULL,
    current DECIMAL(10,2) NOT NULL,
    baseline DECIMAL(10,2) NOT NULL,
    frequency VARCHAR(50) DEFAULT 'monthly',
    category VARCHAR(100) NOT NULL,
    trend VARCHAR(20) DEFAULT 'stable',
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Activities table for audit trail
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    goal_id UUID REFERENCES goals(id) ON DELETE SET NULL,
    kpi_id UUID REFERENCES kpis(id) ON DELETE SET NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department_id);
CREATE INDEX IF NOT EXISTS idx_goals_status ON goals(status);
CREATE INDEX IF NOT EXISTS idx_goals_assigned_user ON goals(assigned_user_id);
CREATE INDEX IF NOT EXISTS idx_goals_department ON goals(department_id);
CREATE INDEX IF NOT EXISTS idx_kpis_goal ON kpis(goal_id);
CREATE INDEX IF NOT EXISTS idx_kpis_department ON kpis(department_id);
CREATE INDEX IF NOT EXISTS idx_activities_user ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON activities(timestamp);

-- Insert sample departments
INSERT INTO departments (name, code, ministry, head_of_department, employee_count, state, location) VALUES
('Department of Information Technology', 'DIT', 'Ministry of Electronics and IT', 'Dr. Rajesh Kumar', 250, 'Delhi', 'New Delhi'),
('Digital Services Division', 'DSD', 'Ministry of Electronics and IT', 'Ms. Priya Sharma', 180, 'Karnataka', 'Bangalore'),
('E-Governance Unit', 'EGU', 'Ministry of Electronics and IT', 'Mr. Amit Patel', 120, 'Maharashtra', 'Mumbai')
ON CONFLICT (code) DO NOTHING;

-- Insert users (password: 'password123' - hashed with bcrypt)
-- 12 Regular employees + 1 Manager

-- Manager Account
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Arun Singh', 'arun.singh@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Department Head', 'Joint Secretary', 'EMP-2025-000', (SELECT id FROM departments WHERE code = 'DIT'), '****-****-0000')
ON CONFLICT (email) DO NOTHING;

-- Employee 1 - High Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Rajesh Kumar', 'rajesh.kumar@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Senior Officer', 'Deputy Secretary', 'EMP-2025-001', (SELECT id FROM departments WHERE code = 'DIT'), '****-****-1234')
ON CONFLICT (email) DO NOTHING;

-- Employee 2 - Good Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Priya Sharma', 'priya.sharma@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Manager', 'Section Officer', 'EMP-2025-002', (SELECT id FROM departments WHERE code = 'DSD'), '****-****-5678')
ON CONFLICT (email) DO NOTHING;

-- Employee 3 - Average Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Amit Patel', 'amit.patel@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Officer', 'Assistant Director', 'EMP-2025-003', (SELECT id FROM departments WHERE code = 'EGU'), '****-****-3456')
ON CONFLICT (email) DO NOTHING;

-- Employee 4 - High Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Sneha Reddy', 'sneha.reddy@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Senior Officer', 'Technical Lead', 'EMP-2025-004', (SELECT id FROM departments WHERE code = 'DIT'), '****-****-4567')
ON CONFLICT (email) DO NOTHING;

-- Employee 5 - Below Average
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Vikram Singh', 'vikram.singh@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Officer', 'Project Manager', 'EMP-2025-005', (SELECT id FROM departments WHERE code = 'DSD'), '****-****-5678')
ON CONFLICT (email) DO NOTHING;

-- Employee 6 - Good Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Kavita Nair', 'kavita.nair@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Manager', 'Deputy Manager', 'EMP-2025-006', (SELECT id FROM departments WHERE code = 'EGU'), '****-****-6789')
ON CONFLICT (email) DO NOTHING;

-- Employee 7 - Average Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Rahul Verma', 'rahul.verma@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Officer', 'System Analyst', 'EMP-2025-007', (SELECT id FROM departments WHERE code = 'DIT'), '****-****-7890')
ON CONFLICT (email) DO NOTHING;

-- Employee 8 - High Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Anjali Mehta', 'anjali.mehta@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Senior Officer', 'Senior Analyst', 'EMP-2025-008', (SELECT id FROM departments WHERE code = 'DSD'), '****-****-8901')
ON CONFLICT (email) DO NOTHING;

-- Employee 9 - Below Average
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Suresh Yadav', 'suresh.yadav@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Officer', 'Data Officer', 'EMP-2025-009', (SELECT id FROM departments WHERE code = 'EGU'), '****-****-9012')
ON CONFLICT (email) DO NOTHING;

-- Employee 10 - Good Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Deepika Roy', 'deepika.roy@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Manager', 'Quality Manager', 'EMP-2025-010', (SELECT id FROM departments WHERE code = 'DIT'), '****-****-0123')
ON CONFLICT (email) DO NOTHING;

-- Employee 11 - Average Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Manish Gupta', 'manish.gupta@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Officer', 'Security Officer', 'EMP-2025-011', (SELECT id FROM departments WHERE code = 'DSD'), '****-****-1234')
ON CONFLICT (email) DO NOTHING;

-- Employee 12 - High Performer
INSERT INTO users (name, email, password, role, designation, employee_id, department_id, aadhaar) VALUES
('Pooja Deshmukh', 'pooja.deshmukh@gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Senior Officer', 'Infrastructure Lead', 'EMP-2025-012', (SELECT id FROM departments WHERE code = 'EGU'), '****-****-2345')
ON CONFLICT (email) DO NOTHING;

-- Insert goals for each employee with varying performance levels

-- Employee 1 - Rajesh Kumar (High Performer - 85% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Digital Infrastructure Modernization', 'Upgrade all departmental systems to cloud-based infrastructure', 'achievable', 'in_progress', 'high', 85.00, '2025-01-01', '2025-12-31', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'rajesh.kumar@gov.in')),
('API Gateway Implementation', 'Build secure API gateway for inter-department communication', 'measurable', 'in_progress', 'critical', 90.00, '2025-02-01', '2025-10-15', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'rajesh.kumar@gov.in')),
('Security Audit Completion', 'Complete comprehensive security audit of all systems', 'time_bound', 'completed', 'high', 100.00, '2025-01-15', '2025-06-30', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'rajesh.kumar@gov.in'));

-- Employee 2 - Priya Sharma (Good Performer - 72% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Citizen Service Portal Enhancement', 'Improve user experience and reduce processing time by 40%', 'measurable', 'in_progress', 'critical', 75.00, '2025-03-01', '2025-11-30', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'priya.sharma@gov.in')),
('Mobile App Development', 'Develop citizen services mobile application', 'achievable', 'in_progress', 'high', 68.00, '2025-01-10', '2025-09-20', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'priya.sharma@gov.in')),
('User Training Program', 'Train 500+ citizens on digital services', 'relevant', 'in_progress', 'medium', 73.00, '2025-02-01', '2025-08-31', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'priya.sharma@gov.in'));

-- Employee 3 - Amit Patel (Average - 60% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('E-Governance Portal Upgrade', 'Modernize e-governance platform with new features', 'achievable', 'in_progress', 'medium', 58.00, '2025-02-15', '2025-11-15', (SELECT id FROM departments WHERE code = 'EGU'), (SELECT id FROM users WHERE email = 'amit.patel@gov.in')),
('Document Management System', 'Implement digital document management', 'measurable', 'in_progress', 'medium', 62.00, '2025-03-01', '2025-10-30', (SELECT id FROM departments WHERE code = 'EGU'), (SELECT id FROM users WHERE email = 'amit.patel@gov.in'));

-- Employee 4 - Sneha Reddy (High Performer - 88% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Cloud Migration Phase 2', 'Migrate remaining services to cloud infrastructure', 'achievable', 'in_progress', 'critical', 92.00, '2025-01-05', '2025-08-30', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'sneha.reddy@gov.in')),
('DevOps Pipeline Setup', 'Establish CI/CD pipeline for all projects', 'time_bound', 'in_progress', 'high', 85.00, '2025-02-10', '2025-07-31', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'sneha.reddy@gov.in')),
('Performance Monitoring', 'Deploy APM tools across infrastructure', 'measurable', 'completed', 'medium', 100.00, '2025-01-20', '2025-05-15', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'sneha.reddy@gov.in'));

-- Employee 5 - Vikram Singh (Below Average - 45% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Service Integration Module', 'Integrate third-party services', 'achievable', 'delayed', 'medium', 42.00, '2025-02-20', '2025-09-30', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'vikram.singh@gov.in')),
('Database Optimization', 'Optimize database queries and indexes', 'measurable', 'in_progress', 'low', 48.00, '2025-03-15', '2025-08-15', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'vikram.singh@gov.in'));

-- Employee 6 - Kavita Nair (Good Performer - 70% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Workflow Automation', 'Automate approval workflows', 'achievable', 'in_progress', 'high', 72.00, '2025-01-25', '2025-09-25', (SELECT id FROM departments WHERE code = 'EGU'), (SELECT id FROM users WHERE email = 'kavita.nair@gov.in')),
('Reporting Dashboard', 'Create executive reporting dashboard', 'measurable', 'in_progress', 'medium', 68.00, '2025-02-05', '2025-08-20', (SELECT id FROM departments WHERE code = 'EGU'), (SELECT id FROM users WHERE email = 'kavita.nair@gov.in'));

-- Employee 7 - Rahul Verma (Average - 62% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Data Analytics Platform', 'Setup analytics infrastructure', 'achievable', 'in_progress', 'medium', 60.00, '2025-02-10', '2025-10-10', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'rahul.verma@gov.in')),
('System Integration Testing', 'Complete integration testing phase', 'time_bound', 'in_progress', 'medium', 64.00, '2025-03-05', '2025-07-25', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'rahul.verma@gov.in'));

-- Employee 8 - Anjali Mehta (High Performer - 82% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('AI Chatbot Implementation', 'Deploy AI chatbot for citizen queries', 'achievable', 'in_progress', 'high', 80.00, '2025-01-15', '2025-08-30', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'anjali.mehta@gov.in')),
('Service Analytics Dashboard', 'Build real-time analytics dashboard', 'measurable', 'in_progress', 'high', 84.00, '2025-02-01', '2025-07-15', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'anjali.mehta@gov.in'));

-- Employee 9 - Suresh Yadav (Below Average - 48% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Data Migration Project', 'Migrate legacy data to new system', 'achievable', 'delayed', 'medium', 45.00, '2025-02-25', '2025-10-20', (SELECT id FROM departments WHERE code = 'EGU'), (SELECT id FROM users WHERE email = 'suresh.yadav@gov.in')),
('Backup System Setup', 'Implement automated backup system', 'time_bound', 'in_progress', 'medium', 51.00, '2025-03-10', '2025-08-10', (SELECT id FROM departments WHERE code = 'EGU'), (SELECT id FROM users WHERE email = 'suresh.yadav@gov.in'));

-- Employee 10 - Deepika Roy (Good Performer - 75% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Quality Assurance Framework', 'Establish QA processes and standards', 'achievable', 'in_progress', 'high', 78.00, '2025-01-20', '2025-09-15', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'deepika.roy@gov.in')),
('Testing Automation Suite', 'Build automated testing framework', 'measurable', 'in_progress', 'high', 72.00, '2025-02-15', '2025-08-30', (SELECT id FROM departments WHERE code = 'DIT'), (SELECT id FROM users WHERE email = 'deepika.roy@gov.in'));

-- Employee 11 - Manish Gupta (Average - 58% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Security Compliance Audit', 'Conduct security compliance review', 'achievable', 'in_progress', 'high', 55.00, '2025-02-05', '2025-09-05', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'manish.gupta@gov.in')),
('Penetration Testing', 'Execute penetration testing exercises', 'time_bound', 'in_progress', 'high', 61.00, '2025-03-01', '2025-07-30', (SELECT id FROM departments WHERE code = 'DSD'), (SELECT id FROM users WHERE email = 'manish.gupta@gov.in'));

-- Employee 12 - Pooja Deshmukh (High Performer - 86% avg)
INSERT INTO goals (title, description, type, status, priority, progress, start_date, end_date, department_id, assigned_user_id) VALUES
('Network Infrastructure Upgrade', 'Upgrade network to 10Gbps backbone', 'achievable', 'in_progress', 'critical', 88.00, '2025-01-10', '2025-08-15', (SELECT id FROM departments WHERE code = 'EGU'), (SELECT id FROM users WHERE email = 'pooja.deshmukh@gov.in')),
('Disaster Recovery Plan', 'Implement comprehensive DR solution', 'time_bound', 'in_progress', 'critical', 84.00, '2025-01-25', '2025-07-20', (SELECT id FROM departments WHERE code = 'EGU'), (SELECT id FROM users WHERE email = 'pooja.deshmukh@gov.in'));

-- Insert KPIs for each employee

-- Employee 1 KPIs (High)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Infrastructure Uptime', 'System availability percentage', '%', 99.95, 99.98, 98.50, 'daily', 'Infrastructure', 'up', 
  (SELECT id FROM departments WHERE code = 'DIT'), 
  (SELECT id FROM goals WHERE title = 'Digital Infrastructure Modernization' LIMIT 1)),
('API Response Time', 'Average API response time', 'ms', 200, 145, 350, 'daily', 'Performance', 'up', 
  (SELECT id FROM departments WHERE code = 'DIT'), 
  (SELECT id FROM goals WHERE title = 'API Gateway Implementation' LIMIT 1));

-- Employee 2 KPIs (Good)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Citizen Satisfaction Score', 'User satisfaction rating', 'score', 4.5, 4.2, 3.2, 'weekly', 'Service Quality', 'up', 
  (SELECT id FROM departments WHERE code = 'DSD'), 
  (SELECT id FROM goals WHERE title = 'Citizen Service Portal Enhancement' LIMIT 1)),
('Mobile App Downloads', 'Total app installations', 'count', 10000, 7500, 2000, 'monthly', 'Adoption', 'up', 
  (SELECT id FROM departments WHERE code = 'DSD'), 
  (SELECT id FROM goals WHERE title = 'Mobile App Development' LIMIT 1));

-- Employee 3 KPIs (Average)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Portal Active Users', 'Daily active users on portal', 'count', 5000, 3200, 1500, 'daily', 'Engagement', 'stable', 
  (SELECT id FROM departments WHERE code = 'EGU'), 
  (SELECT id FROM goals WHERE title = 'E-Governance Portal Upgrade' LIMIT 1));

-- Employee 4 KPIs (High)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Cloud Cost Optimization', 'Cost savings percentage', '%', 30, 35, 0, 'monthly', 'Financial', 'up', 
  (SELECT id FROM departments WHERE code = 'DIT'), 
  (SELECT id FROM goals WHERE title = 'Cloud Migration Phase 2' LIMIT 1)),
('Deployment Frequency', 'Deployments per week', 'count', 10, 12, 2, 'weekly', 'DevOps', 'up', 
  (SELECT id FROM departments WHERE code = 'DIT'), 
  (SELECT id FROM goals WHERE title = 'DevOps Pipeline Setup' LIMIT 1));

-- Employee 5 KPIs (Below Average)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Integration Success Rate', 'Successful integrations percentage', '%', 95, 78, 65, 'weekly', 'Quality', 'down', 
  (SELECT id FROM departments WHERE code = 'DSD'), 
  (SELECT id FROM goals WHERE title = 'Service Integration Module' LIMIT 1));

-- Employee 6 KPIs (Good)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Workflow Efficiency', 'Process time reduction', '%', 50, 42, 0, 'weekly', 'Efficiency', 'up', 
  (SELECT id FROM departments WHERE code = 'EGU'), 
  (SELECT id FROM goals WHERE title = 'Workflow Automation' LIMIT 1));

-- Employee 7 KPIs (Average)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Data Processing Speed', 'Records processed per hour', 'count', 50000, 32000, 20000, 'daily', 'Performance', 'stable', 
  (SELECT id FROM departments WHERE code = 'DIT'), 
  (SELECT id FROM goals WHERE title = 'Data Analytics Platform' LIMIT 1));

-- Employee 8 KPIs (High)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Chatbot Resolution Rate', 'Queries resolved by AI', '%', 80, 76, 0, 'daily', 'AI Performance', 'up', 
  (SELECT id FROM departments WHERE code = 'DSD'), 
  (SELECT id FROM goals WHERE title = 'AI Chatbot Implementation' LIMIT 1));

-- Employee 9 KPIs (Below Average)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Data Migration Progress', 'Records migrated', '%', 100, 45, 0, 'weekly', 'Project', 'down', 
  (SELECT id FROM departments WHERE code = 'EGU'), 
  (SELECT id FROM goals WHERE title = 'Data Migration Project' LIMIT 1));

-- Employee 10 KPIs (Good)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Bug Detection Rate', 'Bugs found per 1000 LOC', 'count', 5, 3.2, 8.5, 'weekly', 'Quality', 'up', 
  (SELECT id FROM departments WHERE code = 'DIT'), 
  (SELECT id FROM goals WHERE title = 'Quality Assurance Framework' LIMIT 1));

-- Employee 11 KPIs (Average)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Security Incidents', 'Security issues detected', 'count', 0, 2, 5, 'monthly', 'Security', 'stable', 
  (SELECT id FROM departments WHERE code = 'DSD'), 
  (SELECT id FROM goals WHERE title = 'Security Compliance Audit' LIMIT 1));

-- Employee 12 KPIs (High)
INSERT INTO kpis (name, description, unit, target, current, baseline, frequency, category, trend, department_id, goal_id) VALUES
('Network Performance', 'Network throughput', 'Gbps', 8.5, 8.8, 5.2, 'daily', 'Infrastructure', 'up', 
  (SELECT id FROM departments WHERE code = 'EGU'), 
  (SELECT id FROM goals WHERE title = 'Network Infrastructure Upgrade' LIMIT 1)),
('DR Test Success Rate', 'Successful DR drills', '%', 100, 100, 80, 'monthly', 'Reliability', 'up', 
  (SELECT id FROM departments WHERE code = 'EGU'), 
  (SELECT id FROM goals WHERE title = 'Disaster Recovery Plan' LIMIT 1));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (DROP first to handle reruns)
DROP TRIGGER IF EXISTS update_departments_updated_at ON departments;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_goals_updated_at ON goals;
DROP TRIGGER IF EXISTS update_kpis_updated_at ON kpis;

CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kpis_updated_at BEFORE UPDATE ON kpis FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: Managed database services (Render, Supabase) handle permissions automatically
-- If running locally, create user: CREATE USER karyasiddhi_user WITH PASSWORD 'your_password';
-- Then grant permissions: GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO karyasiddhi_user;
