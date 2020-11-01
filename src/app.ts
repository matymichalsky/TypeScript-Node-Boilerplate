import 'reflect-metadata'
import './utils/extensions'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { createExpressServer, getMetadataArgsStorage, RoutingControllersOptions, useContainer } from 'routing-controllers'
import errorHandler from 'errorhandler'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import swaggerUiExpress from 'swagger-ui-express'
import { Container } from 'typedi'
import controllers from './controllers'
import middlewares from './middlewares'
import { isProduction, morganLoggingLevel } from './config/env'
import { authorizationChecker, currentUserChecker } from './services/auth'

// Setup routing controllers config
const routingControllersOptions: RoutingControllersOptions = {
  cors: true,
  controllers,
  middlewares,
  authorizationChecker,
  currentUserChecker,
  defaultErrorHandler: false,
  defaults: {
    nullResultCode: 404
  }
}

// Dependency injections
useContainer(Container)

// Create a new express APP
const app = createExpressServer(routingControllersOptions)

// If we're not in production, it's cool to use errorHandler lib
if (isProduction) {
  app.use(errorHandler())
}

// gzip compression
app.use(compression({ threshold: 12 }))

// requests logger
app.use(morgan(morganLoggingLevel))

// request formatting
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/'
})

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      bearerAuth: {
        scheme: 'bearer',
        type: 'http',
        bearerFormat: 'JWT'
      }
    }
  },
  info: {
    description: 'A Simple boilerplate for Node.JS server using TypeScript and routing-controllers, typedi, typeorm libraries!',
    title: 'Node.JS Boilerplate',
    version: '1.0.0'
  }
})
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec) as any)

export default app
