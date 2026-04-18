---
title: Smart Crop Recommendation
emoji: 🌱
colorFrom: green
colorTo: emerald
sdk: docker
pinned: false
app_port: 7860
---

# Smart Crop Recommendation

AI-powered soil analysis and crop recommendation system.

## Setup

This application is containerized using Docker and is ready for deployment on Hugging Face Spaces.

### Deployment Instructions

1. Create a new Space on [Hugging Face](https://huggingface.co/new-space).
2. Select **Docker** as the SDK.
3. Choose the **Blank** template or upload these files directly.
4. Once the files are pushed, Hugging Face will automatically build the Docker image and start the application.

### Features

- **Soil Analysis**: Input Nitrogen, Phosphorus, Potassium, and other soil metrics.
- **Climate Data**: Considers Temperature, Humidity, and Rainfall.
- **AI Recommendations**: Powered by a Scikit-Learn model to predict the most suitable crop.
- **Market Insights**: Provides price ranges, seasons, and fertilizer guides for each recommended crop.
- **Premium UI**: Modern, responsive interface with a high-intensity "Agri-Tech" theme.
