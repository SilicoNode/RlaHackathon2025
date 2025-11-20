import React, { useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:8000/predict'

const initialFormData = {
  Soil_Moisture: '',
  Ambient_Temperature: '',
  Soil_Temperature: '',
  Humidity: '',
  Light_Intensity: '',
  Soil_pH: '',
  Nitrogen_Level: '',
  Phosphorus_Level: '',
  Potassium_Level: '',
  Chlorophyll_Content: '',
  Electrochemical_Signal: ''
}

function App() {
  const [formData, setFormData] = useState(initialFormData)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors = {}
    let isValid = true

    Object.keys(formData).forEach(key => {
      const value = formData[key].trim()
      if (value === '') {
        errors[key] = 'This field is required'
        isValid = false
      } else {
        const numValue = parseFloat(value)
        if (isNaN(numValue)) {
          errors[key] = 'Must be a valid number'
          isValid = false
        }
      }
    })

    setValidationErrors(errors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setPrediction(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Convert all values to numbers
      const payload = {}
      Object.keys(formData).forEach(key => {
        payload[key] = parseFloat(formData[key])
      })

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Prediction failed')
      }

      const data = await response.json()
      setPrediction(data.prediction)
    } catch (err) {
      setError(err.message || 'An error occurred while making the prediction')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setPrediction(null)
    setError(null)
    setValidationErrors({})
  }

  const getPredictionClass = (pred) => {
    if (pred === 'Healthy') return 'prediction-healthy'
    if (pred === 'Moderate Stress') return 'prediction-moderate'
    if (pred === 'High Stress') return 'prediction-high'
    return ''
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🌱 Plant Health Prediction</h1>
          <p>Enter plant metrics to predict health status</p>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="Soil_Moisture">Soil Moisture *</label>
              <input
                type="number"
                id="Soil_Moisture"
                name="Soil_Moisture"
                value={formData.Soil_Moisture}
                onChange={handleChange}
                step="any"
                className={validationErrors.Soil_Moisture ? 'error' : ''}
              />
              {validationErrors.Soil_Moisture && (
                <span className="error-message">{validationErrors.Soil_Moisture}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Ambient_Temperature">Ambient Temperature (°C) *</label>
              <input
                type="number"
                id="Ambient_Temperature"
                name="Ambient_Temperature"
                value={formData.Ambient_Temperature}
                onChange={handleChange}
                step="any"
                className={validationErrors.Ambient_Temperature ? 'error' : ''}
              />
              {validationErrors.Ambient_Temperature && (
                <span className="error-message">{validationErrors.Ambient_Temperature}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Soil_Temperature">Soil Temperature (°C) *</label>
              <input
                type="number"
                id="Soil_Temperature"
                name="Soil_Temperature"
                value={formData.Soil_Temperature}
                onChange={handleChange}
                step="any"
                className={validationErrors.Soil_Temperature ? 'error' : ''}
              />
              {validationErrors.Soil_Temperature && (
                <span className="error-message">{validationErrors.Soil_Temperature}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Humidity">Humidity (%) *</label>
              <input
                type="number"
                id="Humidity"
                name="Humidity"
                value={formData.Humidity}
                onChange={handleChange}
                step="any"
                className={validationErrors.Humidity ? 'error' : ''}
              />
              {validationErrors.Humidity && (
                <span className="error-message">{validationErrors.Humidity}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Light_Intensity">Light Intensity *</label>
              <input
                type="number"
                id="Light_Intensity"
                name="Light_Intensity"
                value={formData.Light_Intensity}
                onChange={handleChange}
                step="any"
                className={validationErrors.Light_Intensity ? 'error' : ''}
              />
              {validationErrors.Light_Intensity && (
                <span className="error-message">{validationErrors.Light_Intensity}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Soil_pH">Soil pH *</label>
              <input
                type="number"
                id="Soil_pH"
                name="Soil_pH"
                value={formData.Soil_pH}
                onChange={handleChange}
                step="any"
                className={validationErrors.Soil_pH ? 'error' : ''}
              />
              {validationErrors.Soil_pH && (
                <span className="error-message">{validationErrors.Soil_pH}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Nitrogen_Level">Nitrogen Level *</label>
              <input
                type="number"
                id="Nitrogen_Level"
                name="Nitrogen_Level"
                value={formData.Nitrogen_Level}
                onChange={handleChange}
                step="any"
                className={validationErrors.Nitrogen_Level ? 'error' : ''}
              />
              {validationErrors.Nitrogen_Level && (
                <span className="error-message">{validationErrors.Nitrogen_Level}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Phosphorus_Level">Phosphorus Level *</label>
              <input
                type="number"
                id="Phosphorus_Level"
                name="Phosphorus_Level"
                value={formData.Phosphorus_Level}
                onChange={handleChange}
                step="any"
                className={validationErrors.Phosphorus_Level ? 'error' : ''}
              />
              {validationErrors.Phosphorus_Level && (
                <span className="error-message">{validationErrors.Phosphorus_Level}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Potassium_Level">Potassium Level *</label>
              <input
                type="number"
                id="Potassium_Level"
                name="Potassium_Level"
                value={formData.Potassium_Level}
                onChange={handleChange}
                step="any"
                className={validationErrors.Potassium_Level ? 'error' : ''}
              />
              {validationErrors.Potassium_Level && (
                <span className="error-message">{validationErrors.Potassium_Level}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Chlorophyll_Content">Chlorophyll Content *</label>
              <input
                type="number"
                id="Chlorophyll_Content"
                name="Chlorophyll_Content"
                value={formData.Chlorophyll_Content}
                onChange={handleChange}
                step="any"
                className={validationErrors.Chlorophyll_Content ? 'error' : ''}
              />
              {validationErrors.Chlorophyll_Content && (
                <span className="error-message">{validationErrors.Chlorophyll_Content}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="Electrochemical_Signal">Electrochemical Signal *</label>
              <input
                type="number"
                id="Electrochemical_Signal"
                name="Electrochemical_Signal"
                value={formData.Electrochemical_Signal}
                onChange={handleChange}
                step="any"
                className={validationErrors.Electrochemical_Signal ? 'error' : ''}
              />
              {validationErrors.Electrochemical_Signal && (
                <span className="error-message">{validationErrors.Electrochemical_Signal}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Predicting...' : 'Predict Health Status'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>

        {error && (
          <div className="result error-result">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {prediction && (
          <div className={`result prediction-result ${getPredictionClass(prediction)}`}>
            <h3>Prediction Result</h3>
            <div className="prediction-value">{prediction}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

