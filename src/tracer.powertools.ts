import { LambdaInterface } from '@aws-lambda-powertools/commons';
import { Tracer } from '@aws-lambda-powertools/tracer';
import {
  GetFunctionCommand,
  GetFunctionCommandOutput,
  LambdaClient,
} from '@aws-sdk/client-lambda';
import type { Context } from 'aws-lambda';

const client = new LambdaClient({});

const tracer = new Tracer({ serviceName: 'powertoolsTracer' });
tracer.captureAWSv3Client(client);

class Lambda implements LambdaInterface {
  @tracer.captureMethod()
  public async methodWithCustomTrace(
    context: Context
  ): Promise<GetFunctionCommandOutput> {
    const command = new GetFunctionCommand({
      FunctionName: context.functionName,
    });
    return client.send(command);
  }

  @tracer.captureLambdaHandler()
  public async handler(
    _event: unknown,
    context: Context
  ): Promise<GetFunctionCommandOutput> {
    return this.methodWithCustomTrace(context);
  }
}

export const handlerClass = new Lambda();
export const handler = handlerClass.handler;
