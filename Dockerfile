FROM node:16.16.0 as build

WORKDIR /usr/local/crudapp/client

COPY ./ /usr/local/crudapp/client/

RUN npm install
RUN npm run build


FROM nginx:latest

COPY --from=build /usr/local/crudapp/client/dist/crudapplication/ /usr/share/nginx/html

EXPOSE 80