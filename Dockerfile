FROM node:latest

RUN mkdir -p /usr/src/decks-api

WORKDIR /usr/src/decks-api

COPY . /usr/src/decks-api

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "start" ]