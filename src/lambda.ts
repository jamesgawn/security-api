import {LoggerHelper} from "./lib/LoggerHelper";
import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {SecurityRetriever} from "./lib/SecurityRetriever";
import {Fund} from "./domain/Fund";

export const priceHandler : APIGatewayProxyHandlerV2<string> = async (event, context) => {
  const logger = LoggerHelper.createLogger("security-api-price", event, context);
  if (event.pathParameters && event.pathParameters.id) {
    const securityRetriever = new SecurityRetriever(logger);
    const fundPrice = await securityRetriever.getFundPrice(new Fund(event.pathParameters.id));
    return fundPrice.price.toString();
  } else {
    return "Oops, something went wrong?";
  }
};
