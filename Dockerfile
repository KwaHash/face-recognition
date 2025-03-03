# Use Node.js 20 as the base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Install PM2 globally
RUN npm install -g pm2

RUN addgroup --system --gid 1001 face-recognition
RUN adduser --system --uid 1001 face-recognition

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown face-recognition:face-recognition .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=face-recognition:face-recognition /app/.next/standalone ./
COPY --from=builder --chown=face-recognition:face-recognition /app/.next/static ./.next/static

USER face-recognition

EXPOSE 3000
ENV PORT 3000

# Start the application using PM2
CMD ["pm2-runtime", "npm", "--", "start"]