# Stage 1: Build the Frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./
ENV CI=false
RUN npm run build

# Stage 2: Build the Backend and Serve
FROM node:20-slim
WORKDIR /app

# Install dependencies for backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production --legacy-peer-deps

# Copy backend source
COPY backend/ ./

# Copy built frontend from Stage 1
COPY --from=frontend-build /app/frontend/build /app/frontend/build

# Expose the port (HF Spaces will set PORT environment variable)
ENV PORT=7860
EXPOSE 7860

# Start the application
CMD ["node", "server.js"]
