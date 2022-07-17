# Powertools Benchmarks

Some Lambda functions to demonstrate and benchmark [Lambda Powertools TypeScript](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/).

| Function                                         | Description                                                                                                                                                          |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [LoggerConsole](./src/logger.console.ts)         | A function that logs using native `console.log`.                                                                                                                     |
| [LoggerPowertools](./src/logger.powertools.ts)   | A function that logs using [Powertools Logger](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/core/logger/).                                      |
| [LoggerWinston](./src/logger.winston.ts)         | A function that logs using [winston](https://github.com/winstonjs/winston).                                                                                          |
| [MetricsNone](./src/metrics.none.ts)             | A function that emits no metrics.                                                                                                                                    |
| [MetricsPowertools](./src/metrics.powertools.ts) | A function that emits metrics using [Powertools Metrics](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/core/metrics/).                           |
| [MetricsSdkV3](./src/metrics.sdkv3.ts)           | A function that emitcs metrics using [AWSSDKV3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch/classes/putmetricdatacommand.html). |
| [TracerPowertools](./src/tracer.powertools.ts)   | A function that traces using [Powertools Tracer](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/core/tracer/).                                    |
| [TracerXRay](./src/tracer.xray.ts)               | A function that traces using [AWS XRay SDK](https://github.com/aws/aws-xray-sdk-node).                                                                               |