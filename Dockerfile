# Use an official node runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . /app

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
