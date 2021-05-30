# Build the image
FROM node:12-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./

# Install dependencies 
FROM base as dev-env-stage
RUN npm install
COPY ./ ./

# lint the code 
FROM dev-env-stage as lint-stage
RUN npm run-script lint:eslint

# test the code 
FROM lint-stage as test-stage
RUN npm run-script test

# build the code 
FROM test-stage as build-stage
RUN npm run-script clean
RUN npm run-script build

# build the prod image
FROM base as prod-env-stage
RUN npm ci --production
COPY --from=build-stage /usr/src/app/build ./build
EXPOSE 8080
CMD [ "node", "build/index.js" ]




