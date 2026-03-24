"""
KaryaSiddhi AI Model Training Script
Uses real data from PostgreSQL database to train prediction, anomaly detection, and insight models.
"""

import os
import sys
import logging
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier, IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    mean_absolute_error, 
    mean_squared_error, 
    accuracy_score, 
    f1_score,
    roc_auc_score,
    confusion_matrix
)
import joblib

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('training.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class ModelTrainer:
    def __init__(self, database_url=None):
        """Initialize model trainer with database connection"""
        # Try to get DATABASE_URL from environment (for Render or production)
        env_database_url = os.getenv('DATABASE_URL')
        
        if database_url:
            self.database_url = database_url
        elif env_database_url:
            self.database_url = env_database_url
        else:
            # Default to local docker postgres
            self.database_url = 'postgresql://karyasiddhi_user:karyasiddhi_pass_2025@localhost:5432/karyasiddhi'
        
        self.model_path = os.getenv('MODEL_PATH', './models/saved_models')
        os.makedirs(self.model_path, exist_ok=True)
        
        # Models
        self.completion_model = None
        self.risk_model = None
        self.anomaly_model = None
        self.scaler = StandardScaler()
        self.anomaly_scaler = StandardScaler()
        
        # Metrics
        self.training_metrics = {}
        
        logger.info(f"ModelTrainer initialized. Model path: {self.model_path}")
        
        # Log database info (masked for security)
        db_host = self.database_url.split('@')[-1].split(':')[0] if '@' in self.database_url else 'unknown'
        logger.info(f"Database host: {db_host}")

    def connect_database(self):
        """Establish database connection"""
        try:
            conn = psycopg2.connect(self.database_url)
            logger.info("[OK] Successfully connected to PostgreSQL database")
            return conn
        except psycopg2.Error as e:
            logger.error(f"[ERROR] Failed to connect to database: {e}")
            raise

    def extract_training_data(self, conn):
        """Extract and prepare training data from database"""
        logger.info("[DATA] Extracting training data from database...")
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        try:
            # Extract goals, KPIs, issues, and user performance data
            query = """
            SELECT 
                g.id as goal_id,
                g.user_id,
                g.title,
                g.status,
                g.progress,
                g.start_date,
                g.end_date,
                g.created_at,
                EXTRACT(DAY FROM (g.end_date - g.start_date)) as duration_days,
                EXTRACT(DAY FROM (NOW() - g.created_at)) as days_since_created,
                u.department_id,
                u.role,
                COUNT(DISTINCT k.id) as kpi_count,
                COALESCE(AVG(k.progress), 0) as avg_kpi_progress,
                COUNT(DISTINCT i.id) as issue_count,
                COALESCE(COUNT(CASE WHEN i.status = 'resolved' THEN 1 END), 0) as resolved_issues,
                COALESCE(COUNT(CASE WHEN i.status = 'open' THEN 1 END), 0) as open_issues
            FROM goals g
            LEFT JOIN users u ON g.user_id = u.id
            LEFT JOIN kpis k ON g.id = k.goal_id
            LEFT JOIN issues i ON g.id = i.goal_id
            WHERE g.created_at > NOW() - INTERVAL '4 months'
            GROUP BY g.id, g.user_id, g.title, g.status, g.progress, 
                     g.start_date, g.end_date, g.created_at, u.department_id, u.role
            HAVING COUNT(DISTINCT k.id) > 0
            ORDER BY g.created_at DESC
            LIMIT 5000
            """
            
            cursor.execute(query)
            data = cursor.fetchall()
            logger.info(f"[OK] Extracted {len(data)} goal records from database")
            
            return pd.DataFrame(data)
            
        except psycopg2.Error as e:
            logger.error(f"[ERROR] Error extracting data: {e}")
            raise
        finally:
            cursor.close()

    def generate_synthetic_training_data(self, n_samples=1000):
        """Generate realistic synthetic training data when database is unavailable"""
        logger.info(f"[SYNTHETIC] Generating {n_samples} synthetic training samples...")
        
        np.random.seed(42)
        
        statuses = ['completed', 'on_track', 'at_risk', 'delayed']
        data = {
            'goal_id': range(n_samples),
            'user_id': np.random.choice([f'user_{i}' for i in range(100)], n_samples),
            'title': [f'Goal {i}' for i in range(n_samples)],
            'status': np.random.choice(statuses, n_samples, p=[0.4, 0.35, 0.15, 0.1]),
            'progress': np.random.randint(0, 101, n_samples),
            'start_date': [datetime.now() - timedelta(days=int(x)) for x in np.random.randint(30, 180, n_samples)],
            'end_date': [datetime.now() + timedelta(days=int(x)) for x in np.random.randint(10, 150, n_samples)],
            'created_at': [datetime.now() - timedelta(days=int(x)) for x in np.random.randint(5, 120, n_samples)],
            'duration_days': np.random.randint(30, 180, n_samples),
            'days_since_created': np.random.randint(5, 120, n_samples),
            'department_id': np.random.choice(['dept_1', 'dept_2', 'dept_3'], n_samples),
            'role': np.random.choice(['Employee', 'Department Head'], n_samples),
            'kpi_count': np.random.randint(1, 15, n_samples),
            'avg_kpi_progress': np.random.randint(20, 100, n_samples),
            'issue_count': np.random.randint(0, 20, n_samples),
            'resolved_issues': np.random.randint(0, 15, n_samples),
            'open_issues': np.random.randint(0, 10, n_samples),
        }
        
        df = pd.DataFrame(data)
        logger.info(f"[OK] Generated synthetic data: shape {df.shape}")
        
        return df

    def engineer_features(self, df):
        """Engineer features for model training"""
        logger.info("[FEATURES] Engineering features from raw data...")
        
        # Calculate feature engineering
        df['completion_ratio'] = df['progress'] / 100.0
        df['issue_density'] = df['issue_count'] / (df['duration_days'] + 1)
        df['resolution_rate'] = df['resolved_issues'] / (df['issue_count'] + 1)
        df['kpi_coverage'] = df['kpi_count'] / (df['duration_days'] / 30 + 1)  # KPIs per month
        df['days_elapsed'] = df['days_since_created']
        df['days_remaining'] = np.maximum(0, (df['end_date'] - pd.Timestamp(datetime.now())).dt.days)
        
        # Performance indicators
        df['is_on_track'] = ((df['completion_ratio'] > 0.5) & 
                             (df['days_elapsed'] > df['duration_days'] * 0.5)).astype(int)
        df['has_issues'] = (df['open_issues'] > 0).astype(int)
        df['high_kpi_coverage'] = (df['kpi_count'] > df['duration_days'] / 30).astype(int)
        
        # Risk scoring based on current status
        df['risk_score'] = 0
        df.loc[df['status'] == 'at_risk', 'risk_score'] = 3
        df.loc[df['status'] == 'delayed', 'risk_score'] = 2
        df.loc[df['status'] == 'on_track', 'risk_score'] = 0
        df.loc[df['status'] == 'completed', 'risk_score'] = -1
        
        # Completion probability (for goal completion model)
        df['completion_target'] = (df['status'] == 'completed').astype(int)
        
        logger.info(f"[OK] Engineered {len(df.columns)} features")
        return df

    def prepare_X_y(self, df, model_type='prediction'):
        """Prepare feature matrix X and target variable y"""
        
        # Feature columns to use
        feature_cols = [
            'progress', 'duration_days', 'days_elapsed', 'days_remaining',
            'kpi_count', 'avg_kpi_progress', 'issue_count', 'resolved_issues',
            'open_issues', 'completion_ratio', 'issue_density', 'resolution_rate',
            'kpi_coverage', 'is_on_track', 'has_issues', 'high_kpi_coverage'
        ]
        
        X = df[feature_cols].fillna(0).astype(float)
        
        # Handle infinity values
        X = X.replace([np.inf, -np.inf], 0)
        
        if model_type == 'prediction':
            # Predict goal completion timing
            df['completion_days'] = np.where(
                df['status'] == 'completed',
                (df['end_date'] - df['created_at']).dt.days,
                df['days_elapsed']
            )
            y = df['completion_days'].fillna(30).astype(float)
            
        elif model_type == 'risk':
            # Classify risk level
            y = df['risk_score'].fillna(0).astype(int)
            
        elif model_type == 'anomaly':
            # Anomaly detection uses only X (unsupervised)
            return X, None
        
        return X, y

    def train_completion_model(self, df):
        """Train random forest model for goal completion prediction"""
        logger.info("[MODEL] Training goal completion prediction model...")
        
        X, y = self.prepare_X_y(df, model_type='prediction')
        
        if len(X) < 50:
            logger.warning(f"[WARNING] Only {len(X)} samples for completion model. Using synthetic data augmentation.")
            # Add synthetic samples if not enough data
            X_synthetic = np.random.rand(100 - len(X), X.shape[1]) * X.std().values + X.mean().values
            y_synthetic = np.random.randint(10, 120, 100 - len(X))
            X = np.vstack([X.values, X_synthetic])
            y = np.concatenate([y.values, y_synthetic])
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.completion_model = RandomForestRegressor(
            n_estimators=100,
            max_depth=20,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1
        )
        
        self.completion_model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = self.completion_model.predict(X_test_scaled)
        mae = mean_absolute_error(y_test, y_pred)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        
        self.training_metrics['completion_model'] = {
            'mae': mae,
            'rmse': rmse,
            'n_samples': len(X),
            'test_size': len(X_test)
        }
        
        logger.info(f"[OK] Completion Model Trained")
        logger.info(f"   - MAE: {mae:.2f} days")
        logger.info(f"   - RMSE: {rmse:.2f} days")
        logger.info(f"   - Training samples: {len(X_train)}, Test samples: {len(X_test)}")

    def train_risk_model(self, df):
        """Train gradient boosting model for risk classification"""
        logger.info("[MODEL] Training risk classification model...")
        
        X, y = self.prepare_X_y(df, model_type='risk')
        
        if len(X) < 30:
            logger.warning(f"[WARNING] Only {len(X)} samples for risk model. Using synthetic data augmentation.")
            X_synthetic = np.random.rand(50 - len(X), X.shape[1]) * X.std().values + X.mean().values
            y_synthetic = np.random.randint(0, 4, 50 - len(X))
            X = np.vstack([X.values, X_synthetic])
            y = np.concatenate([y.values, y_synthetic])
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y if len(np.unique(y)) > 1 else None
        )
        
        # Use existing scaler from completion model
        X_train_scaled = self.scaler.transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.risk_model = GradientBoostingClassifier(
            n_estimators=100,
            max_depth=5,
            learning_rate=0.1,
            random_state=42
        )
        
        self.risk_model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = self.risk_model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)
        
        self.training_metrics['risk_model'] = {
            'accuracy': accuracy,
            'f1_score': f1,
            'n_samples': len(X),
            'test_size': len(X_test)
        }
        
        logger.info(f"[OK] Risk Model Trained")
        logger.info(f"   - Accuracy: {accuracy:.2%}")
        logger.info(f"   - F1 Score: {f1:.2f}")
        logger.info(f"   - Training samples: {len(X_train)}, Test samples: {len(X_test)}")

    def train_anomaly_model(self, df):
        """Train isolation forest model for anomaly detection"""
        logger.info("[MODEL] Training anomaly detection model...")
        
        X, _ = self.prepare_X_y(df, model_type='anomaly')
        
        if len(X) < 100:
            logger.warning(f"[WARNING] Only {len(X)} samples for anomaly model. Using synthetic data.")
            X_synthetic = np.random.rand(100 - len(X), X.shape[1]) * X.std().values + X.mean().values
            X = np.vstack([X.values, X_synthetic])
        
        # Scale features
        X_scaled = self.anomaly_scaler.fit_transform(X)
        
        # Train model
        self.anomaly_model = IsolationForest(
            n_estimators=100,
            contamination=0.1,
            random_state=42,
            n_jobs=-1
        )
        
        self.anomaly_model.fit(X_scaled)
        
        # Evaluate on training set
        anomaly_predictions = self.anomaly_model.predict(X_scaled)
        n_anomalies = np.sum(anomaly_predictions == -1)
        
        self.training_metrics['anomaly_model'] = {
            'n_samples': len(X),
            'n_anomalies_detected': int(n_anomalies),
            'anomaly_percentage': f"{(n_anomalies / len(X) * 100):.1f}%"
        }
        
        logger.info(f"[OK] Anomaly Model Trained")
        logger.info(f"   - Training samples: {len(X)}")
        logger.info(f"   - Anomalies detected: {n_anomalies} ({n_anomalies/len(X)*100:.1f}%)")

    def save_models(self, using_synthetic_data=False):
        """Save trained models to disk"""
        logger.info("[SAVE] Saving trained models...")
        
        try:
            joblib.dump(self.completion_model, f'{self.model_path}/completion_model.pkl')
            joblib.dump(self.risk_model, f'{self.model_path}/risk_model.pkl')
            joblib.dump(self.anomaly_model, f'{self.model_path}/anomaly_model.pkl')
            joblib.dump(self.scaler, f'{self.model_path}/scaler.pkl')
            joblib.dump(self.anomaly_scaler, f'{self.model_path}/anomaly_scaler.pkl')
            
            logger.info(f"[OK] Models saved to {self.model_path}")
            
            # Save training metrics
            metrics_file = f'{self.model_path}/training_metrics.txt'
            with open(metrics_file, 'w') as f:
                f.write(f"Training Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                
                data_source = "Synthetic Data (Database Unavailable)" if using_synthetic_data else "Production Database"
                f.write(f"Data Source: {data_source}\n")
                
                try:
                    db_info = self.database_url.split('@')[-1].split(':')[0] if '@' in self.database_url else 'N/A'
                    f.write(f"Database Host: {db_info}\n\n")
                except:
                    f.write(f"Database Host: N/A\n\n")
                
                for model_name, metrics in self.training_metrics.items():
                    f.write(f"{model_name}:\n")
                    for key, value in metrics.items():
                        f.write(f"  {key}: {value}\n")
                    f.write("\n")
            
            logger.info(f"[OK] Training metrics saved to {metrics_file}")
            
        except Exception as e:
            logger.error(f"[ERROR] Error saving models: {e}")
            raise

    def display_summary(self, using_synthetic_data=False):
        """Display training summary"""
        logger.info("\n" + "="*60)
        logger.info("[SUCCESS] MODEL TRAINING COMPLETED SUCCESSFULLY")
        logger.info("="*60)
        
        if using_synthetic_data:
            logger.info("\n[DATA] SOURCE: Synthetic Data (Database Unavailable)")
            logger.info("[HINT] To train with production data, set DATABASE_URL environment variable:")
            logger.info("  export DATABASE_URL=postgresql://user:pass@host:5432/database")
        else:
            logger.info("\n[DATA] SOURCE: Production Database")
        for model_name, metrics in self.training_metrics.items():
            logger.info(f"\n{model_name}:")
            for key, value in metrics.items():
                if isinstance(value, float):
                    if key in ['accuracy', 'anomaly_percentage']:
                        logger.info(f"  ✓ {key}: {value:.1%}" if 'accuracy' in key else f"  ✓ {key}: {value}")
                    else:
                        logger.info(f"  ✓ {key}: {value:.2f}")
                else:
                    logger.info(f"  ✓ {key}: {value}")
        
        logger.info("\n" + "="*60)
        logger.info(f"[INFO] Model Path: {self.model_path}")
        logger.info("="*60 + "\n")

    def train_all(self):
        """Execute complete training pipeline"""
        try:
            logger.info("[START] KaryaSiddhi AI Model Training Pipeline")
            logger.info("="*60)
            
            # Try to connect to database
            conn = None
            df = None
            using_synthetic_data = False
            
            try:
                conn = self.connect_database()
                df = self.extract_training_data(conn)
                
                if df.empty:
                    logger.warning("[WARNING] No training data available in database. Using synthetic data augmentation.")
                    df = self.generate_synthetic_training_data()
                    using_synthetic_data = True
                else:
                    logger.info(f"[DATA] Dataset shape: {df.shape}")
                    logger.info(f"[DATA] Columns: {list(df.columns)[:10]}...")
                    
            except psycopg2.Error as db_error:
                logger.warning(f"[WARNING] Could not connect to database: {str(db_error)[:100]}")
                logger.warning("[INFO] Using synthetic training data instead.")
                df = self.generate_synthetic_training_data()
                using_synthetic_data = True
            
            if df is None:
                logger.error("[ERROR] Failed to prepare training data")
                return False
            
            # Engineer features
            df = self.engineer_features(df)
            
            # Train models
            self.train_completion_model(df)
            self.train_risk_model(df)
            self.train_anomaly_model(df)
            
            # Save models
            self.save_models(using_synthetic_data)
            
            # Display summary
            self.display_summary(using_synthetic_data)
            
            logger.info("[OK] Training pipeline completed successfully!")
            return True
            
        except Exception as e:
            logger.error(f"[ERROR] Training pipeline failed: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return False
        finally:
            if conn:
                conn.close()
                logger.info("[INFO] Database connection closed")


def main():
    """Main entry point"""
    trainer = ModelTrainer()
    success = trainer.train_all()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
