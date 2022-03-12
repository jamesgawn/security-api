import {LoggerHelper} from "./lib/LoggerHelper";
import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {SecurityRetriever} from "./lib/SecurityRetriever";
import {DynamoDBHelper} from "./lib/DynamoDBHelper";
import {IFund} from "./domain/IFund";
import {IFundPrice} from "./domain/IFundPrice";
import {FundService} from "./lib/FundService";

export const priceRetrieval : APIGatewayProxyHandlerV2<void> = async (event, context) => {
  const log = LoggerHelper.createLogger("security-api-security-price-retrieval", event, context);
  const securityRetriever = new SecurityRetriever(log);
  // Get list of securities for which to obtain prices.
  const securityTable = new DynamoDBHelper<IFund>(log, "security-api-securities");
  const securities = await securityTable.getRecords();
  // Retrieve and store the latest prices.
  const fundPriceTable = new DynamoDBHelper<IFundPrice>(log, "security-api-securities-prices");
  await Promise.all(securities.map<Promise<void>>(async (fund) => {
    const fundPrice = await securityRetriever.getFundPrice(fund);
    await fundPriceTable.putRecord(fundPrice);
  }));
};

export const priceHandler : APIGatewayProxyHandlerV2<string> = async (event, context) => {
  const logger = LoggerHelper.createLogger("security-api-price", event, context);
  if (event.pathParameters && event.pathParameters.id) {
    const fundService = new FundService(logger);
    const fundPrice = await fundService.getLatestPrice(event.pathParameters.id);
    return fundPrice.price.toString();
  } else {
    return "Oops, something went wrong?";
  }
};
