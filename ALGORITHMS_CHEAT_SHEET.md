# ALGORITHMS CHEAT SHEET - Quick Reference for Mentors

**Date**: March 31, 2026  
**Purpose**: Quick lookup guide for explaining algorithms to stakeholders

---

## GOAL PREDICTION ALGORITHMS

### 1. RandomForest Regressor - "How many days until goal completion?"

**Real Analogy**: Asking 100 different experts, each with their own experience

**Process**:
- Extract 28 features (progress, time elapsed, user history, context)
- Normalize features (z-score standardization)
- 100 trees make independent predictions
- Average all predictions → Final answer

**Output**: e.g., "39 days ± 8 days (confidence range)"

**Why it works**: Multiple perspectives reduce error; robust to outliers

**When to use**: Any goal completion time prediction

---

### 2. GradientBoosting Classifier - "Is goal ON_TRACK, AT_RISK, DELAYED, or COMPLETED?"

**Real Analogy**: Learning from mistakes sequentially (like correction fluid)

**Process**:
- Tree 1 makes a classification
- Tree 2 learns what Tree 1 got wrong
- Tree 3 corrects remaining errors
- Repeat 100 times with learning rate 0.1 (small steps)
- Convert score to probability: 55% AT_RISK, 25% ON_TRACK, etc.

**Output**: e.g., "AT_RISK (55% confidence)"

**Why it works**: Sequential correction improves accuracy; gives probability, not just category

**When to use**: Risk classification of goals or issues

---

### 3. IsolationForest - "Is this goal behaving abnormally?"

**Real Analogy**: Anomalies are naturally isolated; easier to separate

**Process**:
- Build 100 random isolation trees
- Count how many splits needed to isolate each goal
- Normal goals need many splits; anomalies need few splits
- Path length → Anomaly score (0-1, where 1=highly anomalous)
- Flag top 10% as anomalies

**Output**: e.g., "Anomaly score: 0.92 (ALERT: No progress in 8 days)"

**Why it works**: Learns from majority behavior without needing labels

**When to use**: Unsupervised anomaly detection (no labeled training data)

---

### 4. Time Series Forecasting (ARIMA + Exponential Smoothing) - "What's the trend for this goal?"

**Real Analogy**: Combining 3 different weather forecasts for better accuracy

**Components**:
- **ARIMA**: Uses past values + errors to predict next value
- **Exponential Smoothing**: Recent data weighted more than old data
- **Linear Trend**: Simple slope extrapolation
- **Ensemble**: Average all 3 methods

**Output**: 
```
Optimistic (5%):   69% completion next week
Expected (50%):    71% completion next week
Pessimistic (95%): 73% completion next week
```

**Why it works**: Multiple forecasting methods catch different patterns

**When to use**: Goal completion trajectory, KPI trends, burndown updates

---

### 5. Signal Processing (FFT + Momentum) - "Is this goal accelerating or slowing down?"

**Real Analogy**: Reading a heart monitor (signal) to detect rhythm changes

**Process**:
- Raw momentum = (Current progress - Previous progress) / time
- Smooth with 3-day moving average (remove noise)
- FFT decomposition (find underlying cycle: 7-day weekly pattern)
- Calculate acceleration = change in momentum

**Output**:
```
Current momentum: +0.8% per day (STRONG)
Acceleration: +0.015% per day² (ACCELERATING ↗)
Wave: ±5% weekly oscillation
Projection: Completes in 2 days
```

**Why it works**: Separates signal from noise; detects trends and cycles

**When to use**: Dashboard momentum indicators, Tidal Wave analytics

---

## KPI ANALYTICS ALGORITHMS

### 6. Fuzzy Logic - "How good is employee performance? (Not just 0-1, but continuous)"

**Real Analogy**: Employee is "80% efficient" not "either efficient or not"

**Process**:
- Define membership functions (overlapping ranges)
- Calculate membership: How much does 55% efficiency belong to "HIGH"? (e.g., 0.17 out of 1)
- Apply fuzzy rules: IF efficiency=MEDIUM AND workload=HIGH THEN performance=GOOD
- Combine rule fires by strength
- Defuzzify: Convert fuzzy output to crisp score (e.g., 69.7/100)

**Output**: "Performance: 69.7/100 - GOOD with caution"

**Why it works**: Handles ambiguity better than classical yes/no logic

**When to use**: Soft scoring systems, emotional assessments, multi-factor ratings

---

### 7. Genetic Algorithm - "What weights should we use to combine 5 metrics into 1 KPI?"

**Real Analogy**: Evolution: Fittest survive, reproduce, mutate

