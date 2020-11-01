import { Get, JsonController } from 'routing-controllers'
import { serviceName, port, environment } from '../../config/env'

@JsonController('/')
export default class MainController {
  /**
   * Primary endpoint of the express application
   */
  @Get('')
  public getApplicationData() {
    return {
      serviceName,
      port,
      environment
    }
  }
}