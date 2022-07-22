import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { describe, test, expect, vi } from 'vitest';

import { handler } from './logger.console';

const spy = vi.spyOn(console, 'log');

describe('logger.console', () => {
  test('logs and sends 200', async () => {
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(spy).toHaveBeenCalledWith('event: ', { body: 'proxy event' });
    expect(spy).toHaveBeenCalledWith('context: ', {
      functionName: 'test function',
    });
  });
});
