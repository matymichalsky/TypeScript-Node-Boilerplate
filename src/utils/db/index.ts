import { realpathSync } from 'fs'
import { createConnection } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import {
  dbHost as host,
  dbName as database,
  dbUser as username,
  dbPassword as password,
  dbPort as port
} from '../../config/env'

const entitiesPath = realpathSync(__dirname + '../../../models') + '/**/*'

export const createDbConnection = () => {
  return createConnection({
    type: 'postgres',
    name: 'default',
    host,
    username,
    password,
    port,
    database,
    entities: [ entitiesPath ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true
  })
}
