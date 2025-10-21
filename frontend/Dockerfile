# ====== Build stage ======
# Use standard Node.js (not Alpine) to avoid Rollup native binary issues in musl libc
FROM node:18 AS build
WORKDIR /app

# Accept API URL at build time and expose it so Vite can read it
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copy package files first for better Docker layer caching
COPY package*.json ./
# Install all deps (including dev for build) to ensure native binaries work
RUN npm ci
# Copy source code and build the app
COPY . .
RUN npm run build

# ====== Run stage ======
# Serve the built app with nginx Alpine (lightweight static server)
FROM nginx:alpine
# Copy built files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 for nginx
EXPOSE 80
# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
