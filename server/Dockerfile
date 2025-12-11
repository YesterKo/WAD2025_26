# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app/server

# Copy backend code
COPY ./server/ ./

# Copy package.json and package-lock.json from project root
COPY ../package.json ../package-lock.json /app/

# Install dependencies from /app (root)
WORKDIR /app
RUN npm install --production

# Set working directory back to backend
WORKDIR /app/server

# Expose backend port
EXPOSE 3000

# Start backend server
CMD ["node", "server.js"]
