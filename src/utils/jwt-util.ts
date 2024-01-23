import { ExpressNextFunction, ExpressRequest, ExpressResponse, JWTOptions } from "../types";
import jwt from "jsonwebtoken";
import { AES, enc } from 'crypto-ts';

/**
 * @description Encrypts the data with the AES method
 * @param {string} data
 * @param {string} secret 
 * @returns {string}
 */
export const encryptData = (data: string, secret: string): string => {
    return AES.encrypt(data, secret).toString();
}

/**
 * @description Decrypts the data with AES method
 * @param {string} encData 
 * @param {string} secret 
 * @returns {string} 
 */
export const decryptData = (encData: string, secret: string) => {
    return AES.decrypt(encData, secret).toString(enc.Utf8);
}

/**
 * @description Uses the secret provided while configuring the module. Gived some inbuilt method on request object to intereact with JWT
 * @returns Express Middleware for verifying request
 */
export const verifyToken = (request: ExpressRequest, response: ExpressResponse, next: ExpressNextFunction) => {
    const key = request?.jwt?.secret;
    const cipherSecret = request?.jwt?.cipherSecret;
    if (!key || !cipherSecret) {
        return response.status(401).send({
            error: "UNAUTHORIZED",
            data: null
        })
    }
    const headerName: string | undefined = request?.jwt?.headerName;
    const bearerToken = headerName && request.get(headerName);
    if (!bearerToken) {
        return response.status(401).send({
            error: "UNAUTHORIZED",
            data: null
        })
    }
    try {
        const token = bearerToken?.split(" ")?.[1]
        const decodedToken = decryptData(token, cipherSecret);
        const decodedDataString: string = jwt.verify(decodedToken, key) as string;
        request.jwt = {
            ...request?.jwt,
            cipherSecret: request?.jwt?.cipherSecret ?? "",
            secret: request?.jwt?.secret ?? "",
            user: decodedDataString
        }
        next();
    } catch (err) {
        return response.status(401).send({
            error: "UNAUTHORIZED",
            data: null
        })
    }
}

/**
 * @description Create and returns and express middleware which will be used for jsonwebtoken
 * @param options 
 * @returns Express Middleware
 */
export const initJWT = (options: JWTOptions) => {
    return (request: ExpressRequest, response: ExpressResponse, next: ExpressNextFunction) => {
        if (!options.secret || !options.cipherSecret) {
            console.log("Please provide secret");
            process.exit(0);
        }
        request.jwt = { secret: options.secret, cipherSecret: options.cipherSecret, headerName: options?.headerName ?? "authorization" }
        request.getTokenData = function () {
            if (this.jwt?.user) {
                try {
                    return JSON.parse(this.jwt?.user);
                } catch (err) {
                    return this.jwt?.user;
                }
            }
            return null;
        }
        request.createToken = function (data: any) {
            const key = this?.jwt?.secret ?? "";
            try {
                const token = jwt.sign(data, key);
                return encryptData(token, this?.jwt?.cipherSecret ?? "");
            } catch (err) {
                console.log("Error while creating token: ", err);
                return null;
            }
        }
        next();
    }
}