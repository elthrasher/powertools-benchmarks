import { Logger } from '@aws-lambda-powertools/logger';

import type { LambdaInterface } from '@aws-lambda-powertools/commons';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from 'aws-lambda';

const logger = new Logger();

class Lambda implements LambdaInterface {
  @logger.injectLambdaContext({ logEvent: true })
  public async handler(
    _event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<APIGatewayProxyResultV2> {
    logger.info('Here is some info!');
    return { statusCode: 200 };
  }
}

export const myFunction = new Lambda();
export const handler = myFunction.handler;
