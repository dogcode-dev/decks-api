FROM node:latest

RUN apt-get update && \
    apt-get upgrade

#RUN mkdir -p /usr/decks

WORKDIR /decks

COPY package.json ./

RUN yarn

COPY . /decks

EXPOSE 4000

CMD [ "yarn", "server" ]