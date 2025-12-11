# syntax = docker/dockerfile:1

FROM node:20-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

# Deps stage: Install prod deps only
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production --ignore-scripts  # Prune devDeps and skip scripts that build tests

# Builder stage: Build with prod deps
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production image (tiny + secure)
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Standalone output + static files + config (needed for remotePatterns at runtime)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", "server.js"]