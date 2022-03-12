// Price Endpoint
module "price-lambda" {
  source = "./lambda-simple"
  name = "${var.name}-price"
  description = "A lambda function to calculate the current valuation summarised across all holdings."
  handler = "lambda.priceHandler"
  source_dir = "${path.module}/../dist"
  notification_sns_queue_name = var.notification_sns_queue_name
  timeout = 10
}

module "price-endpoint" {
  source = "./lambda-api-gateway-integration"
  lambda_name = module.price-lambda.name
  api_gateway_id = aws_apigatewayv2_api.api.id
  api_gateway_execution_arn = aws_apigatewayv2_api.api.execution_arn
  route = "/price/{id}"
  depends_on = [
    module.price-lambda
  ]
}