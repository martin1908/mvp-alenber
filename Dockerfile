FROM node:6-slim

COPY . /nodebase
COPY package.json /nodebase/package.json
COPY .env.example /nodebase/.env.example

WORKDIR /nodebase

ENV NODE_ENV production
RUN npm install --production

CMD ["npm","start"]

EXPOSE 8888
