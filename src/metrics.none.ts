import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from 'aws-lambda';

export const handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyResultV2> => {
  const workflowSuccess = Math.random() > 0.5;
  if (workflowSuccess) {
    console.log('The workflow was successful!');
  } else {
    console.log('The workflow failed.');
  }
  return { statusCode: 200 };
};
