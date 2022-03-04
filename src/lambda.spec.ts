import {priceHandler} from "./lambda";

const mockGetFund = jest.fn();
jest.mock("./lib/SecurityRetriever", () => ({
  SecurityRetriever: jest.fn().mockImplementationOnce(() => ({
    getFundPrice: mockGetFund
  }))
}));

describe("lambda", () => {
  const event = {};
  const context = {
    awsRequestId: "testRequestId"
  };
  describe("priceHandler", ()=> {
    beforeEach(() => {
    });
    test("should run successfully", async () => {
      const result = await priceHandler(event as any, context as any, {} as any);
      expect(result).toEqual("Hello World");
    });
  });
});
