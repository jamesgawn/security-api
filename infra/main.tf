variable "name" {
  type = string
  default = "ift"
}

variable "domain" {
  type = string
}

variable "cert_domain" {
  type = string
}

variable "notification_sns_queue_name" {
  type = string
  description = "The name of the SNS queue to send ok/error alarms if the lambda stops working."
}

provider "aws" {
  region = "eu-west-2"
}

terraform {
  backend "s3" {
    bucket = "ana-terraform-state-prod"
    key = "security-api/terraform.tfstate"
    region = "eu-west-2"
  }
}