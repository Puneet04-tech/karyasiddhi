# ALGORITHMS QUICK GUIDE - Essential Only
**KaryaSiddhi - How Each Algorithm Works**  
**Date**: March 31, 2026

---

## 1. GOAL PREDICTION ALGORITHMS

### **RandomForest - "How many days to finish?"**

**Simple**: Ask 100 different experts, average their answers.

**How it works**:
- System looks at: Progress %, time spent, user history, team size
- Each of 100 trees makes prediction (30-50 days based on own logic)
- Final answer: Average all 100 = **39 days ±5 days**

**Real example**: Ram 70% done in 60 days → Predicts 39 more days

---

### **GradientBoosting - "Is goal AT-RISK or ON-TRACK?"**

**Simple**: Learn from mistakes progressively.

**How it works**:
- Tree 1: Predicts "ON-TRACK"
- Tree 2: Sees all the mistakes Tree 1 made, adds correction
- Tree 3-100: Keep fixing remaining errors
- Final: Combines all corrections → **"AT-RISK 55%"**

**Real example**: Blocking issues + deadline near = "AT-RISK" (corrected prediction)

---

### **IsolationForest - "Is this goal unusual?"**

**Simple**: Anomalies are easy to spot because they're different.

**How it works**:
- Normal goals take 8 splits to isolate
- Unusual goals take 2-3 splits (because they're alone)
- Score 0-1: Higher = more unusual

**Real example**: No progress 10 days → Score 0.92 **RED ALERT**

---

### **Time Series - "What's the trend?"**

**Simple**: Look at history, predict future.

**Formula**: Optimistic 69% | Expected 71% | Pessimistic 73%

**Real example**: Ram made 5% progress each week → Will complete in 4 weeks

---

### **Signal Processing - "Accelerating or slowing?"**

**Simple**: Check if momentum is increasing.

**Metrics**:
- Momentum: +0.8% per day (velocity)
- Acceleration: +0.015% per day (speeding up ✓)

**Real example**: Progress 20% → 45% → 70% = ACCELERATING

---

## 2. KPI ANALYTICS

### **Fuzzy Logic - "Score 0-100, not just yes/no"**

**Simple**: Performance isn't just "good" or "bad" - it's degrees.

**Example**: 
- Efficiency 55%: 75% "medium" + 20% "high" = Score 69.7/100

---

### **Genetic Algorithm - "Find best parameters"**

**Simple**: Evolution finds optimal settings through natural selection.

**Process**:
- Start: 100 random settings
- Keep best 20
- Mutate 60, breed 40 new
- Repeat 100 generations

**Result**: Before 72/100 → After 84/100 (+12 improvement)

---

### **Bayesian - "Update forecast with new data"**

**Simple**: Adjust predictions as you get new evidence.

**Example**:
- Initial: Revenue ₹550L
- Q1 actual: ₹580L (higher)
- Updated: Revenue ₹565L (shifted up)

---

## 3. ISSUE MANAGEMENT

### **Naive Bayes - "What category?"**

**Simple**: Learn from keywords in past issues.

**Example**: "database connection timeout" → **DATABASE (94%)**

---

### **Priority Scoring - "Fix in what order?"**

**Formula**: 
```
Priority = (Severity×40%) + (Impact×30%) + (Urgency×20%) + (Users×10%)
```

**Examples**:
- Database down: 92/100 → **FIX NOW**
- UI misaligned: 24/100 → **NEXT SPRINT**
- Password slow: 41/100 → **THIS SPRINT**

---

## 4. ENTERPRISE SOLUTIONS (5 KEY ALGORITHMS)

### **#1: DNA Governance (Genetic Algorithm)**

**What**: Find best organizational structure

**Result**: 
- Decision time: 15 days → 2 days (7× faster!)
- Satisfaction: 45% → 78% (+33!)
- Turnover: 22% → 8%

**Process**: Evolution finds optimal: decision_speed, risk_tolerance, communication_freq, delegation, innovation_budget, accountability

---

### **#2: Ecosystem Intelligence (Graph Analysis)**

**What**: How resilient is our network?

**Metrics**:
- Centrality: Which goals are critical?
- Clustering: Are teams connected?
- Health Score: 0-100

**Real**: "Health 72/100 - need cross-team connections"

---

### **#3: Quantum Management (Bayesian)**

**What**: Make decisions with uncertainty

**Example**: Goal is 50% complete, 30% at-risk, 20% delayed
- Don't just pick one
- Use probabilities for better decisions

**Action**: "Allocate 1 resource (handles 50% probability of risk)"

---

### **#4: Laboratory Governance (Hypothesis Test)**

**What**: Proof that something actually works

**Process**:
1. Control: 500 people, 1 update/day, 82% success
2. Test: 500 people, 2 updates/day, 87% success
3. Difference: 5%
4. P-value: 0.014 (only 1.4% chance random!)
5. Confidence: **98.6% communication helps**

---

### **#5: Deepfake Detection (Deep Learning)**

**What**: Is this video real or fake?

**Uses**: CNN (reads faces) + RNN (reads voice) + GAN detection

**Authenticity Score**: 0-100

---

## QUICK DECISION GUIDE

| Need | Use This |
|------|----------|
| Predict NUMBER (days, score) | RandomForest |
| Classify into CATEGORY (CRITICAL/LOW) | GradientBoosting |
| Find UNUSUAL patterns | IsolationForest |
| Optimize MULTIPLE parameters | Genetic Algorithm |
| Make decisions with UNCERTAINTY | Bayesian |
| Classify TEXT (categories) | Naive Bayes |

---

## MENTOR TALKING POINTS

**"How does RandomForest work?"**
> "100 project managers each give estimate. Some say 30 days, some 45. We average = 39 days. Multiple perspectives beat single expert."

**"Why is goal marked AT-RISK?"**
> "System learned from 1000 past goals. Your goal has: blocking issues + deadline near + low momentum. Combination means AT-RISK."

**"How did you know that was anomaly?"**
> "Unusual is rare. This goal hasn't updated 10 days while others active daily. System automatically flags rare patterns."

**"How do we prove communication helps?"**
> "Test with half company. If improvement so extreme only 1% chance random = proven. Safe to roll out."

---

## SUMMARY TABLE

| Algorithm | Time to Learn | Easy to Explain | Accuracy |
|-----------|---|---|---|
| RandomForest | 5 min | ✓ Yes | Very High |
| GradientBoosting | 5 min | ✓ Yes | Very High |
| IsolationForest | 3 min | ✓ Yes | High |
| Time Series | 5 min | ✓ Yes | Medium |
| Fuzzy Logic | 3 min | ✓ Yes | Medium |
| Genetic | 7 min | ✓ Yes | High |
| Bayesian | 5 min | Medium | High |
| Naive Bayes | 3 min | ✓ Yes | High |
| Priority | 2 min | ✓ Yes | Very High |
| Hypothesis Test | 10 min | ✓ Yes | Very High |

---

## QUICK REFERENCE: Formulas (Only If Asked)

### RandomForest
```
Final_prediction = (Tree₁ + Tree₂ + ... + Tree₁₀₀) / 100
```

### Priority Score
```
Score = Sev×0.4 + Impact×0.3 + Urgency×0.2 + Users×0.1
```

### Hypothesis Test p-value
```
If p < 0.05 → Statistically significant ✓
If p ≥ 0.05 → Not significant ✗
```

---

## WHEN TO USE EACH ALGORITHM

**Goal Completion Time?** → RandomForest  
**Goal Status (risk)?** → GradientBoosting  
**Anomaly/unusual?** → IsolationForest  
**What category?** → Naive Bayes  
**What priority?** → Priority Scoring  
**Optimize settings?** → Genetic Algorithm  
**Decisions with uncertainty?** → Bayesian  
**Proof it works?** → Hypothesis Testing  
**Find org structure?** → Genetic Algorithm  
**Network resilience?** → Graph Analysis  

---

## 3-MINUTE OVERVIEW (For Very Busy People)

**Goal Prediction**: RandomForest asks 100 experts, averages answer → 39 days

**Risk Detection**: GradientBoosting learns patterns → "AT-RISK 55%"

**Find Problems**: IsolationForest spots anomalies → "Score 0.92 ALERT"

**Org Optimization**: Genetic Algorithm evolves structure → Decisions 2d (was 15d!)

**Proof It Works**: Hypothesis Test compares groups → "98.6% confident"

---

**Total Read Time**: 5 minutes  
**For More Detail**: Ask mentor or see original PDF  
**Best Practice**: Print this page, keep handy!

