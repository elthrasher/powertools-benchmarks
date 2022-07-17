# Powertools Benchmarks

Some Lambda functions to demonstrate and benchmark [Lambda Powertools TypeScript](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/).

* LoggerConsole - A function that logs using native `console.log`.
* LoggerPowertools - A function that logs using [Lambda Powertools TypeScript Logger](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/core/logger/).
* LoggerWinston - A function that logs using [winston](https://github.com/winstonjs/winston).
* MetricsNone - 

| Function          | Description                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LoggerConsole     | A function that logs using native `console.log`.                                                                                                                     |
| LoggerPowertools  | A function that logs using [Powertools Logger](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/core/logger/).                                      |
| LoggerWinston     | A function that logs using [winston](https://github.com/winstonjs/winston).                                                                                          |
| MetricsNone       | A function that emits no metrics.                                                                                                                                    |
| MetricsPowertools | A function that emits metrics using [Powertools Metrics](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/core/metrics/).                           |
| MetricsSdkV3      | A function that emitcs metrics using [AWSSDKV3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch/classes/putmetricdatacommand.html). |
| TracerPowertools  | A function that traces using [Powertools Tracer](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/core/tracer/).                                    |
| TracerXRay        | A function that traces using [AWS XRay SDK](https://github.com/aws/aws-xray-sdk-node).                                                                               |