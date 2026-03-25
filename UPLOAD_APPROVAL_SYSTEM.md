# Employee Upload & Manager Approval System

Complete implementation of work submission and approval workflow with automatic goal progress tracking.

## 🎯 System Overview

```
EMPLOYEE SIDE                          MANAGER SIDE
─────────────────────────────────────────────────────────────
Upload work file → API saves → Database → Manager sees on Dashboard
                                          │
                                          ├─ Review file
                                          ├─ Set progress %
                                          └─ Approve/Reject
                                               │
                                               └─ Updates Goal Progress
                                                  Updates related KPIs
```

## 📋 Complete Workflow

### **Phase 1: Employee Uploads Work**

**Location:** Employee → Goals Page → Individual Goal Card

**Steps:**
1. Click **"Upload Work"** button on any goal
2. Select a file (any format, up to 10MB)
3. Optionally add description of work
4. Click **"Upload"**
5. File is saved to: `/uploads/` directory with timestamp
6. Upload stored in database with status: **PENDING**

**Database Entry Created:**
```sql
INSERT INTO goal_uploads (
  id, goal_id, user_id, file_name, file_url, 
  file_size, file_type, description, status, 
  progress_percentage, uploaded_at
) VALUES (...)
-- status = 'pending'
-- progress_percentage = 0 (default)
```

**Files & Evidence:**
- Document (.pdf, .docx)
- Screenshots (.jpg, .png)
- Spreadsheets (.xlsx, .csv)
- Videos (.mp4, .mov)
- Code/Archives (.zip, .tar)

---

### **Phase 2: Manager Reviews on Dashboard**

**Location:** Manager → Dashboard → "Employee Work Uploads" Section

**What Manager Sees:**
```
┌─ UPLOAD CARD ──────────────────────────────────┐
│                                                 │
│ [Avatar] filename.pdf                [PENDING] │
│ John Doe • Goal Title • Mar 25, 2026            │
│ Description text if provided                    │
│                                                 │
│ 245.5 KB       [View File]                      │
│                [Review & Approve]               │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Status Badges:**
- 🟡 **PENDING** (Yellow) - Awaiting review
- 🟢 **APPROVED** (Green) - Accepted, progress updated
- 🔴 **REJECTED** (Red) - Not accepted, employee must resubmit

---

### **Phase 3: Manager Approves and Sets Progress**

**Steps:**

1. **Click "Review & Approve"** button on pending upload

2. **Approval Interface Opens:**
   ```
   ┌─ APPROVAL FORM ────────────────────────┐
   │                                         │
   │ Set Goal Progress: 75%                  │
   │ [────●─────────] 0%       100%         │
   │                                         │
   │ Approval Comments (Optional)            │
   │ ┌─────────────────────────────────────┐ │
   │ │ Excellent work! All requirements met│ │
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ [✓ Approve & Update Progress] [✕]     │
   │ [Reject]  [Cancel]                      │
   └─────────────────────────────────────────┘
   ```

3. **Set Progress Slider:**
   - Drag to set percentage (0-100%)
   - Or click in field to type exact value
   - Represents work completion level

4. **Add Comments (Optional):**
   - Feedback for the employee
   - Visible in upload history
   - Helpful for tracking decisions

5. **Click "Approve & Update Progress"**
   - API: `PUT /goal-uploads/:id/approve`
   - Payload: `{ progressPercentage: 75, approvalComments: "..." }`

---

### **Phase 4: Goal Progress Updates**

**When Manager Approves, System:**

1. ✅ **Updates Upload Status**
   ```sql
   UPDATE goal_uploads
   SET status = 'approved',
       progress_percentage = 75,
       approval_comments = '...',
       approved_by_id = :managerId,
       approved_at = NOW()
   WHERE id = :uploadId
   ```

2. ✅ **Calculates Goal Progress**
   - Takes AVERAGE of all approved uploads
   - Formula: `Sum(approved upload progress) / Count(approved uploads)`
   
   **Example:**
   - Upload 1: 75% approved → Goal progress = 75%
   - Upload 2: 50% approved → Goal progress = (75+50)/2 = 62.5% → rounds to 63%
   - Upload 3: 90% approved → Goal progress = (75+50+90)/3 = 71.67% → rounds to 72%

3. ✅ **Updates Goal Status**
   ```sql
   UPDATE goals
   SET progress = :calculatedProgress,
       status = CASE 
                 WHEN progress >= 100 THEN 'completed'
                 WHEN progress > 0 THEN 'in_progress'
                 ELSE previous_status
               END,
       updated_at = NOW()
   WHERE id = :goalId
   ```

4. ✅ **Updates Related KPIs** (if any)
   - Each KPI linked to goal gets updated
   - Formula: `baseline + ((target - baseline) * (progress / 100))`
   
   **Example KPI:**
   - Baseline: 10 | Target: 100 | Progress: 75%
   - New KPI Current: 10 + ((100-10) * 0.75) = 10 + 67.5 = 77.5 ≈ 78

---

### **Phase 5: Manager Rejects (Alternative)**

**If Work Doesn't Meet Standards:**

1. Click **"Review & Approve"**, then **"Reject"** button
2. Enter rejection reason (popup prompt):
   - "Missing required documentation"
   - "Does not meet quality standards"
   - "Please resubmit with corrections"

3. **Updates Upload:**
   ```sql
   UPDATE goal_uploads
   SET status = 'rejected',
       approval_comments = :rejectionReason,
       approved_by_id = :managerId,
       approved_at = NOW()
   WHERE id = :uploadId
   ```

4. **Employee Sees:**
   - Upload marked as REJECTED
   - Can see rejection reason
   - Can upload new file for same goal

---

## 🔌 API Endpoints

### **POST /goal-uploads** (Employee)
Upload a work file
```bash
curl -X POST http://localhost:3000/api/goal-uploads \
  -H "Authorization: Bearer TOKEN" \
  -F "file=@mywork.pdf" \
  -F "goalId=goal-123" \
  -F "description=Completed analysis report"

