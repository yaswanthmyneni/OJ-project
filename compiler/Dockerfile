FROM node:22-alpine

RUN apk add --no-cache \
    g++ \
    python3

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6000

CMD ["node", "server.js"]
