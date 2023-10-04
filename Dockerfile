FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
FROM nginx:latest
COPY --from=builder /app/dist/busy-bee/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf