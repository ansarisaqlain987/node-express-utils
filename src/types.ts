import { NextFunction, Request, Response } from "express";

export type JWTOptions = {
    secret: string;
    cipherSecret: string;
    headerName?: string;
}

export type ExpressRequest = Request
    & {
        requestId?: string,
        jwt?: JWTOptions & { user?: string },
        getRequestId: () => string,
        getTokenData: () => string | undefined | null,
        createToken: (data: any) => string | null,
    }
export type ExpressResponse = Response
export type ExpressNextFunction = NextFunction