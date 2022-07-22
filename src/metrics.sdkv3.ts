import {
  CloudWatchClient,
  MetricDatum,
  PutMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';

import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from 'aws-lambda';

const client = new CloudWatchClient({});

export const handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyResultV2> => {
  const workflowSuccess = Math.random() > 0.5;
  let metric: MetricDatum;
  if (workflowSuccess) {
    console.log('The workflow was successful!');
    metric = { MetricName: 'WorkflowSuccess', Value: 1, Unit: 'Count' };
  } else {
    console.log('The workflow failed.');
    metric = { MetricName: 'WorkflowFailure', Value: 1, Unit: 'Count' };
  }
  const command = new PutMetricDataCommand({
    MetricData: [metric],
    Namespace: 'SdkV3Metrics',
  });
  await client.send(command);
  return { statusCode: 200 };
};
