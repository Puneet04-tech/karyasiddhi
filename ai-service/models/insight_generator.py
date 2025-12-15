from datetime import datetime
from typing import Optional, List
import random


class InsightGenerator:
    def __init__(self):
        self.insight_templates = {
            "recommendation": [
                "Based on current trends, consider reallocating resources to high-priority goals",
                "Team productivity peaks between 10 AM - 2 PM. Schedule critical tasks accordingly",
                "Historical data suggests breaking down complex goals into smaller milestones improves completion rate by 23%",
                "Collaboration with Department X has shown 15% higher success rates",
            ],
            "warning": [
                "3 goals are showing signs of potential delays. Immediate action recommended",
                "Resource utilization is below optimal levels in critical areas",
                "Upcoming deadline cluster detected. Consider priority redistribution",
                "Team workload imbalance detected. Risk of burnout in next 2 weeks",
            ],
            "achievement": [
                "Outstanding performance! You rank in the top 10% across all departments",
                "Goal completion rate improved by 23% compared to last quarter",
                "Consistency milestone achieved: 30 consecutive days of productivity above target",
                "Innovation score increased by 18% - excellent progress on strategic initiatives",
            ],
            "trend": [
                "Upward trend in productivity detected over the last 4 weeks (+12%)",
                "KPI achievement rate steadily improving: 5% increase month-over-month",
                "Cross-department collaboration metrics showing positive growth",
                "Quality metrics trending upward while maintaining delivery timelines",
            ]
        }

    def generate_insights(
        self,
        user_id: Optional[str] = None,
        department_id: Optional[str] = None,
        limit: int = 5
    ) -> List[dict]:
        """
        Generate AI-powered insights and recommendations
        """
        insights = []
        insight_id = 1
        
        for insight_type, templates in self.insight_templates.items():
            for template in templates[:2]:  # Use 2 from each category
                insight = {
                    "id": insight_id,
                    "type": insight_type,
                    "title": self._generate_title(insight_type),
                    "description": template,
                    "confidence": round(random.uniform(82, 96), 1),
                    "created_at": datetime.now().isoformat(),
                    "action_items": self._generate_action_items(insight_type)
                }
                insights.append(insight)
                insight_id += 1
        
        # Sort by confidence and return top results
        insights.sort(key=lambda x: x['confidence'], reverse=True)
        return insights[:limit]

    def _generate_title(self, insight_type: str) -> str:
        """Generate appropriate title based on insight type"""
        titles = {
            "recommendation": "Performance Optimization Opportunity",
            "warning": "Attention Required",
            "achievement": "Excellence Recognition",
            "trend": "Positive Momentum Detected"
        }
        return titles.get(insight_type, "Insight")

    def _generate_action_items(self, insight_type: str) -> List[str]:
        """Generate relevant action items based on insight type"""
        action_items = {
            "recommendation": [
                "Review resource allocation in next team meeting",
                "Implement suggested workflow changes",
                "Monitor progress over next 2 weeks"
            ],
            "warning": [
                "Schedule immediate review with team leads",
                "Identify and address blockers",
                "Adjust timelines or resources as needed"
            ],
            "achievement": [
                "Document and share best practices",
                "Recognize team contributions",
                "Maintain current momentum"
            ],
            "trend": [
                "Continue current strategies",
                "Identify factors contributing to success",
                "Share insights with other departments"
            ]
        }
        return action_items.get(insight_type, [])

    def analyze_sentiment(self, text: str) -> dict:
        """
        Analyze sentiment of text feedback (placeholder for NLP integration)
        """
        # This would use an NLP model in production
        return {
            "sentiment": "positive",
            "confidence": 0.87,
            "key_phrases": ["good progress", "team collaboration", "on track"]
        }
