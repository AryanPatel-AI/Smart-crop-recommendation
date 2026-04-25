from fastapi import FastAPI, APIRouter, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import joblib
import json
import pandas as pd
from crop_data import CROP_INFO

# Setup directories and env
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Load Model
MODEL_PATH = ROOT_DIR / 'crop_model.pkl'
INFO_PATH = ROOT_DIR / 'model_info.json'

model = None
model_info = None

if MODEL_PATH.exists():
    try:
        model = joblib.load(MODEL_PATH)
        with open(INFO_PATH, 'r') as f:
            model_info = json.load(f)
        print("✅ ML Model loaded successfully")
    except Exception as e:
        print(f"❌ Failed to load ML model: {e}")

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'smart_farming')
client = None
db = None

try:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    print(f"✅ Connected to MongoDB: {db_name}")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")

# Models with defaults to support simpler forms
class CropInput(BaseModel):
    N: float = 50.0
    P: float = 50.0
    K: float = 50.0
    temperature: float = 25.0
    humidity: float = 70.0
    ph: float = 6.5
    rainfall: float = 100.0

class RecommendationRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
    recommendedCrop: str
    fertilizer: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# App setup
app = FastAPI(title="Smart Farming Hub API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")

@api_router.get("/health")
async def health_check():
    return {
        "status": "UP",
        "message": "Smart Farming Hub API is running",
        "model_loaded": model is not None,
        "database_connected": db is not None
    }

@api_router.post("/recommend")
async def recommend_crop(input: CropInput):
    if not model:
        raise HTTPException(status_code=500, detail="ML Model not loaded on server")
    
    try:
        # Prepare data for prediction
        input_data = input.model_dump()
        features = pd.DataFrame([input_data])
        
        # Predict using ML model
        prediction = model.predict(features)[0]
        
        # Get metadata from crop_data.py
        info = CROP_INFO.get(prediction, {
            "description": "A sustainable crop choice for your soil profile.",
            "season": "Various",
            "fertilizer": {"NPK": "Standard", "recommendations": []},
            "price_range": "Market dependent",
            "market_trend": "Stable"
        })
        
        # Unified response for both App.js and Dashboard.js
        response_data = {
            "crop": prediction,
            "description": info.get("description"),
            "season": info.get("season"),
            "npk": info.get("fertilizer", {}).get("NPK"),
            "fertilizer": info.get("fertilizer", {}).get("NPK"), # For Dashboard.js
            "fertilizer_tips": info.get("fertilizer", {}).get("recommendations", []),
            "insights": info.get("fertilizer", {}).get("recommendations", []), # For Dashboard.js
            "watering": "Optimized based on " + str(input_data['rainfall']) + "mm rainfall", # For Dashboard.js
            "market": {
                "price": info.get("price_range"),
                "trend": info.get("market_trend")
            }
        }
        
        # Save to MongoDB
        if db is not None:
            record = RecommendationRecord(
                **input_data,
                recommendedCrop=prediction,
                fertilizer=response_data["npk"]
            )
            doc = record.model_dump()
            doc['timestamp'] = doc['timestamp'].isoformat()
            await db.recommendations.insert_one(doc)
            
        return {"success": True, "data": response_data}
    except Exception as e:
        logging.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/history")
async def get_history():
    if db is None:
        return []
    try:
        cursor = db.recommendations.find({}, {"_id": 0}).sort("timestamp", -1).limit(10)
        history = await cursor.to_list(length=10)
        return history
    except Exception as e:
        logging.error(f"History fetch error: {e}")
        return []

@api_router.get("/weather")
async def get_weather():
    return {
        "current": {
            "temp": 28,
            "condition": 'Sunny',
            "humidity": 65,
            "wind": 12
        },
        "forecast": [
            { "day": 'Mon', "temp": 29, "condition": 'Sunny' },
            { "day": 'Tue', "temp": 30, "condition": 'Partly Cloudy' },
            { "day": 'Wed', "temp": 27, "condition": 'Rain' },
            { "day": 'Thu', "temp": 26, "condition": 'Thunderstorm' },
            { "day": 'Fri', "temp": 28, "condition": 'Cloudy' }
        ]
    }

app.include_router(api_router)

# Static Files
static_dir = ROOT_DIR.parent / "frontend" / "build"
if static_dir.exists():
    app.mount("/", StaticFiles(directory=str(static_dir), html=True), name="static")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str, request: Request):
        if not full_path.startswith("api"):
            index_path = static_dir / "index.html"
            if index_path.exists():
                return FileResponse(str(index_path))
        return {"error": "Not Found"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