# Response
{
  "id": "upload-uuid",
  "goal": { "id": "goal-123", "title": "..." },
  "user": { "id": "user-123", "name": "John Doe" },
  "fileName": "mywork.pdf",
  "fileUrl": "/uploads/file-1234567890.pdf",
  "fileSize": 245678,
  "fileType": "application/pdf",
  "description": "Completed analysis report",
  "status": "pending",
  "progressPercentage": 0,
  "uploadedAt": "2026-03-25T10:30:00Z",
  "createdAt": "2026-03-25T10:30:00Z"
}
```

### **GET /goal-uploads/manager** (Manager)
Get all pending uploads from department
```bash
curl -X GET http://localhost:3000/api/goal-uploads/manager \
  -H "Authorization: Bearer TOKEN"

# Response: Array of uploads with status, approved info, etc.
[
  {
    "id": "upload-uuid",
    "fileName": "report.pdf",
    "status": "pending",
    "user": { "id": "emp-1", "name": "Employee Name" },
    "goal": { "id": "goal-1", "title": "Goal Title" },
    "uploadedAt": "2026-03-25T10:30:00Z",
    ...
  },
  ...
]
```

### **PUT /goal-uploads/:id/approve** (Manager)
Approve upload and update goal progress
```bash
curl -X PUT http://localhost:3000/api/goal-uploads/upload-uuid/approve \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "progressPercentage": 75,
    "approvalComments": "Excellent work! Meets all requirements."
  }'

# Response: Updated upload with approval info
{
  "id": "upload-uuid",
  "status": "approved",
  "progressPercentage": 75,
  "approvalComments": "Excellent work!",
  "approvedBy": { "id": "mgr-1", "name": "Manager Name" },
  "approvedAt": "2026-03-25T10:35:00Z",
  "goal": {
    "id": "goal-uuid",
    "progress": 75,
    "status": "in_progress"
  }
}
```

### **PUT /goal-uploads/:id/reject** (Manager)
Reject upload
```bash
curl -X PUT http://localhost:3000/api/goal-uploads/upload-uuid/reject \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rejectionReason": "Missing required documentation. Please resubmit."
  }'

