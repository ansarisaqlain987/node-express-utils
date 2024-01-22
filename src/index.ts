import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "./types";
import { encryptData, initJWT, verifyToken, decryptData } from "./utils/jwt-util";
import { logger as customLogger } from "./utils/request-util";

export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;

export const jwt = initJWT;
export const verifyJwtToken = verifyToken;
export const encryptString = encryptData;
export const decryptString = decryptData;
export const logger = customLogger;