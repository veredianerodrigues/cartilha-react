# ---- Build stage: instala deps (com toolchain p/ compilar better-sqlite3) e gera o build do Vite ----
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime stage: só o necessário para rodar o servidor Express ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY server ./server

# Diretórios persistidos via volume (banco SQLite e uploads de imagem).
RUN mkdir -p server/data server/uploads

EXPOSE 3001

CMD ["node", "server/index.js"]
