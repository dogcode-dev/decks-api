FROM node:latest

RUN mkdir -p /usr/src/decks

WORKDIR /usr/src/decks

COPY . /usr/src/decks

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "start" ]