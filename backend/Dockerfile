FROM node:alpine

WORKDIR /app
COPY package.json .
RUN yarn
COPY ./src ./src
CMD yarn run start
