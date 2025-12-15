import numpy as np
from datetime import datetime
from typing import Optional, List
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib
import os


class AnomalyDetector:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.model_path = os.getenv('MODEL_PATH', './models')
        self._load_or_initialize_model()

    def _load_or_initialize_model(self):
        """Load pre-trained model or initialize new one"""
        try:
            self.model = joblib.load(f'{self.model_path}/anomaly_model.pkl')
            self.scaler = joblib.load(f'{self.model_path}/anomaly_scaler.pkl')
        except:
            # Initialize new model with contamination rate
            self.model = IsolationForest(
                contamination=0.1,
                random_state=42,
                n_estimators=100
            )

    def detect_anomalies(
        self,
        user_id: Optional[str] = None,
        department_id: Optional[str] = None,
        severity_filter: Optional[str] = None
    ) -> List[dict]:
        """
        Detect anomalies in performance data
        """
        # Mock implementation - in production, this would analyze real-time data
        anomalies = [
            {
                "id": 1,
                "type": "performance_drop",
                "severity": "high",
                "description": "Significant decrease in productivity detected over the last 3 days (18% drop)",
                "detected_at": datetime.now().isoformat(),
                "affected_goals": ["1", "3"],
                "confidence": 91.2
            },
            {
                "id": 2,
                "type": "unusual_activity",
                "severity": "medium",
                "description": "Unusual pattern: No KPI updates for 5 consecutive days",
                "detected_at": datetime.now().isoformat(),
                "affected_goals": ["2"],
                "confidence": 85.7
            },
            {
                "id": 3,
                "type": "missed_deadline",
                "severity": "critical",
                "description": "Critical milestone missed for high-priority goal",
                "detected_at": datetime.now().isoformat(),
                "affected_goals": ["4"],
                "confidence": 95.3
            },
            {
                "id": 4,
                "type": "low_engagement",
                "severity": "low",
                "description": "Reduced team collaboration metrics detected",
                "detected_at": datetime.now().isoformat(),
                "affected_goals": ["5"],
                "confidence": 78.4
            }
        ]
        
        # Filter by severity if specified
        if severity_filter:
            anomalies = [a for a in anomalies if a['severity'] == severity_filter]
        
        return anomalies

    def train(self):
        """
        Train or retrain the anomaly detection model
        """
        # Mock training - in production, this would use historical data
        n_samples = 1000
        X_train = np.random.rand(n_samples, 8)
        
        # Add some anomalies
        n_anomalies = int(n_samples * 0.1)
        X_train[:n_anomalies] = X_train[:n_anomalies] * 3
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X_train)
        
        # Train model
        self.model.fit(X_scaled)
        
        # Save models
        os.makedirs(self.model_path, exist_ok=True)
        joblib.dump(self.model, f'{self.model_path}/anomaly_model.pkl')
        joblib.dump(self.scaler, f'{self.model_path}/anomaly_scaler.pkl')
        
        return True

    def calculate_anomaly_score(self, data: np.ndarray) -> float:
        """
        Calculate anomaly score for given data
        """
        if self.model is None:
            return 0.0
        
        data_scaled = self.scaler.transform(data.reshape(1, -1))
        score = self.model.score_samples(data_scaled)[0]
        
        # Convert to 0-100 scale
        normalized_score = min(100, max(0, (1 - abs(score)) * 100))
        
        return normalized_score
