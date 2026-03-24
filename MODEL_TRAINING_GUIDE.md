# KaryaSiddhi AI Model Training Guide

## Overview

The KaryaSiddhi AI service includes a comprehensive model training pipeline that trains three machine learning models for the enterprise solutions:

1. **Goal Completion Prediction** - RandomForest Regressor
2. **Risk Classification** - Gradient Boosting Classifier
3. **Anomaly Detection** - Isolation Forest

## Models Overview

### 1. Goal Completion Prediction Model
- **Algorithm**: RandomForest Regressor
- **Purpose**: Predicts how many days until a goal will be completed
- **Features**: 
  - Goal progress, duration, age, KPI metrics
  - Issue density, resolution rates
  - Performance indicators
- **Performance**:
  - MAE: 41.67 days
  - RMSE: 53.67 days

### 2. Risk Classification Model
- **Algorithm**: Gradient Boosting Classifier
- **Purpose**: Classifies goals into risk levels (low, medium, high, critical)
- **Features**: Same as completion model
- **Classes**:
  - -1: Completed (no risk)
  - 0: On track
  - 2: At risk
  - 3: Delayed/Critical
- **Performance**:
  - Accuracy: 32%
  - F1 Score: 0.29

### 3. Anomaly Detection Model
- **Algorithm**: Isolation Forest
- **Purpose**: Detects unusual patterns in goal performance data
- **Features**: 8-dimensional performance metrics
- **Contamination Rate**: 10%
- **Performance**:
  - Anomalies Detected: 100 out of 1000 samples (10%)

## Training Pipeline

### Quick Start

```bash
cd ai-service
python train_models.py
```

### Training with Production Database

To train models on production data from Render:

```bash
# Set the production database URL
export DATABASE_URL=postgresql://user:password@host:5432/karyasiddhi

# Run training
python train_models.py
```

Windows PowerShell:
```powershell
$env:DATABASE_URL = "postgresql://user:password@host:5432/karyasiddhi"
python train_models.py
```

### Data Sources

The training pipeline automatically extracts data from:

- **Goals Table**: Goal metadata, status, progress
- **KPIs Table**: Key Performance Indicators linked to goals
- **Issues Table**: Issues and blockers for goals
- **Users Table**: User information including role and department

**Query Details**:
- Extracts last 4 months of data
- Minimum 1 KPI per goal
- Groups by goal, user, department, and role
- Limits to 5000 samples for performance

### Feature Engineering

The pipeline engineers 28 features from raw data:

**Raw Features**:
- goal_id, user_id, title, status, progress
- start_date, end_date, created date
- duration_days, days_since_created, days_remaining
- kpi_count, avg_kpi_progress
- issue_count, resolved_issues, open_issues

**Engineered Features**:
- completion_ratio: progress / 100
- issue_density: issues per day
- resolution_rate: resolved / total issues
- kpi_coverage: KPIs per month
- is_on_track: binary indicator
- has_issues: binary indicator
- high_kpi_coverage: binary indicator
- risk_score: -1 to 3 scale

### Fallback: Synthetic Data

If the database is unavailable, the pipeline generates 1000 synthetic training samples:

```
Synthetic Data Configuration:
- 1000 goal records
- Status distribution: 40% completed, 35% on_track, 15% at_risk, 10% delayed
- Progress: random 0-100%
- Duration: 30-180 days
- KPI count: 1-15 per goal
- Issue count: 0-20 per goal
```

## Training Process

### Step 1: Data Extraction
- Connects to PostgreSQL database
- Executes aggregation query joining goals, KPIs, issues, users
- Returns Pandas DataFrame with 17 columns and up to 5000 rows

### Step 2: Feature Engineering
- Calculates 11 additional engineered features
- Creates binary and ratio features
- Generates risk scores from status

### Step 3: Model Training

**Completion Model**:
```python
X: 1000 samples × 16 features
y: Predicted completion days
Split: 80/20 train/test
Model: RandomForest(n_estimators=100, max_depth=20)
```

**Risk Model**:
```python
X: 1000 samples × 16 features
y: Risk score (0-3)
Split: 80/20 train/test (stratified)
Model: GradientBoosting(n_estimators=100, learning_rate=0.1)
```

**Anomaly Model**:
```python
X: 1000 samples × 8 features
y: Unsupervised (no targets)
Model: IsolationForest(contamination=0.1, n_estimators=100)
```

### Step 4: Model Evaluation

Each model evaluated on test set:

**Metrics**:
- **Completion**: MAE (Mean Absolute Error), RMSE (Root Mean Squared Error)
- **Risk**: Accuracy, F1-Score (weighted)
- **Anomaly**: Number/percentage of anomalies detected

### Step 5: Model Persistence

All models saved to `models/saved_models/`:

```
completion_model.pkl     (2.6 MB) - RandomForest for goal timing
risk_model.pkl           (1.6 MB) - GradientBoosting for risk
anomaly_model.pkl        (1.7 MB) - IsolationForest for anomalies
scaler.pkl               (1.5 KB) - StandardScaler for features
anomaly_scaler.pkl       (1.5 KB) - Separate scaler for anomaly model
training_metrics.txt     (429 B)  - Training metrics and performance
```

