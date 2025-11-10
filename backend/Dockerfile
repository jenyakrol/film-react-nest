FROM node:22-alpine AS builder
WORKDIR /var/www/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:22-alpine
WORKDIR /var/www/app
COPY --from=builder /var/www/app/package*.json ./
RUN yarn --prod
COPY --from=builder /var/www/app/dist ./dist/
COPY --from=builder /var/www/app/public ./public/
EXPOSE 4000
CMD ["yarn", "start:prod"]