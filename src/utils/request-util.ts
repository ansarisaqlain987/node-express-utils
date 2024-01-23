import { v4 } from 'uuid';
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types";

export const logger = () => {
    return (request: ExpressRequest, response: ExpressResponse, next: ExpressNextFunction) => {
        const request_id: string = v4();
        console.log("Request ID: ", request_id);
        request.requestId = request_id;
        request.getRequestId = function () {
            return this.requestId ?? "";
        }
        next();
    }
}