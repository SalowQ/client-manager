FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm i -g serve

COPY . .

RUN npm rebuild esbuild
RUN npm run build

EXPOSE 3003

CMD ["serve", "-s", "dist", "-l", "3003"]