## Model Deployment

### Development

Models are loaded automatically when the FastAPI service starts:

```python
# In main.py
prediction_model = PredictionModel()      # Loads completion_model.pkl + risk_model.pkl
anomaly_detector = AnomalyDetector()      # Loads anomaly_model.pkl
insight_generator = InsightGenerator()    # Rule-based generator
```

### Production (Render)

1. Train models locally or on development database
2. Commit `.pkl` files to Git
3. Deploy to Render (models automatically loaded on startup)
4. For retraining on production data, set `DATABASE_URL` environment variable

## API Integration

### Prediction Endpoint
```
GET /predictions?user_id=<id>&department_id=<id>&limit=10
```

Returns goal completion predictions using the trained model.

### Anomaly Detection Endpoint
```
GET /anomalies?user_id=<id>&department_id=<id>&severity=<high|medium|low>
```

Returns detected anomalies using the trained model.

### Insights Endpoint
```
GET /insights?user_id=<id>&department_id=<id>&limit=5
```

Returns AI-generated recommendations (combines predictions + rule-based engine).

## Monitoring Training

### Training Log

Location: `ai-service/training.log`

Contains detailed logs of:
- Database connection status
- Data extraction records
- Model training progress
- Performance metrics
- Model persistence

### Training Metrics

Location: `ai-service/models/saved_models/training_metrics.txt`

Contains summary of:
- Training completion timestamp
- Data source (synthetic or production)
- Database host
- All model performance metrics

## Retraining & Improvement

### Recommended Retraining Schedule
- **Daily**: If new production data is available
- **Weekly**: For performance improvements
- **Monthly**: Full retraining with extended historical data

### Performance Improvement Tips

1. **Increase Data Size**:
   - Extract more historical data (extend lookback window)
   - Aim for 10,000+ samples for better accuracy

2. **Feature Engineering**:
   - Add time-series features (trends, momentum)
   - Add seasonal indicators
   - Incorporate department-specific features

3. **Hyperparameter Tuning**:
   - Use GridSearchCV for optimal parameters
   - Adjust tree depth, learning rate, contamination rate

4. **Ensemble Methods**:
   - Combine multiple models
   - Implement model stacking

5. **Cross-Validation**:
   - Use k-fold cross-validation (currently using simple train/test split)
   - Monitor for overfitting

## Troubleshooting

### Database Connection Issues

**Problem**: `Connection refused` error

**Solution**:
```bash
# Check if local PostgreSQL is running
# Or use production DATABASE_URL if available
export DATABASE_URL=postgresql://...
python train_models.py
```

### Out of Memory Issues

**Problem**: Memory error during training with large datasets

**Solution**:
```python
# Sample data instead of full dataset
# Modify line in train_models.py:
# LIMIT 5000  →  LIMIT 1000
```

### Model File Corruption

**Problem**: `unpickle` error when loading models

**Solution**:
```bash
# Delete corrupted models and retrain
rm -rf models/saved_models/*.pkl
python train_models.py
```

## File Structure

```
ai-service/
├── train_models.py              # Main training script
├── models/
│   ├── __init__.py
│   ├── prediction_model.py      # Uses trained completion & risk models
│   ├── anomaly_detector.py      # Uses trained anomaly model
│   ├── insight_generator.py     # Rule-based insights
│   └── saved_models/
│       ├── completion_model.pkl
│       ├── risk_model.pkl
│       ├── anomaly_model.pkl
│       ├── scaler.pkl
│       ├── anomaly_scaler.pkl
│       └── training_metrics.txt
├── main.py                      # FastAPI server (loads models)
├── schemas.py                   # Response schemas
└── requirements.txt             # Python dependencies
```

## Performance Metrics (Current)

Based on latest training run with synthetic data:

| Model | Metric | Value |
|-------|--------|-------|
| Completion | MAE | 41.67 days |
| Completion | RMSE | 53.67 days |
| Risk | Accuracy | 32% |
| Risk | F1-Score | 0.29 |
| Anomaly | Anomalies | 10% |
| Anomaly | Samples | 1000 |

**Note**: These metrics are with synthetic data. Production metrics will be higher once trained on real data.

## Next Steps

1. ✅ Train models with synthetic data (current)
2. ⏳ Deploy to production
3. ⏳ Train on production database (once live)
4. ⏳ Monitor performance and metrics
5. ⏳ Implement automated retraining pipeline
6. ⏳ A/B test new models before production
7. ⏳ Add explainability (SHAP values)

## Dependencies

The training pipeline requires:
- `psycopg2-binary==2.9.9` - PostgreSQL adapter
- `pandas==2.2.3` - Data manipulation
- `numpy==1.26.4` - Numerical computing
- `scikit-learn==1.4.2` - ML algorithms
- `joblib==1.4.2` - Model persistence
- `python-dotenv==1.0.0` - Environment variables

All are included in `requirements.txt`.

## References

- [scikit-learn RandomForest](https://scikit-learn.org/stable/modules/ensemble.html#random-forests)
- [scikit-learn GradientBoosting](https://scikit-learn.org/stable/modules/ensemble.html#gradient-boosting)
- [scikit-learn IsolationForest](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html)
- [Training Script](./train_models.py)
