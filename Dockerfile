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

# Install build dependencies for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

# Copy backend package files
COPY backend/package*.json ./
RUN npm ci

# Copy backend source and build
COPY backend/ ./
RUN npm run build

# ---- Production ----
FROM node:20-alpine AS production
WORKDIR /app

# Install runtime dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

# Copy backend package files and install production dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev && apk del python3 make g++

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

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Start the server
CMD ["node", "dist/index.js"]
