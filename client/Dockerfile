# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.10.0

# stage 1: base image
FROM node:${NODE_VERSION}-slim AS base
LABEL fly_launch_runtime="Next.js"
WORKDIR /app
ENV NODE_ENV="production"
ARG YARN_VERSION=1.22.19
RUN corepack enable && \
    yarn set version ${YARN_VERSION}

# stage 2: build image
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
RUN npx next build --experimental-build-mode compile
# remove development dependencies
RUN yarn install --frozen-lockfile --production=true

# stage 3: final image 
FROM base AS runner
# copy built application
COPY --from=build /app /app
EXPOSE 3000
CMD [ "yarn", "run", "start" ]
