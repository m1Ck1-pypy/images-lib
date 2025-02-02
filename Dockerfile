# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.13.0

FROM node:${NODE_VERSION}

# Use production node environment by default.

WORKDIR /app
COPY package*.json ./

# Run the application as a non-root user.
# ENV NODE_ENV production

# Copy the rest of the source files into the image.
COPY ./backend/. /app/backend

EXPOSE 3000

# Run the application.
# RUN bun install
# CMD bun install
CMD ["bun", "dev:backend"]
