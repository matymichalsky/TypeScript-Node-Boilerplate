import { BadRequestError, ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'
import morgan from 'morgan'
import { Request, Response } from 'express'
import { isProduction, morganLoggingLevel } from '../../config/env'

/**
 * Simple refactor Routing-controllers default error handling functions,
 * to allow me to display the information as I want it to look like
 */
@Middleware({ type: 'after' })
export default class ErrorHandlingMiddleware implements ExpressErrorMiddlewareInterface {
  error(data: any, req: Request, res: Response) {
    const { name: error, httpCode, message, stack } = data

    const responseData: any = {
      error,
      message,
    }

    if (data instanceof BadRequestError) {
      responseData.errors = (data as any).errors
    }

    morgan(morganLoggingLevel)(req, res, () => {

      if (!isProduction) {
        responseData.stack = stack
      }

      res.status(httpCode || 500)
        .json(responseData)
    })
  }
}
