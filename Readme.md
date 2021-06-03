# Node API boilerplate
# `1. Ecosystem`
* MongoDb as database: using [Mongoose](https://mongoosejs.com/) as ODM

* Socketio with multi nodes support: using the [redis socketio adapter](https://github.com/socketio/socket.io-redis-adapter)
* [TravisCI](https://travis-ci.com/) for CI/CD

# `2. Quick start`
## `2.1. Project structure`
* Separate Express 'app' and 'server': allowing a flexible testing environement of the API using [Chai HTTP](https://www.chaijs.com/plugins/chai-http/)
* Solution structured by self-contained components (features): each feature (For example auth or rooms) contains it's own logic: <br>
         - Routes <br> 
         - Controllers <br>
         - Services <br>
         - Validations <br>
         - Models <br>
         - Unit tests
## `2.1. Error Handling`
* Errors handled centrally, not within a middlewares: see `src/middlewares/error.ts`.
* Operational and programmer errors are seperated: we use a custom error class for this to extend the built in Error class (see `src/utils/ApiError.ts`)
* Error logging using [Winston](https://www.npmjs.com/package/winston): see `src/utils/logger.ts`
## `2.2. Code Style Practices`
* Eslint + Prettier + VsCode configuration to enforce code styles on file save
* Husky + lint-staged to enforce code styles before commits
## `2.3. Testing`
* Unit testing of services using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Chai-spies](https://www.chaijs.com/plugins/chai-spies/)
* e2e testing using [Chai-http](https://www.chaijs.com/plugins/chai-http/)


## `2.4. Socket`
* Multinode support using [redis socketio adapter](https://github.com/socketio/socket.io-redis-adapter)
* Socket handlers separated per topic
* Socket authentification middleware

## `2.5. Docker`
* We use [multistage builds](https://docs.docker.com/develop/develop-images/multistage-build/)

## `2.6. TravisCI`
Really simple CI/CD pipeline that gets triggered on every commit.
![CI/CD pipeline](https://i.ibb.co/rxJYv5Y/Untitled-Diagram-28.png)

# `3. Prospects`
* Integrate test coverage into the CI/CD pipeline



