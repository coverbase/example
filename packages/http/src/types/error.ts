import { HTTPException } from "hono/http-exception";

export enum ErrorCode {
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
    UNAUTHORIZED = "UNAUTHORIZED",
    NOT_FOUND = "NOT_FOUND",
    INVALID = "INVALID",
}

export type Error = {
    code: ErrorCode;
};

export function createError(error: Error): HTTPException {
    return new HTTPException(400, {
        message: JSON.stringify(error),
    });
}
