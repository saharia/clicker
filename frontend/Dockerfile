FROM node:23

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy backend source code
COPY frontend/ ./

# Expose backend port
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]