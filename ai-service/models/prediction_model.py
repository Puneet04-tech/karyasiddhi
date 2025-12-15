import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Optional, List
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os


class PredictionModel:
    def __init__(self):
        self.completion_model = None
        self.risk_model = None
        self.scaler = StandardScaler()
        self.model_path = os.getenv('MODEL_PATH', './models')
        self._load_or_initialize_models()

    def _load_or_initialize_models(self):
        """Load pre-trained models or initialize new ones"""
        try:
            self.completion_model = joblib.load(f'{self.model_path}/completion_model.pkl')
            self.risk_model = joblib.load(f'{self.model_path}/risk_model.pkl')
            self.scaler = joblib.load(f'{self.model_path}/scaler.pkl')
        except:
            # Initialize new models if not found
            self.completion_model = RandomForestRegressor(n_estimators=100, random_state=42)
            self.risk_model = GradientBoostingClassifier(n_estimators=100, random_state=42)

    def predict_goal_completion(
        self, 
        user_id: Optional[str] = None,
        department_id: Optional[str] = None,
        limit: int = 10
    ) -> List[dict]:
        """
        Predict goal completion dates and risk levels
        """
        # Mock implementation - in production, this would query the database
        predictions = [
            {
                "id": 1,
                "goal_id": "1",
                "goal_title": "Digital Infrastructure Modernization",
                "predicted_completion": (datetime.now() + timedelta(days=75)).strftime("%Y-%m-%d"),
                "original_deadline": (datetime.now() + timedelta(days=90)).strftime("%Y-%m-%d"),
                "confidence": 92.5,
                "risk_level": "low",
                "factors": [
                    "Strong team performance (+15%)",
                    "Adequate resource allocation",
                    "Clear milestone tracking",
                    "Historical completion rate: 89%"
                ]
            },
            {
                "id": 2,
                "goal_id": "2",
                "goal_title": "Citizen Service Portal Enhancement",
                "predicted_completion": (datetime.now() + timedelta(days=55)).strftime("%Y-%m-%d"),
                "original_deadline": (datetime.now() + timedelta(days=60)).strftime("%Y-%m-%d"),
                "confidence": 88.3,
                "risk_level": "medium",
                "factors": [
                    "Good progress rate (+8%)",
                    "Minor resource constraints",
                    "Team collaboration: high",
                    "Technical complexity: moderate"
                ]
            },
            {
                "id": 3,
                "goal_id": "4",
                "goal_title": "Cybersecurity Framework Upgrade",
                "predicted_completion": (datetime.now() + timedelta(days=50)).strftime("%Y-%m-%d"),
                "original_deadline": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d"),
                "confidence": 78.9,
                "risk_level": "high",
                "factors": [
                    "Below expected progress (-12%)",
                    "Resource constraints detected",
                    "Technical dependencies",
                    "Requires additional support"
                ]
            }
        ]
        
        return predictions[:limit]

    def calculate_productivity_score(
        self,
        user_id: Optional[str] = None,
        department_id: Optional[str] = None
    ) -> dict:
        """
        Calculate productivity score using multiple factors
        """
        # Mock calculation - in production, this would analyze real data
        base_score = 87.5
        trend = 5.2
        
        factors = {
            "goal_completion_rate": 0.32,  # 32% weight
            "kpi_achievement": 0.28,       # 28% weight
            "timeliness": 0.25,            # 25% weight
            "quality_metrics": 0.15        # 15% weight
        }
        
        recommendations = [
            "Maintain current pace to exceed quarterly targets",
            "Consider delegating 2 lower-priority tasks",
            "Schedule review for delayed cybersecurity goal",
            "Excellent collaboration metrics - share best practices"
        ]
        
        return {
            "score": base_score,
            "trend": trend,
            "factors": factors,
            "recommendations": recommendations
        }

    def train(self):
        """
        Train or retrain the prediction models
        """
        # Mock training - in production, this would use historical data
        # Generate synthetic training data
        n_samples = 1000
        X_train = np.random.rand(n_samples, 10)
        y_completion = np.random.randint(0, 100, n_samples)
        y_risk = np.random.randint(0, 4, n_samples)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X_train)
        
        # Train models
        self.completion_model.fit(X_scaled, y_completion)
        self.risk_model.fit(X_scaled, y_risk)
        
        # Save models
        os.makedirs(self.model_path, exist_ok=True)
        joblib.dump(self.completion_model, f'{self.model_path}/completion_model.pkl')
        joblib.dump(self.risk_model, f'{self.model_path}/risk_model.pkl')
        joblib.dump(self.scaler, f'{self.model_path}/scaler.pkl')
        
        return True
