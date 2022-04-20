import {Fund} from "./domain/Fund";
import {FundPrice} from "./domain/FundPrice";
import {priceHandler, priceRetrieval} from "./lambda";


const mockGetRecords = jest.fn();
const mockPutRecord = jest.fn();
const mockQueryRecordsByKey = jest.fn();
jest.mock("./lib/DynamoDBHelper", () => ({
  DynamoDBHelper: jest.fn().mockImplementation(() => ({
    getRecords: mockGetRecords,
    putRecord: mockPutRecord,
    queryRecordByKey: mockQueryRecordsByKey
  }))
}));

const mockGetFund = jest.fn();
jest.mock("./lib/SecurityRetriever", () => ({
  SecurityRetriever: jest.fn().mockImplementation(() => ({
    getFundPrice: mockGetFund
  }))
}));

const getLatestPrice = jest.fn();
jest.mock("./lib/FundService", () => ({
  FundService: jest.fn().mockImplementation(() => ({
    getLatestPrice: getLatestPrice
  }))
}));

describe("lambda", () => {
  const testFund = new Fund("GB0001", "Bingo Bob Fund");
  const date = new Date();
  const price = 50;
  const testFundPrice = new FundPrice(testFund, price, date);
  const event = {
    pathParameters: {
      id: "test"
    }
  } as any;
  const context = {
    awsRequestId: "testRequestId"
  };
  describe("dataRetrievalHandler", () => {
    beforeEach(() => {
      mockGetRecords.mockResolvedValue([testFund]);
      mockGetFund.mockResolvedValue(testFundPrice);
    });
    test("should run successfully", async () => {
      await expect(priceRetrieval(event as any, context as any, {} as any)).resolves.not.toThrow();
      expect(mockGetFund).toBeCalledWith(testFund);
      expect(mockPutRecord).toBeCalledWith(testFundPrice);
    });
  });
  describe("priceHandler", ()=> {
    beforeEach(() => {
      const price = {
        isin: "GB001",
        name: "blah",
        price: 15,
        date: ""
      };
      getLatestPrice.mockResolvedValue(price);
    });
    test("should run successfully", async () => {
      const result = await priceHandler(event, context as any, {} as any);
      expect(result).toEqual("15");
    });
    test("should return an error if no path provided", async () => {
      const result = await priceHandler({} as any, {} as any, {} as any);
      expect(result).toEqual("Oops, something went wrong?");
    });
  });
});
