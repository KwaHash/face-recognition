# Use Node.js 20 as the base image
FROM node:20-alpine AS base

# Install system dependencies required for 'sharp' and other packages
RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat \
  libjpeg-turbo-dev \
  libpng-dev \
  vips-dev \
  zlib-dev

WORKDIR /app

# Install dependencies based on the preferred package manager
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Production image, copy all the files and run next dev
FROM base AS production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Create necessary directories and ensure proper permissions
RUN mkdir -p /app/public/uploads && chmod -R 777 /app/public/uploads
EXPOSE 3000

CMD ["npm", "run", "dev"]