from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum


class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AnomalySeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AnomalyType(str, Enum):
    PERFORMANCE_DROP = "performance_drop"
    UNUSUAL_ACTIVITY = "unusual_activity"
    MISSED_DEADLINE = "missed_deadline"
    LOW_ENGAGEMENT = "low_engagement"


class InsightType(str, Enum):
    RECOMMENDATION = "recommendation"
    WARNING = "warning"
    ACHIEVEMENT = "achievement"
    TREND = "trend"


class PredictionResponse(BaseModel):
    id: int
    goal_id: str
    goal_title: str
    predicted_completion: str
    original_deadline: str
    confidence: float = Field(..., ge=0, le=100)
    risk_level: RiskLevel
    factors: List[str]


class AnomalyResponse(BaseModel):
    id: int
    type: AnomalyType
    severity: AnomalySeverity
    description: str
    detected_at: datetime
    affected_goals: List[str]
    confidence: float = Field(..., ge=0, le=100)


class InsightResponse(BaseModel):
    id: int
    type: InsightType
    title: str
    description: str
    confidence: float = Field(..., ge=0, le=100)
    created_at: datetime
    action_items: Optional[List[str]] = None


class ProductivityScoreResponse(BaseModel):
    score: float = Field(..., ge=0, le=100)
    trend: float
    factors: dict
    recommendations: List[str]
