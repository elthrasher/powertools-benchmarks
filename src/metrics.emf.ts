import { createMetricsLogger, Unit } from 'aws-embedded-metrics';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

export const handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<void> => {
  const workflowSuccess = Math.random() > 0.5;
  const metrics = createMetricsLogger();
  metrics.putDimensions({ Service: 'EMF' });
  if (workflowSuccess) {
    metrics.putMetric('WorkflowSuccess', 1, Unit.Count);
  } else {
    metrics.putMetric('WorkflowFailure', 1, Unit.Count);
  }
  await metrics.flush();
};
