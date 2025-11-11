# Stage 1 — Build the app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm ci

# Copy the rest of your code and build Next.js
COPY . .
RUN npm run build

# Stage 2 — Run the app in production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what we need from the first stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
