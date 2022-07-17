import { createLogger, format, transports } from 'winston';

import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from 'aws-lambda';

const logger = createLogger({
  format: format.json(),
  level: 'info',
  transports: [new transports.Console()],
});

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> => {
  logger.info('event: ', event);
  logger.info('context: ', context);
  return { statusCode: 200 };
};
