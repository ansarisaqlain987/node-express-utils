import { NextFunction, Request, Response } from "express";
import { Logger } from "pino";

export type JWTOptions = {
    secret: string;
    cipherSecret: string;
    headerName?: string;
}
export interface ILogger {
    info: (...args: any[]) => void;
    error: (...args: any[]) => void;
}

export type ExpressRequest = Request
    & {
        requestId?: string,
        jwt?: JWTOptions & { user?: string },
        logger?: Logger,
        getRequestId: () => string,
        getTokenData: () => string | undefined | null,
        createToken: (data: any) => string | null,
    }
export type ExpressResponse = Response
export type ExpressNextFunction = NextFunction
