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
# server/db/seed.js e server/db/contentFixes.js copiam essas imagens para
# server/uploads ao popular o conteúdo (seção-piloto e correções de conteúdo).
COPY src/assets/page16/diagram.png ./src/assets/page16/diagram.png
COPY src/assets/page10/image2.png ./src/assets/page10/image2.png
COPY src/assets/page10/image3.png ./src/assets/page10/image3.png
COPY src/assets/page12/image5.png ./src/assets/page12/image5.png
COPY src/assets/page14/design-sem-nome3-2.png ./src/assets/page14/design-sem-nome3-2.png
COPY src/assets/page19/preservativo-masculino.png ./src/assets/page19/preservativo-masculino.png

# Diretórios persistidos via volume (banco SQLite e uploads de imagem).
RUN mkdir -p server/data server/uploads

EXPOSE 3001

CMD ["node", "server/index.js"]
