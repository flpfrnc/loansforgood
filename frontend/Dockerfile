FROM node:16.20.0-alpine

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install 

COPY . ./

EXPOSE 3000

ENV CI=true

RUN npm run test