import {SecurityRetriever} from "./SecurityRetriever";
import Logger from "bunyan";

// describe("SecurityRetriever", () => {
//   const logger = Logger.createLogger({
//     name: "SecurityRetriever - Test"
//   });
//   let sr: SecurityRetriever;
//   beforeEach(() => {
//     sr = new SecurityRetriever(logger);
//   });
//   describe("getFund", () => {
//     test("should return fund price if value in page", async () => {
//       const isin = "GB00B4PQW151";
//       const name = "Super Fund";
//       const price = 50.0001;
//       const fundPrice = await sr.getFundPrice({
//         isin: isin,
//         name: name
//       });
//       console.log(fundPrice);
//       expect(fundPrice.price).toBe(price);
//     });
//   });
// });
