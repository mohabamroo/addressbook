FROM node:10.16.0-alpine

COPY package*.json ./
RUN npm install

COPY *.js ./
COPY *.crt ./
COPY *.env ./

EXPOSE 3000
CMD [ "npm", "run", "start" ]

