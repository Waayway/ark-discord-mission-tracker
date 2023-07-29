FROM node:20.2.0-alpine

COPY . /app

WORKDIR /app

RUN npm i

RUN npm run build

RUN npx prisma generate

WORKDIR /app/build

CMD [ "sh", "../migrate-and-start.sh" ]