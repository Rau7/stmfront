FROM node:16.19-buster-slim AS builder

WORKDIR /usr/src/stmfront
COPY . .
RUN npm ci
RUN npx ng build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/stmfront/dist/stmfront /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]