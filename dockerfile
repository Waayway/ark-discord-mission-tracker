FROM node:20.2.0-alpine

COPY . /app

WORKDIR /app

RUN npm i

RUN npm run build

WORKDIR /app/build

CMD [ "node ." ]