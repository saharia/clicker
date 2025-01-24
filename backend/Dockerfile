FROM node:23

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ ./

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "start:dev"]