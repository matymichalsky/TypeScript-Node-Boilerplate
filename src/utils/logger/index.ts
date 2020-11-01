import { LoggerOptions, createLogger, transports, format } from 'winston'
const { simple } = format
const { Console } = transports

const options: LoggerOptions = {
  transports: [
    new Console({ level: 'info' })
  ],
  format: simple()
}

const logger = createLogger(options)

export default logger
