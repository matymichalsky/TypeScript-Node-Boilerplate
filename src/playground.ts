import 'reflect-metadata'
import './utils/extensions'
import { createDbConnection } from './utils/db'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const playground = async () => {

}

createDbConnection()
  .then(playground)
  .then(console.log)
