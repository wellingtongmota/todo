# Stage 1: Build the application
FROM node:24-alpine AS builder

WORKDIR /app

# Copia apenas o necessário para instalar dependências (cache eficiente)
COPY package.json package-lock.json* ./
RUN npm install --force

# Copia o restante do código e o esquema do Prisma
COPY . .

# Gera o Prisma Client (essencial para o código TypeScript/Next.js)
RUN npx prisma generate

# Build da aplicação Next.js
RUN npm run build

# Stage 2: Run the application
FROM node:24-alpine AS runner

WORKDIR /app

# Define variável de ambiente para produção
ENV NODE_ENV=production

# Copia arquivos necessários do estágio builder 
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.env .env
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Expor a porta do Next.js
EXPOSE 3000

CMD npx prisma migrate deploy && npm start