FROM node:20.16-alpine3.19

WORKDIR /build

COPY package*.json .
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm","start"]