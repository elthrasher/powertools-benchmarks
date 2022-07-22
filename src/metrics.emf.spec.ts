import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { describe, expect, test, vi } from 'vitest';

const flush = vi.fn();
const putDimensions = vi.fn();
const putMetric = vi.fn();

const createMetricsLogger = vi
  .fn()
  .mockReturnValue({ flush, putDimensions, putMetric });

vi.mock('aws-embedded-metrics', () => ({
  createMetricsLogger,
  Unit: { Count: 'Count' },
}));

describe('metrics.emf', () => {
  test('workflow success', async () => {
    const { handler } = await import('./metrics.emf');
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.9);
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(putDimensions).toHaveBeenCalledWith({ Service: 'EMF' });
    expect(putMetric).toHaveBeenCalledWith('WorkflowSuccess', 1, 'Count');
    expect(flush).toHaveBeenCalled();
  });
  test('workflow failure', async () => {
    const { handler } = await import('./metrics.emf');
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.1);
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(putDimensions).toHaveBeenCalledWith({ Service: 'EMF' });
    expect(putMetric).toHaveBeenCalledWith('WorkflowFailure', 1, 'Count');
    expect(flush).toHaveBeenCalled();
  });
});
