import { Get, JsonController } from 'routing-controllers'

@JsonController('/health')
export default class HealthController {
  /**
   * A simple service if we'd want to integrate LB health-checks in future
   */
  @Get('/')
  public getHealthStatus() {
    return {
      status: 'healthy'
    }
  }
}