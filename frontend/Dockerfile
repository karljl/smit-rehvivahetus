FROM node:18 AS build

WORKDIR /app

COPY app/package*.json ./

COPY app/tsconfig*.json ./

RUN npm install

COPY app/ ./

RUN npm run build

FROM nginx:alpine

COPY app/src/configs/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
