# Stage 1: Build the Frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./
ENV CI=false
RUN npm run build

# Stage 2: Build the Python Backend and Serve
FROM python:3.11-slim-bullseye
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Create a non-root user for Hugging Face Spaces
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR /home/user/app

# Copy backend source and built frontend
COPY --chown=user backend/ ./backend/
COPY --chown=user --from=frontend-build /app/frontend/build ./frontend/build

# Expose the port (HF Spaces uses 7860)
ENV PORT=7860
EXPOSE 7860

# Set working directory to backend
WORKDIR /home/user/app/backend

# Start the application using uvicorn
CMD ["python3", "-m", "uvicorn", "server:app", "--host", "0.0.0.0", "--port", "7860"]
