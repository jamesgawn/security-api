module "lambda-security-price-retrieval" {
  source = "./lambda-scheduled"
  name = "${var.name}-security-price-retrieval"
  description = "A lambda function to regularly retrieve and store the latest security prices."
  handler = "lambda.priceRetrieval"
  source_dir = "${path.module}/../dist"
  notification_sns_queue_name = var.notification_sns_queue_name
  schedule = "cron(0/15 17-21 ? * MON-FRI *)" 
  timeout = 10
  periodsFailingForAlarm = 2
}

resource "aws_iam_role_policy_attachment" "lambda-security-price-retrieval" {
  policy_arn = aws_iam_policy.lambda-data-store-access.arn
  role = module.lambda-security-price-retrieval.lambda_execution_role_name
}