import {
  GetFunctionCommand,
  GetFunctionCommandOutput,
  LambdaClient,
} from '@aws-sdk/client-lambda';
import type { Context } from 'aws-lambda';
import { captureAsyncFunc, captureAWSv3Client } from 'aws-xray-sdk-core';

const client = new LambdaClient({});

captureAWSv3Client(client);

const getFunction = async (
  context: Context
): Promise<GetFunctionCommandOutput> => {
  const command = new GetFunctionCommand({
    FunctionName: context.functionName,
  });
  return client.send(command);
};

export const handler = (
  _event: unknown,
  context: Context
): Promise<GetFunctionCommandOutput> =>
  captureAsyncFunc('methodWithCustomTrace', async (subsegment) => {
    const fn = await getFunction(context);
    subsegment?.close();
    return fn;
  });
