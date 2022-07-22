import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { describe, expect, test, vi } from 'vitest';

const logger = { info: vi.fn() };
vi.mock('winston', () => ({
  createLogger: vi.fn().mockReturnValue(logger),
  format: { json: vi.fn() },
  transports: { Console: vi.fn() },
}));

describe('logger.winston', () => {
  test('logs and sends 200', async () => {
    const { handler } = await import('./logger.winston');
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(logger.info).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalledWith('event: ', { body: 'proxy event' });
    // expect(spy).toHaveBeenCalledWith('context: ', {
    //   functionName: 'test function',
    // });
    // expect(mockStdout).toHaveBeenCalledWith(
    //   expect.stringContaining(
    //     `"cold_start":true,"function_memory_size":null,"function_name":"test function"`
    //   ),
    //   expect.any(Function)
    // );
  });
});
