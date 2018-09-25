FROM node:10.11.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
RUN npm run build

COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]
