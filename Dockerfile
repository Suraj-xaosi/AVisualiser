# --------- Builder stage ----------
FROM node:24.13.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Copy rest of the source
COPY . .

# Build
RUN npm run build

# --------- Runner stage ----------
FROM node:24.13.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only what is needed from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
