import {Fund} from "./domain/Fund";
import {FundPrice} from "./domain/FundPrice";
import {priceHandler} from "./lambda";

const mockGetFund = jest.fn();
jest.mock("./lib/SecurityRetriever", () => ({
  SecurityRetriever: jest.fn().mockImplementationOnce(() => ({
    getFundPrice: mockGetFund
  }))
}));

describe("lambda", () => {
  const event = {
    pathParameters: {
      id: "test"
    }
  } as any;
  const context = {
    awsRequestId: "testRequestId"
  };
  describe("priceHandler", ()=> {
    beforeEach(() => {
    });
    test("should run successfully", async () => {
      mockGetFund.mockResolvedValue(new FundPrice(new Fund("test"), 15, new Date()));
      const result = await priceHandler(event, context as any, {} as any);
      expect(result).toEqual("15");
    });
  });
});
