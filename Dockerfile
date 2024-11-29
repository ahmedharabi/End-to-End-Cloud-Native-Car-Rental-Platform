FROM node:19

WORKDIR "/Users/thega/Desktop/Backend Projects/Node Express RestAPis/Car Rental system api"
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["nodemon", "app.js"]

