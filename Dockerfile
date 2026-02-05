# ---- Build Frontend ----
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# ---- Build Backend ----
FROM node:20-alpine AS backend-build
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./
RUN npm ci

# Copy backend source and build
COPY backend/ ./
RUN npm run build

# ---- Production ----
FROM node:20-alpine AS production
WORKDIR /app

# Install production dependencies only
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy built backend
COPY --from=backend-build /app/backend/dist ./dist

# Copy built frontend to be served by backend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Create data directory for SQLite
RUN mkdir -p /app/data

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV DATABASE_PATH=/app/data/kuixing.db

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "dist/index.js"]
