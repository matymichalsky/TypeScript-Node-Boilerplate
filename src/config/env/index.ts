import { realpathSync } from 'fs'
import { config } from 'dotenv'
import dotenvExpand from 'dotenv-expand'

export const { NODE_ENV: environment } = process.env
const rootPath = realpathSync(__dirname + '/../../..') + '/'

// Load .env.local file if app is served locally
if (environment === 'local') {
  const localEnvConfig = config({ path: `${rootPath}.env.local` })
  dotenvExpand(localEnvConfig)
}

// Load actual .env variables
const envConfig = config({ path: `${rootPath}.env` })
dotenvExpand(envConfig)

// Renamed exported environment variables
export const {
  SERVICE_NAME: serviceName,
  DB_HOST: dbHost,
  DB_USER: dbUser,
  DB_PASSWORD: dbPassword,
  DB_NAME: dbName
} = process.env

// Reflected + renamed exported environment variables
const {
  PORT,
  DB_PORT
} = process.env

export const port = +PORT
export const dbPort = +DB_PORT
export const isProduction = environment?.toLowerCase() === 'prod'
export const morganLoggingLevel = isProduction ? 'combined' : 'dev'
