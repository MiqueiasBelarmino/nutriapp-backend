FROM node:latest

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências (rodará postinstall e prisma generate)
RUN npm install

# Agora copie todo o código, incluindo prisma/schema.prisma
COPY . .

# Gere o Prisma Client (pode ser redundante, mas garante)
RUN npx prisma generate

# Compile o projeto TS
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
