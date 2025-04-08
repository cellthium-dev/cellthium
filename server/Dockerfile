# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.10.0

# step 1: base image
FROM node:${NODE_VERSION}-slim AS base
LABEL fly_launch_runtime="Node.js"
WORKDIR /app
ENV NODE_ENV="production"
ARG YARN_VERSION=1.22.19
RUN npm install -g yarn@$YARN_VERSION --force

# step 2: build image
FROM base AS build
# install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3
# install node modules
COPY .yarnrc.yml package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
# copy application code
COPY . .
# build application
RUN yarn run build
RUN cd /app/.medusa/server && \
    yarn install --frozen-lockfile --production=true

# step 3: final image
FROM base AS runner
COPY --from=build /app/.medusa/server /app
EXPOSE 9000
CMD [ "yarn", "run", "start" ]
