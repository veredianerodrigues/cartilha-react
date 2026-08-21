import dotenv from 'dotenv';

// .env tem os valores "reais" (produção); .env.local, quando existe, sobrescreve
// por cima — é onde ficam as variáveis de desenvolvimento local (ex. DATABASE_URL
// apontando pro Postgres do docker-compose.dev.yml). .env.local nunca é commitado
// (ver .gitignore).
dotenv.config();
dotenv.config({ path: '.env.local', override: true });
