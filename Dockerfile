FROM node:20.15.1-alpine as base

WORKDIR /server

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

ARG PORT

RUN yarn run build

EXPOSE $PORT

CMD yarn migrate:up && yarn seed:run && yarn start:dev
