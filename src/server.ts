import app from './app'
import { environment, port, serviceName } from './config/env'
import logger from './utils/logger'
import { createDbConnection } from './utils/db'

let server: any

createDbConnection()
  .then(() => {
    server = app.listen(
      port,
      () => logger.info(
        `✅  ${serviceName.uppercaseFirstLetter()} service is running`,
        { port, environment }
      )
    )
  })

export default server
