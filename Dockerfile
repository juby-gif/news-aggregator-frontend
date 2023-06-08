# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the React app
RUN npm run build

# Serve the React app using a static file server
RUN npm install -g serve

# Set the command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose the port
EXPOSE 3000
