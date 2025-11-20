from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np

# ---------------------------------------------------------
# FastAPI Initialization
# ---------------------------------------------------------
app = FastAPI(title="Plant Health Prediction API", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Load Model & Scaler
# ---------------------------------------------------------
MODEL_PATH = "best_model.pkl"
SCALER_PATH = "scaler.pkl"

try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

try:
    scaler = joblib.load(SCALER_PATH)
    print("Scaler loaded")
except Exception as e:
    print(f"Error loading scaler: {e}")
    scaler = None

# ---------------------------------------------------------
# Feature Order (AFTER REMOVING Plant_ID)
# ---------------------------------------------------------
FEATURE_ORDER = [
    "Soil_Moisture",
    "Ambient_Temperature",
    "Soil_Temperature",
    "Humidity",
    "Light_Intensity",
    "Soil_pH",
    "Nitrogen_Level",
    "Phosphorus_Level",
    "Potassium_Level",
    "Chlorophyll_Content",
    "Electrochemical_Signal"
]

# ---------------------------------------------------------
# Pydantic Input Model
# ---------------------------------------------------------
class PlantMetrics(BaseModel):
    Soil_Moisture: float
    Ambient_Temperature: float
    Soil_Temperature: float
    Humidity: float
    Light_Intensity: float
    Soil_pH: float
    Nitrogen_Level: float
    Phosphorus_Level: float
    Potassium_Level: float
    Chlorophyll_Content: float
    Electrochemical_Signal: float

class PredictionResponse(BaseModel):
    prediction: str

# Label Map
label_map = {
    0: "Healthy",
    1: "Moderate Stress",
    2: "High Stress"
}

# ---------------------------------------------------------
# Routes
# ---------------------------------------------------------
@app.get("/")
async def root():
    return {"status": "running"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(metrics: PlantMetrics):

    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    if scaler is None:
        raise HTTPException(status_code=500, detail="Scaler not loaded")

    try:
        input_dict = metrics.model_dump()

        feature_array = np.array([input_dict[f] for f in FEATURE_ORDER]).reshape(1, -1)
        scaled = scaler.transform(feature_array)

        pred_num = int(model.predict(scaled)[0])
        pred_label = label_map[pred_num]

        return PredictionResponse(prediction=pred_label)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
