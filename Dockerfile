FROM node:alpine

WORKDIR /usr/decks

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "server" ]