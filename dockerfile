FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN mkdir -p /usr/src/app/src
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=0 /usr/src/app/dist/ .
EXPOSE 8080
CMD [ "node", "index.js" ]