# Response: Updated upload
{
  "id": "upload-uuid",
  "status": "rejected",
  "approvalComments": "Missing required documentation...",
  "approvedBy": { "id": "mgr-1", "name": "Manager Name" },
  "approvedAt": "2026-03-25T10:35:00Z"
}
```

---

## 📊 Database Schema

### **goal_uploads Table**
```sql
CREATE TABLE goal_uploads (
  id UUID PRIMARY KEY,
  goal_id UUID NOT NULL REFERENCES goals(id),
  user_id UUID NOT NULL REFERENCES users(id),
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  file_type VARCHAR(100),
  description TEXT,
  status ENUM('pending', 'approved', 'rejected'),
  progress_percentage INT DEFAULT 0,
  approval_comments TEXT,
  approved_at TIMESTAMP,
  approved_by_id UUID REFERENCES users(id),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_goal_uploads_goal_id ON goal_uploads(goal_id);
CREATE INDEX idx_goal_uploads_user_id ON goal_uploads(user_id);
CREATE INDEX idx_goal_uploads_status ON goal_uploads(status);
CREATE INDEX idx_goal_uploads_approved_by ON goal_uploads(approved_by_id);
```

---

## 🔐 Permission Model

| Action | Employee | Manager | Admin |
|--------|----------|---------|-------|
| Upload file for own goal | ✅ | ✅ | ✅ |
| View own uploads | ✅ | ✅ | ✅ |
| View department uploads | ❌ | ✅ | ✅ |
| Approve upload | ❌ | ✅* | ✅ |
| Reject upload | ❌ | ✅* | ✅ |
| Set goal progress | ❌ | ✅* | ✅ |

*Manager can only approve/reject uploads from their own department

---

## 🎬 Usage Example Walkthrough

### **Scenario: John (Employee) uploads project work**

**Day 1 - Employee Action:**
1. John navigates to Goals page
2. Opens "Quarterly Performance Report" goal
3. Clicks "Upload Work" button
4. Selects `Q1_Report_Final.pdf` (2.5 MB)
5. Adds comment: "Final draft with all metrics and analysis"
6. Clicks "Upload"
7. ✅ Success: "Upload successful! Q1_Report_Final.pdf uploaded"

**Database records:**
```sql
INSERT INTO goal_uploads 
VALUES (new-uuid, goal-uuid, john-uuid, 'Q1_Report_Final.pdf', 
        '/uploads/Q1_Report-1234567890.pdf', 2621440, 'application/pdf',
        'Final draft with all metrics and analysis', 
        'pending', 0, NULL, NULL, NULL, NOW());
```

---

### **Day 2 - Manager Review:**

1. Sarah (Manager) logs into Dashboard
2. Scrolls to "Employee Work Uploads" section
3. Sees John's upload with status **PENDING**
4. Clicks "Review & Approve"
5. Reads description: "Final draft with all metrics and analysis"
6. Opens PDF via "View File" to verify
7. Sets progress slider to **85%**
8. Adds comment: "Excellent analysis. Minor formatting issue found but acceptable. 85% for completeness."
9. Clicks "✓ Approve & Update Progress"

**System updates:**
```sql
-- Update upload
UPDATE goal_uploads SET
  status = 'approved',
  progress_percentage = 85,
  approval_comments = 'Excellent analysis...',
  approved_by_id = sarah-uuid,
  approved_at = NOW()
WHERE id = upload-uuid;

-- Update goal (only one upload, so progress = 85%)
UPDATE goals SET
  progress = 85,
  status = 'in_progress',
  updated_at = NOW()
WHERE id = goal-uuid;

-- Update related KPIs
UPDATE kpis SET
  current = baseline + ((target - baseline) * 0.85),
  last_updated = NOW()
WHERE goal_id = goal-uuid;
```

---

**Day 2 - John (Employee) sees:**
1. Refreshes Goals page
2. Goal progress bar shows **85%** (was 0%)
3. Views "Quarterly Performance Report" goal
4. Sees upload marked as **APPROVED**
5. Sees manager's comment: "Excellent analysis..."
6. Knows work was accepted and goal is progressing

---

## 🚀 Deployment Notes

### **Database Migration Required**
Run migration before deploying:
```bash
# Apply migration
npm run typeorm migration:run

# OR manually run SQL
psql -U postgres -d karyasiddhi -f database/add_upload_approval_fields.sql
```

### **File Upload Directory**
Ensure `/uploads` directory exists and is writable:
```bash
mkdir -p uploads
chmod 755 uploads
```

### **Nginx Configuration** (if using)
Ensure files are served correctly:
```nginx
location /uploads/ {
    alias /app/uploads/;
    expires 30d;
}
```

---

## ✅ Testing Checklist

- [ ] Employee can upload file to any goal
- [ ] File appears with PENDING status on manager dashboard
- [ ] Manager can view uploaded file
- [ ] Manager can set progress percentage (0-100)
- [ ] Manager can add approval comments
- [ ] Clicking "Approve" updates goal progress
- [ ] Multiple uploads average correctly
- [ ] Goal marked COMPLETED when progress >= 100%
- [ ] Related KPIs update with goal progress
- [ ] Manager can reject uploads with reason
- [ ] Rejected uploads show rejection reason
- [ ] Permissions enforced (manager only from own department)
- [ ] Success/error notifications display correctly
- [ ] Auto-clear notifications after timeout

---

## 📝 Summary

✅ Upload system now **fully operational** from both employee and manager sides:
- Employees submit work evidence
- Managers approve and set progress
- Goals automatically update progress
- KPIs track goal progress proportionally
- Complete audit trail of approvals

🎯 **Result:** Transparent work completion tracking with manager-controlled progress validation.
