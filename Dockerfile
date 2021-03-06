FROM node:10.11.0-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
