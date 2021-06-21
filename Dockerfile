# syntax = docker/dockerfile:experimental
FROM node:15.5.1-alpine3.10 as builder

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN yarn install --ignore-engines --unsafe-perm

ENV NODE_ENV=production \ 
    GENERATE_SOURCEMAP=false \
    PUBLIC_URL=/dashboard/loans

RUN yarn build

FROM nginx:alpine as server
WORKDIR /usr/share/nginx/html/dashboard/loans

RUN apk add --no-cache gettext

COPY conf/app/conf.js.tpl ./
COPY conf/nginx/nginx-entrypoint.sh /
COPY conf/nginx/server.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build ./

EXPOSE 8080

ENTRYPOINT [ "sh", "/nginx-entrypoint.sh" ]
