FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN npm install
RUN npm run db:generate --workspace @kaistream/api
RUN npm run build --workspace @kaistream/api

EXPOSE 4000

CMD ["npm", "run", "start", "--workspace", "@kaistream/api"]
