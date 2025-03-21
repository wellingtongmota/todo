# Etapa 1: Construção
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build da aplicação
RUN npm run build

# Remove devDependencies para reduzir o tamanho da imagem
RUN npm prune --production

# Etapa 2: Execução
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos essenciais do estágio de construção
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instala apenas as dependências de produção (não é necessário instalar as devDependencies)
RUN npm install --only=production

# Se houver um arquivo .env necessário, copie-o também
COPY --from=builder /app/.env ./.env

# Expondo a porta do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
