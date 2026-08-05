# ---- Build stage: instala deps (com toolchain p/ compilar better-sqlite3) e gera o build do Vite ----
# Debian (glibc), não Alpine: o binário nativo do better-sqlite3 dá segfault rodando sobre musl.
FROM node:20-bookworm-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci
# Garante que o binário nativo seja compilado neste mesmo ambiente (glibc/Debian),
# em vez de confiar num prebuild que pode ter sido linkado para outra libc.
RUN npm rebuild better-sqlite3 --build-from-source

COPY . .
RUN npm run build

# ---- Runtime stage: só o necessário para rodar o servidor Express ----
FROM node:20-bookworm-slim AS runtime
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
