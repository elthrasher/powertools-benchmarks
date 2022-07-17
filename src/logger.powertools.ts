import { Logger } from '@aws-lambda-powertools/logger';
import { LambdaInterface } from '@aws-lambda-powertools/commons';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

const logger = new Logger();

class Lambda implements LambdaInterface {
  @logger.injectLambdaContext({ logEvent: true })
  public async handler(
    _event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<void> {
    logger.info('Here is some info!');
  }
}

export const myFunction = new Lambda();
export const handler = myFunction.handler;
