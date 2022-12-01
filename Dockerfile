FROM node:14.17.0

WORKDIR /cuttlesystems

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build:prod

