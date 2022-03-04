import {LoggerHelper} from "./lib/LoggerHelper";
import {APIGatewayProxyHandlerV2} from "aws-lambda";

export const priceHandler : APIGatewayProxyHandlerV2<string> = async (event, context) => {
  LoggerHelper.createLogger("security-api-price", event, context);
  return "Hello World";
};
