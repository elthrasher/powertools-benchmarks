import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { describe, expect, test } from 'vitest';
import { mockProcessStdout } from 'vitest-mock-process';

import { handler } from './logger.powertools';

const mockStdout = mockProcessStdout();

describe('logger.powertools', () => {
  test('logs and sends 200', async () => {
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(mockStdout).toHaveBeenCalledWith(
      expect.stringContaining(
        `"cold_start":true,"function_memory_size":null,"function_name":"test function"`
      ),
      expect.any(Function)
    );
  });
});