**Process**:
- Gen 0: 100 random weight combinations
- Evaluate: Score each combination on historical data
- Selection: Keep top 20
- Mutation: Random ±5% changes to survivors (60 new individuals)
- Crossover: Mix top performers (40 offspring)
- Repeat generations until improvement plateaus

**Output**: 
```
Before: KPI score 72/100
After:  KPI score 84/100 (+12 improvement, +18% revenue increase)
Optimal weights: [0.12, 0.28, 0.18, 0.26, 0.16]
```

**Why it works**: Automatically finds optimal combination (better than manual tuning)

**When to use**: Parameter optimization, DNA Governance evolution, weight tuning

---

### 8. Bayesian Probability - "What's the updated forecast given new evidence?"

**Real Analogy**: Doctor updating diagnosis after seeing test results

**Formula**: 
```
New Belief = (Test Accuracy × Prior Belief) / Test Result Likelihood
```

**Process**:
- Prior: "Revenue will be ₹550L ± ₹30L" (historical belief)
- Evidence: "Q1 actual: ₹580L" (higher than expected)
- Update: "Q2 likely ₹565L ± ₹25L" (shifted upward)
- Next period: New posterior becomes new prior; continuous learning

**Output**: Tighter confidence intervals with each observation

**Why it works**: Incorporates new data incrementally; matches human learning

**When to use**: Continuous forecasting, belief updating, probability refinement

---

## ISSUE MANAGEMENT ALGORITHMS

### 9. Naive Bayes Classification - "What category is this new issue?"

**Real Analogy**: Spam detector learning from examples

**Process**:
- Training: Count keyword frequencies in each category
- New issue: Calculate probability for each category using keywords
- P(Category | Keywords) = P(Keywords | Category) × P(Category) / P(Keywords)
- Highest probability = classification

**Output**: "CATEGORY: Database (94% confidence)"

**Why it works**: Fast, transparent (can see which words matter), works with limited training data

**When to use**: Issue categorization, auto-tagging, spam detection

---

### 10. Priority Scoring - "Which issues should we fix first?"

**Real Analogy**: Triage in emergency room (who needs immediate help?)

**Formula**:
```
Priority = (Severity×0.4) + (Impact×0.3) + (Urgency×0.2) + (Users×0.1)
```

**Examples**:
- Database timeout: 92/100 → CRITICAL (fix immediately)
- UI button misaligned: 24/100 → LOW (next sprint)
- Password reset slow: 41/100 → MEDIUM (current sprint)

**Why it works**: Transparent scoring; automatically re-prioritizes as situation changes

**When to use**: Issue triage, incident management, backlog prioritization

---

## ENTERPRISE SOLUTION ALGORITHMS

### 11. Genetic Algorithm (DNA Governance) - "What's the optimal organizational structure?"

**Real Analogy**: Evolution creating "super-organisms" (Google, Netflix orgs)

**Genome dimensions**:
- Decision speed (1-10)
- Risk tolerance (1-10)
- Communication frequency (1-10)
- Delegation level (1-10)
- Innovation budget (1-10)
- Accountability (1-10)

**Fitness measures**:
- Goal completion rate
- Employee satisfaction
- Innovation rate
- Decision speed
- Employee retention

**Result**:
```
Before (Traditional control): Fitness 53/100
├─ Decision time: 15 days
├─ Satisfaction: 45/100
└─ Turnover: 22%

After (Evolved governance): Fitness 75/100
├─ Decision time: 2 days (7× faster)
├─ Satisfaction: 78/100 (+33)
└─ Turnover: 8% (-14%)
```

**When to use**: Organizational optimization, governance model design

---

### 12. Graph Analysis (Ecosystem Intelligence) - "How resilient is our organization?"

**Key Metrics**:

**Centrality** (How critical is each node?):
- Degree: Count of connections
- Betweenness: Acts as bridge between others (if fails, many paths break)
- Clustering: How connected are neighbors? (resilience indicator)

**Network Health Score**:
```
= (Connectivity × 0.3) + (Efficiency × 0.3) 
  + (Resilience × 0.2) + (Collaboration × 0.2)

Low score → Too many silos, recommend cross-connections
High score → Well-integrated, resilient network
```

**Output**: "Network health: 72/100 (Good but needs cross-team bridges)"

**When to use**: Organizational structure analysis, dependency mapping

---

### 13. Bayesian Networks (Quantum Management) - "What's our best decision with incomplete information?"

**Real Analogy**: Playing chess: Make best move given uncertain opponent moves

