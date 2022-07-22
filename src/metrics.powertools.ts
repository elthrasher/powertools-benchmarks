import { LambdaInterface } from '@aws-lambda-powertools/commons';
import { Metrics, MetricUnits } from '@aws-lambda-powertools/metrics';

import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from 'aws-lambda';

const metrics = new Metrics({ namespace: 'Workflow' });

class Lambda implements LambdaInterface {
  @metrics.logMetrics()
  public async handler(
    _event: APIGatewayProxyEventV2,
    _context: Context
  ): Promise<APIGatewayProxyResultV2> {
    const workflowSuccess = Math.random() > 0.5;
    if (workflowSuccess) {
      metrics.addMetric('WorkflowSuccess', MetricUnits.Count, 1);
    } else {
      metrics.addMetric('WorkflowFailure', MetricUnits.Count, 1);
    }
    return { statusCode: 200 };
  }
}

export const myFunction = new Lambda();
export const handler = myFunction.handler;
