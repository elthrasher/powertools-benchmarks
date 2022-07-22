import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { describe, expect, test, vi } from 'vitest';

const send = vi.fn();

class CloudWatchClient {
  send = send;
}

vi.mock('@aws-sdk/client-cloudwatch', async () => {
  const { MetricDatum, PutMetricDataCommand } = await vi.importActual(
    '@aws-sdk/client-cloudwatch'
  );
  return {
    CloudWatchClient,
    MetricDatum,
    PutMetricDataCommand,
  };
});

describe('metrics.sdkv3', () => {
  test('workflow success', async () => {
    const { handler } = await import('./metrics.sdkv3');
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.9);
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          MetricData: [
            {
              MetricName: 'WorkflowSuccess',
              Unit: 'Count',
              Value: 1,
            },
          ],
          Namespace: 'SdkV3Metrics',
        },
      })
    );
  });
  test('workflow failure', async () => {
    const { handler } = await import('./metrics.sdkv3');
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0.1);
    const response = await handler(
      { body: 'proxy event' } as unknown as APIGatewayProxyEventV2,
      { functionName: 'test function' } as unknown as Context
    );
    expect(response).toEqual({ statusCode: 200 });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          MetricData: [
            {
              MetricName: 'WorkflowFailure',
              Unit: 'Count',
              Value: 1,
            },
          ],
          Namespace: 'SdkV3Metrics',
        },
      })
    );
  });
});
