FROM node:20.8.1-alpine AS base

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN yarn build
RUN yarn install --production

FROM node:20.8.1-alpine

COPY --from=base ./node_modules ./node_modules
COPY --from=base ./dist ./dist

EXPOSE ${SERVER_PORT}
CMD ["node", "dist/server.js"]
