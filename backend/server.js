const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/smart_farming';
mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schemas
const RecommendationSchema = new mongoose.Schema({
  N: Number,
  P: Number,
  K: Number,
  temperature: Number,
  humidity: Number,
  ph: Number,
  rainfall: Number,
  recommendedCrop: String,
  fertilizer: String,
  wateringSchedule: String,
  timestamp: { type: Date, default: Date.now }
});

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

// Routes

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', message: 'Smart Farming Hub API is running' });
});

// 2. Crop Recommendation Logic (Mocked AI)
app.post('/api/recommend', async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    // Logic to pick a crop based on inputs
    let predictedCrop = 'Maize';
    if (ph < 7 && temperature > 25) {
      predictedCrop = 'Rice';
    } else if (N < 50 && rainfall < 50) {
      predictedCrop = 'Groundnut';
    } else if (temperature < 20) {
      predictedCrop = 'Wheat';
    } else if (P > 50) {
      predictedCrop = 'Cotton';
    }

    const mockData = {
      Rice: {
        crop: "Rice",
        description: "Rice is a staple grain crop grown in flooded fields, requiring warm temperatures and high humidity.",
        season: "Kharif (Monsoon)",
        npk: "80-120:40-60:40-60",
        fertilizer_tips: [
          "Apply Urea in 3 splits: basal, tillering, and panicle stage",
          "Use DAP or SSP as Phosphorus source",
          "Apply Potash (MOP) at basal stage",
          "Consider Zinc sulfate for better growth"
        ],
        market: {
          price: "₹2,500 - ₹3,500 per quintal",
          trend: "Stable with seasonal variations"
        }
      },
      Maize: {
        crop: "Maize",
        description: "Maize is a versatile cereal grain that is widely grown as a food source and industrial raw material.",
        season: "Kharif/Rabi",
        npk: "120-150:60:40-60",
        fertilizer_tips: [
          "Apply Urea in split doses for nitrogen efficiency",
          "Use Phosphorus at sowing time",
          "Maintain Potash levels for stalk strength",
          "Use micronutrients like Magnesium where needed"
        ],
        market: {
          price: "₹1,800 - ₹2,400 per quintal",
          trend: "Increasing due to industrial demand"
        }
      },
      Cotton: {
        crop: "Cotton",
        description: "Cotton is a fiber crop that thrives in black soil and requires moderate rainfall.",
        season: "Kharif",
        npk: "100-120:50-60:50-60",
        fertilizer_tips: [
          "Split Urea application based on growth stages",
          "Phosphorus is critical during early development",
          "Potash improves fiber quality",
          "Boron and Zinc are beneficial for boll formation"
        ],
        market: {
          price: "₹6,000 - ₹8,500 per quintal",
          trend: "Stable with high global demand"
        }
      },
      Wheat: {
        crop: "Wheat",
        description: "Wheat is a primary food staple, grown in cool seasons with moderate water requirements.",
        season: "Rabi (Winter)",
        npk: "120:60:40",
        fertilizer_tips: [
          "Basal dose of NPK at sowing",
          "Top dress with Urea after first irrigation",
          "Maintain soil moisture during grain filling stage",
          "Sulfur application improves protein content"
        ],
        market: {
          price: "₹2,125 - ₹2,500 per quintal",
          trend: "Increasing due to export demand"
        }
      }
    };

    const recommendation = mockData[predictedCrop] || {
      crop: predictedCrop,
      description: "A sustainable crop choice for your soil profile.",
      season: "Various",
      npk: "60-80:40:40",
      fertilizer_tips: ["Standard split urea application", "Use DAP as basal", "Apply Potash at sowing"],
      market: { price: "Market dependent", trend: "Stable" }
    };

    const newRec = new Recommendation({
      N, P, K,
      temperature,
      humidity,
      ph,
      rainfall,
      recommendedCrop: recommendation.crop,
      fertilizer: recommendation.npk,
      wateringSchedule: "Automated based on sensors"
    });

    await newRec.save();
    res.json({ success: true, data: recommendation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Recommendation failed' });
  }
});

// 3. Weather API Proxy (Mocking for now, can be connected to OpenWeatherMap)
app.get('/api/weather', async (req, res) => {
  try {
    // Mocking weather data to avoid needing an API key immediately
    const mockWeather = {
      current: {
        temp: 28,
        condition: 'Sunny',
        humidity: 65,
        wind: 12
      },
      forecast: [
        { day: 'Mon', temp: 29, condition: 'Sunny' },
        { day: 'Tue', temp: 30, condition: 'Partly Cloudy' },
        { day: 'Wed', temp: 27, condition: 'Rain' },
        { day: 'Thu', temp: 26, condition: 'Thunderstorm' },
        { day: 'Fri', temp: 28, condition: 'Cloudy' }
      ]
    };
    res.json(mockWeather);
  } catch (error) {
    res.status(500).json({ message: 'Weather data unavailable' });
  }
});

// 4. Get History
app.get('/api/history', async (req, res) => {
  try {
    const history = await Recommendation.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch history' });
  }
});

// 5. Serve Static Frontend
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
