import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { describe, expect, test, vi } from 'vitest';

const addMetric = vi.fn();
const logMetrics = vi.fn();

class Metrics {
  addMetric = addMetric;
  logMetrics = logMetrics;
}

vi.mock('@aws-lambda-powertools/metrics', () => ({
  Metrics,
  MetricUnits: { Count: 'Count' },
}));

describe('metrics.powertools', () => {
  test('workflow success', async () => {
    const { handler } = await import('./metrics.powertools');
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.9);
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(addMetric).toHaveBeenCalledWith('WorkflowSuccess', 'Count', 1);
    expect(logMetrics).toHaveBeenCalled();
  });
  test('workflow failure', async () => {
    const { handler } = await import('./metrics.powertools');
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.1);
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(addMetric).toHaveBeenCalledWith('WorkflowFailure', 'Count', 1);
    expect(logMetrics).toHaveBeenCalledWith();
  });
});
