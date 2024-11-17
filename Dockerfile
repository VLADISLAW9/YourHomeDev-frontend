FROM node:20.11.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist"]