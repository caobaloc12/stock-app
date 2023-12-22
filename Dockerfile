# Start with the official Node.js image.
FROM node:18-alpine

# Set the working directory in the Docker image
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache python3 make g++ libc6-compat

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install

# Copy the rest of your app's source code to the working directory
COPY . .

# Build the app
RUN yarn build

# Expose the port that your app runs on
EXPOSE 3000

# Start the app
CMD [ "yarn", "start" ]
