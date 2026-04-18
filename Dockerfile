# Stage 1: Build Frontend
FROM node:18 as build-stage
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve Backend & Frontend
FROM python:3.10-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code (includes models and data)
COPY backend/ ./backend/

# Copy built frontend to backend/static for FastAPI to serve
COPY --from=build-stage /app/frontend/build ./backend/static

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=7860

# Expose the port used by Hugging Face Spaces
EXPOSE 7860

# Start the FastAPI server using Uvicorn
CMD ["uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "7860"]
