import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Architecture, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class PowertoolsBenchmarksStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const REQUIRE_SHIM = `import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url)`;

    const lambdaProps = {
      architecture: Architecture.ARM_64,
      environment: {
        // Guarantees function replacement on deployment so we can test cold starts
        COLD_STARTER: new Date().toISOString(),
        NODE_OPTIONS: '--enable-source-maps',
      },
      bundling: {
        banner: REQUIRE_SHIM,
        format: OutputFormat.ESM,
        mainFields: ['module', 'main'],
        minify: true,
        sourceMap: true,
        target: 'es2022',
      },
      description: JSON.stringify({
        format: 'esm',
        minify: true,
        runtime: Runtime.NODEJS_16_X.name,
        sdk: 'none',
        sourceType: 'ts',
        xray: false,
      }),
      logRetention: RetentionDays.ONE_DAY,
      runtime: Runtime.NODEJS_16_X,
      tracing: Tracing.ACTIVE,
    };

    const loggerConsole = new NodejsFunction(this, 'LoggerConsole', {
      ...lambdaProps,
      entry: './src/logger.console.ts',
      functionName: 'LoggerConsole',
    });

    const loggerPowertools = new NodejsFunction(this, 'LoggerPowertools', {
      ...lambdaProps,
      entry: './src/logger.powertools.ts',
      functionName: 'LoggerPowertools',
    });

    const loggerWinston = new NodejsFunction(this, 'LoggerWinston', {
      ...lambdaProps,
      entry: './src/logger.winston.ts',
      functionName: 'LoggerWinston',
    });

    const metricsNone = new NodejsFunction(this, 'MetricsNone', {
      ...lambdaProps,
      entry: './src/metrics.none.ts',
      functionName: 'MetricsNone',
    });

    const metricsPowertools = new NodejsFunction(this, 'MetricsPowertools', {
      ...lambdaProps,
      entry: './src/metrics.powertools.ts',
      functionName: 'MetricsPowertools',
    });

    const metricsSdkV3 = new NodejsFunction(this, 'MetricsSdkV3', {
      ...lambdaProps,
      entry: './src/metrics.sdkv3.ts',
      functionName: 'MetricsSdkV3',
    });

    const tracerPowertools = new NodejsFunction(this, 'TracerPowertools', {
      ...lambdaProps,
      entry: './src/tracer.powertools.ts',
      functionName: 'TracerPowertools',
      initialPolicy: [
        new PolicyStatement({
          actions: ['lambda:GetFunction'],
          resources: ['*'],
        }),
      ],
    });

    const tracerXray = new NodejsFunction(this, 'TracerXray', {
      ...lambdaProps,
      entry: './src/tracer.xray.ts',
      functionName: 'TracerXray',
      initialPolicy: [
        new PolicyStatement({
          actions: ['lambda:GetFunction'],
          resources: ['*'],
        }),
      ],
    });

    new CfnOutput(this, 'LoggerConsoleArn', {
      description: 'LoggerConsoleArn',
      value: loggerConsole.functionArn,
    });

    new CfnOutput(this, 'LoggerPowertoolsArn', {
      description: 'LoggerPowertoolsArn',
      value: loggerPowertools.functionArn,
    });

    new CfnOutput(this, 'LoggerWinstonArn', {
      description: 'LoggerWinstonArn',
      value: loggerWinston.functionArn,
    });

    new CfnOutput(this, 'MetricsNoneArn', {
      description: 'MetricsNoneArn',
      value: metricsNone.functionArn,
    });

    new CfnOutput(this, 'MetricsPowertoolsArn', {
      description: 'MetricsPowertoolsArn',
      value: metricsPowertools.functionArn,
    });

    new CfnOutput(this, 'MetricsSdkV3Arn', {
      description: 'MetricsSdkV3Arn',
      value: metricsSdkV3.functionArn,
    });

    new CfnOutput(this, 'TracerPowertoolsArn', {
      description: 'TracerPowertoolsArn',
      value: tracerPowertools.functionArn,
    });

    new CfnOutput(this, 'TracerXRayArn', {
      description: 'TracerXRayArn',
      value: tracerXray.functionArn,
    });
  }
}
