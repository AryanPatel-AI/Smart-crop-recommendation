import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

const CROP_EMOJIS = {
  'Rice': '🌾', 'Wheat': '🌾', 'Maize': '🌽', 'Cotton': '☁️', 'Jute': '🌿',
  'Coffee': '☕', 'Tea': '🍃', 'Sugarcane': '🎋', 'Potato': '🥔', 'Tomato': '🍅',
  'Onion': '🧅', 'Apple': '🍎', 'Banana': '🍌', 'Mango': '🥭', 'Grapes': '🍇',
  'Orange': '🍊', 'Watermelon': '🍉', 'Papaya': '🍈', 'Coconut': '🥥',
  'Chickpea': '🥜', 'Lentil': '🍲', 'Soybean': '🫘'
};

const InputField = ({ label, name, value, onChange, placeholder, min, max }) => (
  <div className="input-group">
    <label htmlFor={name}>{label}</label>
    <input
      type="number"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step="0.01"
      required
    />
  </div>
);

function App() {
  const [formData, setFormData] = useState({
    N: 90, P: 42, K: 43,
    temperature: 20.8,
    humidity: 82.3,
    ph: 6.5,
    rainfall: 202.9
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) || 0 });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API}/predict`, formData);
      setPrediction(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to get prediction. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="glow-overlay" />
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Smart Crop</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          AI-powered soil analysis and crop recommendation system
        </p>
      </header>

      <main className="glass-card">
        <form onSubmit={handlePredict}>
          <h2 style={{ marginBottom: '2rem' }}>Soil & Climate Parameters</h2>
          <div className="input-grid">
            <InputField label="Nitrogen (N)" name="N" value={formData.N} onChange={handleInputChange} placeholder="e.g. 90" />
            <InputField label="Phosphorus (P)" name="P" value={formData.P} onChange={handleInputChange} placeholder="e.g. 42" />
            <InputField label="Potassium (K)" name="K" value={formData.K} onChange={handleInputChange} placeholder="e.g. 43" />
            <InputField label="Temperature (°C)" name="temperature" value={formData.temperature} onChange={handleInputChange} placeholder="e.g. 20.8" />
            <InputField label="Humidity (%)" name="humidity" value={formData.humidity} onChange={handleInputChange} placeholder="e.g. 82.3" />
            <InputField label="pH Level" name="ph" value={formData.ph} onChange={handleInputChange} placeholder="e.g. 6.5" min="0" max="14" />
            <InputField label="Rainfall (mm)" name="rainfall" value={formData.rainfall} onChange={handleInputChange} placeholder="e.g. 202.9" />
          </div>
          <button type="submit" className="btn-predict" disabled={loading}>
            {loading ? "Analyzing Data..." : "Generate Recommendation"}
          </button>
        </form>

        {error && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}

        {prediction && (
          <div className="result-container">
            <div className="crop-result-header">
              <div className="crop-icon">
                {CROP_EMOJIS[prediction.crop] || '🌱'}
              </div>
              <div>
                <span className="meta-label">Recommended Crop</span>
                <h2 style={{ fontSize: '2.5rem' }}>{prediction.crop}</h2>
              </div>
            </div>

            <div className="meta-grid">
              <div className="meta-item">
                <span className="meta-label">Description</span>
                <p className="meta-value">{prediction.metadata.description}</p>
              </div>
              <div className="meta-item">
                <span className="meta-label">Ideal Season</span>
                <p className="meta-value">{prediction.metadata.season}</p>
              </div>
              <div className="meta-item">
                <span className="meta-label">Fertilizer Guide (NPK)</span>
                <p className="meta-value" style={{ fontWeight: 600 }}>{prediction.metadata.fertilizer?.NPK}</p>
                <ul className="rec-list">
                  {prediction.metadata.fertilizer?.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
              <div className="meta-item">
                <span className="meta-label">Market Info</span>
                <p className="meta-value"><strong>Price:</strong> {prediction.metadata.price_range}</p>
                <p className="meta-value"><strong>Trend:</strong> {prediction.metadata.market_trend}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        &copy; 2024 Smart Crop AI. Built with precision and care.
      </footer>
    </div>
  );
}

export default App;
