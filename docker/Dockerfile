FROM node:20.11.1 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG APP_URL
ARG APP_API_IP
ARG APP_KEYCLOAK_URL
ARG APP_KEYCLOAK_REALM
ARG APP_KEYCLOAK_CLIENT_ID

ENV APP_URL=${APP_URL}
ENV APP_API_IP=${APP_API_IP}
ENV APP_KEYCLOAK_URL=${APP_KEYCLOAK_URL}
ENV APP_KEYCLOAK_REALM=${APP_KEYCLOAK_REALM}
ENV APP_KEYCLOAK_CLIENT_ID=${APP_KEYCLOAK_CLIENT_ID}

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/my-family-net-front-ng /usr/share/nginx/html

EXPOSE 80