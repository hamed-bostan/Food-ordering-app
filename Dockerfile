# syntax=docker/dockerfile:1
FROM node:24-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
# -------------------------
# Deps: install ALL deps
# -------------------------
FROM base AS deps
Add libc6-compat for Alpine compatibility with some Node packages
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci
# -------------------------
# Builder
# -------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build
# -------------------------
# Runner (small & secure)
# -------------------------
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs 
&& adduser --system --uid 1001 nextjs
# Standalone output
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]