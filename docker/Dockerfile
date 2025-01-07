FROM node:20.11.1 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/my-family-net-front-ng/browser /usr/share/nginx/html

EXPOSE 80