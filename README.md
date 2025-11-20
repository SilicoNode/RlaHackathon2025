# Plant Health Prediction Web Application

A complete web application for predicting plant health status using a trained machine learning model. The application consists of a FastAPI backend and a React frontend.

## Features

- 🌱 Predict plant health status (Healthy, Moderate Stress, High Stress)
- 📊 Input 11 different plant metrics
- ✅ Form validation for all inputs
- 🎨 Modern, responsive UI
- 🔒 Type-safe API with Pydantic validation
- 🚀 Fast and efficient prediction

## Project Structure

```
.
├── backend/
│   ├── app.py              # FastAPI application
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── App.css         # Styles
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
├── best_model.pkl          # Trained ML model
└── README.md               # This file
```

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Verify that `best_model.pkl` is in the root directory (one level up from backend)

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server

1. Make sure you're in the backend directory and your virtual environment is activated
2. Run the FastAPI server:
   ```bash
   uvicorn app:app --reload
   ```

   The backend will be available at `http://localhost:8000`

   You can also access:
   - API documentation: `http://localhost:8000/docs` (Swagger UI)
   - Alternative docs: `http://localhost:8000/redoc`

### Start the Frontend Server

1. Open a new terminal window
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## Testing the Application

### Using the Web Interface

1. Open your browser and go to `http://localhost:3000`
2. Fill in all the required fields with plant metrics:
   - Soil_Moisture
   - Ambient_Temperature
   - Soil_Temperature
   - Humidity
   - Light_Intensity
   - Soil_pH
   - Nitrogen_Level
   - Phosphorus_Level
   - Potassium_Level
   - Chlorophyll_Content
   - Electrochemical_Signal
3. Click "Predict Health Status"
4. View the prediction result

### Example Input Values

You can use these example values for testing:

```json
{
  "Soil_Moisture": 27.52,
  "Ambient_Temperature": 22.24,
  "Soil_Temperature": 21.90,
  "Humidity": 55.29,
  "Light_Intensity": 556.17,
  "Soil_pH": 5.58,
  "Nitrogen_Level": 10.00,
  "Phosphorus_Level": 45.80,
  "Potassium_Level": 39.07,
  "Chlorophyll_Content": 35.70,
  "Electrochemical_Signal": 0.94
}
```

### Testing the API Directly

You can test the API endpoint using curl:

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "Soil_Moisture": 27.52,
    "Ambient_Temperature": 22.24,
    "Soil_Temperature": 21.90,
    "Humidity": 55.29,
    "Light_Intensity": 556.17,
    "Soil_pH": 5.58,
    "Nitrogen_Level": 10.00,
    "Phosphorus_Level": 45.80,
    "Potassium_Level": 39.07,
    "Chlorophyll_Content": 35.70,
    "Electrochemical_Signal": 0.94
  }'
```

Expected response:
```json
{
  "prediction": "Moderate Stress"
}
```

Or use the interactive API documentation at `http://localhost:8000/docs`

## API Endpoints

### POST /predict

Predicts plant health status based on input metrics.

**Request Body:**
```json
{
  "Soil_Moisture": 27.52,
  "Ambient_Temperature": 22.24,
  "Soil_Temperature": 21.90,
  "Humidity": 55.29,
  "Light_Intensity": 556.17,
  "Soil_pH": 5.58,
  "Nitrogen_Level": 10.00,
  "Phosphorus_Level": 45.80,
  "Potassium_Level": 39.07,
  "Chlorophyll_Content": 35.70,
  "Electrochemical_Signal": 0.94
}
```

**Response:**
```json
{
  "prediction": "Healthy" | "Moderate Stress" | "High Stress"
}
```

### GET /

Returns API status and information.

### GET /health

Health check endpoint.

## Troubleshooting

### Backend Issues

1. **Model not found**: Ensure `best_model.pkl` is in the root directory (same level as `backend` folder)
2. **Port already in use**: Change the port in `uvicorn app:app --reload --port 8001`
3. **Import errors**: Make sure all dependencies are installed: `pip install -r requirements.txt`

### Frontend Issues

1. **Cannot connect to API**: 
   - Ensure the backend is running on port 8000
   - Check CORS settings in `backend/app.py` if using a different port
2. **Port already in use**: Change the port in `frontend/vite.config.js`
3. **Module not found**: Run `npm install` in the frontend directory

### CORS Issues

If you encounter CORS errors, make sure the frontend URL is included in the `allow_origins` list in `backend/app.py`.

## Production Deployment

For production deployment:

1. **Backend**: Use a production ASGI server like Gunicorn with Uvicorn workers
2. **Frontend**: Build the React app with `npm run build` and serve the static files
3. **Environment Variables**: Use environment variables for configuration
4. **Security**: Add authentication, rate limiting, and HTTPS

## Technologies Used

- **Backend**: FastAPI, Pydantic, Joblib, NumPy
- **Frontend**: React, Vite
- **ML**: Scikit-learn (via joblib)

## License

This project is provided as-is for the RLA Hackathon 2025.

