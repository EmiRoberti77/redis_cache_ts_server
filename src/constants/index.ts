import { serverEnv } from "../env/serverEnv";

export const timeStamp = () => new Date().toISOString();
export enum ERR_MSGS {
  MISSING_BODY = "Err:Missing body",
  MISSING_PARAM = "Err:Missing request param /:<param>",
}

export enum AUTHENTICATION {
  X_API_KEY = "x-api-key",
  AUTHENTICATION_PASS = "200:Authentication success",
  AUTHENTICATION_FAIL = "Err:403:Authentication forbidden",
}
