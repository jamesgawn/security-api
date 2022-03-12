import {LoggerHelper} from "./LoggerHelper";

export const userAgent = "Security API";
export function throwError(log: LoggerHelper, friendlyMessage: string, data?: object) {
  return rethrowError(log, friendlyMessage, new Error(friendlyMessage), data);
}
export function rethrowError(log: LoggerHelper, friendlyMessage: string, err: unknown, data?: object) {
  if (err instanceof Error) {
    log.error(friendlyMessage, err, data);
  } else {
    log.error(friendlyMessage, new Error("unknown error"), {
      data: data,
      err: err
    });
  }
  return err;
}
export function round(value: number, places: number) {
  return +(value.toFixed(places));
}
