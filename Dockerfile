# Build stage
FROM node:12.18.4-alpine3.11 as base
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# Development
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "run", "dev"]

FROM dev as build
COPY . .
RUN tsc

FROM base as prod
COPY --from=build /app/build .
CMD ["node", "server.js"]
