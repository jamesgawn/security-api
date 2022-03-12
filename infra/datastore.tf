resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "${var.name}-securities"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "isin"

  attribute {
    name = "isin"
    type = "S"
  }

  tags = {
    Name        = "${var.name}-securities"
  }
}

resource "aws_dynamodb_table" "fund-prices" {
  name = "${var.name}-securities-prices"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "isin"
  range_key = "date"

  attribute {
    name = "isin"
    type = "S"
  }

  attribute {
    name = "date"
    type = "S"
  }
}

resource "aws_iam_policy" "lambda-data-store-access" {
  name = "${var.name}-lambda-data-store-access"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Action": [
              "dynamodb:PutItem",
              "dynamodb:GetItem",
              "dynamodb:UpdateItem",
              "dynamodb:Scan",
              "dynamodb:Query"
          ],
          "Resource": "arn:aws:dynamodb:*:*:table/${var.name}-*"
      }
  ]
}
  EOF
}