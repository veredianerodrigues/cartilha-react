# ---- Build: gera o site estático com o Vite ----
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Ids públicos do projeto Sanity, embutidos no bundle em tempo de build.
ARG VITE_SANITY_PROJECT_ID=0gjumgjk
ARG VITE_SANITY_DATASET=production
ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID \
    VITE_SANITY_DATASET=$VITE_SANITY_DATASET

COPY . .
RUN npm run build

# ---- Runtime: Nginx servindo o dist/ ----
FROM nginx:1.27-alpine AS runtime
RUN apk add --no-cache nodejs
ARG VITE_SANITY_PROJECT_ID=0gjumgjk
ARG VITE_SANITY_DATASET=production
ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID \
    VITE_SANITY_DATASET=$VITE_SANITY_DATASET
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY api /app/api
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]
