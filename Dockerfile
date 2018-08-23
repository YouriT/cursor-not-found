# -- BASE --
FROM alpine:3.7 AS base
RUN apk add --no-cache nodejs tini ca-certificates && npm install -g yarn
ENV DB_URI="mongodb://mongo:27017/some-db"
# Create app directory
WORKDIR /app
ENTRYPOINT ["/sbin/tini", "--"]
COPY package.json yarn.lock ./

# -- DEPENDENCIES --
FROM base AS dependencies
RUN yarn -q --production --modules-folder node_modules_prod
RUN yarn -q

# -- TEST --
FROM dependencies AS test
COPY tsconfig.json ./
COPY src src
RUN yarn build

# -- DEV --
FROM dependencies AS dev
COPY tsconfig.json ./
COPY src src

# -- RELEASE --
FROM base AS release
COPY --from=dependencies /app/node_modules_prod ./node_modules
COPY --from=test /app/build ./build
EXPOSE 3000
CMD node -r source-map-support/register --max-old-space-size=1350 "build"
