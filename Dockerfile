FROM node:12-alpine3.12

WORKDIR /app
COPY package*.json ./

RUN npm install --production
COPY tsconfig.json ./
COPY . ./

ENV PORT 8080
EXPOSE 8080

CMD ["sh", "./entrypoint.sh"]
