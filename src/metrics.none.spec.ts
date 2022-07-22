import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { describe, expect, test, vi } from 'vitest';

import { handler } from './metrics.none';

const spy = vi.spyOn(console, 'log');

describe('metrics.none', () => {
  test('workflow success', async () => {
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.9);
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(spy).toHaveBeenCalledWith('The workflow was successful!');
  });
  test('workflow failure', async () => {
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.1);
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(spy).toHaveBeenCalledWith('The workflow failed.');
  });
});
