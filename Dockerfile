FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]
