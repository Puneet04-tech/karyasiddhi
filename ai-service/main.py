from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import uvicorn
import os

from models.prediction_model import PredictionModel
from models.anomaly_detector import AnomalyDetector
from models.insight_generator import InsightGenerator
from schemas import (
    PredictionResponse,
    AnomalyResponse,
    InsightResponse,
    ProductivityScoreResponse
)

app = FastAPI(
    title="KaryaSiddhi AI Service",
    description="AI-powered analytics for government performance management",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI models
prediction_model = PredictionModel()
anomaly_detector = AnomalyDetector()
insight_generator = InsightGenerator()


@app.get("/")
async def root():
    return {
        "message": "KaryaSiddhi AI Service",
        "version": "1.0.0",
        "status": "operational"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "models": {
            "prediction": "loaded",
            "anomaly_detection": "loaded",
            "insight_generation": "loaded"
        }
    }


@app.get("/predictions", response_model=List[PredictionResponse])
async def get_predictions(
    user_id: Optional[str] = Query(None),
    department_id: Optional[str] = Query(None),
    limit: int = Query(10, ge=1, le=100)
):
    """
    Get AI-powered goal completion predictions
    """
    try:
        predictions = prediction_model.predict_goal_completion(
            user_id=user_id,
            department_id=department_id,
            limit=limit
        )
        return predictions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/anomalies", response_model=List[AnomalyResponse])
async def get_anomalies(
    user_id: Optional[str] = Query(None),
    department_id: Optional[str] = Query(None),
    severity: Optional[str] = Query(None)
):
    """
    Detect anomalies in performance data
    """
    try:
        anomalies = anomaly_detector.detect_anomalies(
            user_id=user_id,
            department_id=department_id,
            severity_filter=severity
        )
        return anomalies
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/insights", response_model=List[InsightResponse])
async def get_insights(
    user_id: Optional[str] = Query(None),
    department_id: Optional[str] = Query(None),
    limit: int = Query(5, ge=1, le=20)
):
    """
    Generate AI-powered insights and recommendations
    """
    try:
        insights = insight_generator.generate_insights(
            user_id=user_id,
            department_id=department_id,
            limit=limit
        )
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/productivity-score", response_model=ProductivityScoreResponse)
async def calculate_productivity_score(
    user_id: Optional[str] = Query(None),
    department_id: Optional[str] = Query(None)
):
    """
    Calculate productivity score using AI
    """
    try:
        score_data = prediction_model.calculate_productivity_score(
            user_id=user_id,
            department_id=department_id
        )
        return score_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/train-models")
async def train_models():
    """
    Retrain AI models with latest data
    """
    try:
        prediction_model.train()
        anomaly_detector.train()
        return {
            "status": "success",
            "message": "Models retrained successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