**Process**:
- Represent uncertainty as probability distributions (not fixed values)
- Example: Goal is 50% complete, 30% at risk, 20% delayed (superposition)
- When new information arrives: Update all probabilities (entanglement)
- Decision: Choose action with highest expected value given uncertainties

**Output**: "Allocate 1 person to Goal B (addresses 50% probability of risk)"

**Why it works**: Embraces uncertainty explicitly instead of pretending certainty

**When to use**: Decision-making with incomplete data, probability-based resource allocation

---

### 14. Hypothesis Testing (Laboratory Governance) - "Does this intervention actually work?"

**Real Analogy**: Clinical trial for new drug

**Process**:
- Design: Control (no intervention) vs. Test (intervention)
- Measure: Key metric for both groups
- Calculate: Z-score and p-value
- Decision: If p < 0.05 → Statistically significant ✓

**Example**:
```
Hypothesis: Daily communication improves completion
Control: 82% completion (500 employees)
Test: 87% completion (500 employees)
Difference: 5%
P-value: 0.0142 (1.42% chance this happened by luck)

Decision: SIGNIFICANT (98.6% confident communication helps)
Safe to roll out to organization
```

**When to use**: A/B testing, intervention validation, safe experimentation

---

## COMPARISON TABLE

| Algorithm | Input | Output | Speed | Transparency |
|-----------|-------|--------|-------|--------------|
| RandomForest | Goal data | Days | Fast | Medium (can explain feature importance) |
| GradientBoosting | Goal data | Risk class + probability | Fast | Medium |
| IsolationForest | Goal metrics | Anomaly score 0-1 | Fast | Low (unsupervised) |
| ARIMA | Historical series | Future trend + forecast | Fast | High (forecasting formula visible) |
| Signal Processing | Daily progress | Momentum + acceleration | Very Fast | High (math is transparent) |
| Fuzzy Logic | Metrics | Soft score 0-1 | Very Fast | Very High (rules explicit) |
| Genetic Algorithm | Objective function | Optimized parameters | Slow (evolves over time) | Medium (evolution opaque) |
| Bayesian | Dependencies + evidence | Updated probability | Medium | High (math transparent) |
| Naive Bayes | Training data + new text | Category + confidence | Very Fast | Very High (keyword-based) |
| Priority Scoring | Issue metrics | Priority rank | Very Fast | Very High (formula explicit) |
| Graph Analysis | Network | Network health score | Medium | High (metrics transparent) |
| Hypothesis Testing | Control + test groups | p-value + confidence | Slow (needs time) | Very High (statistics) |

---

## MENTOR TALKING POINTS

### For "How does X algorithm work?" questions:

**RandomForest**: "Think of it like asking 100 senior managers for predictions, then averaging their answers. Some will be high, some low, but the average is usually accurate."

**GradientBoosting**: "It's like this: First model makes prediction. Second model learns what first got wrong. Third model fixes remaining errors. Repeat 100 times = very accurate."

**Bayesian**: "It's how humans think: Start with belief (prior). See evidence (experiment). Update belief. See more evidence. Update again. Continuous learning."

**Genetic Algorithm**: "Evolution: Fittest survive and reproduce. Top 20 businesses generate offspring with mutations. After many generations = optimal company structure emerges."

**Hypothesis Testing**: "Like clinical trials: Control group vs. treatment group. Measure carefully. Calculate how likely this difference happened by chance. If very unlikely → it works!"

---

## QUICK DECISION GUIDE

**Choose RandomForest when**: You need to predict a NUMBER (days, score, count)

**Choose GradientBoosting when**: You need to CLASSIFY into a category (AT_RISK, COMPLETED, etc.)

**Choose IsolationForest when**: You need to find UNUSUAL patterns without labeled examples

**Choose ARIMA when**: You have TIME SERIES data and want to forecast trends

**Choose Fuzzy Logic when**: Scoring is AMBIGUOUS (not black/white, has gradients)

**Choose Genetic Algorithm when**: You need to OPTIMIZE multiple parameters simultaneously

**Choose Bayesian when**: You have INCOMPLETE data and want probability-based decisions

**Choose Naive Bayes when**: You need FAST classification from TEXT (categories, tags)

**Choose Priority Scoring when**: You need TRANSPARENT ranking (stakeholders can see the formula)

**Choose Graph Analysis when**: You need to understand ORGANIZATIONAL STRUCTURE resilience

**Choose Hypothesis Testing when**: You need PROOF that an intervention works

---

**Document Status**: ✓ Complete Quick Reference  
**Use This For**: Training mentors, explaining to stakeholders, quick lookups  
**Keep Updated**: As new algorithms are added to system

