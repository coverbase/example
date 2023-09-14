import { Env, MiddlewareHandler, ValidationTargets } from "hono";
import { parseBody } from "hono/utils/body";
import { BaseSchema, Output, parse } from "valibot";
import { ErrorCode, createError } from "../types/error";

export function validation<
    T extends BaseSchema,
    Target extends keyof ValidationTargets,
    E extends Env,
    P extends string,
    V extends {
        in: {
            [K in Target]: any;
        };
        out: {
            [K in Target]: Output<T>;
        };
    } = {
        in: {
            [K in Target]: any;
        };
        out: {
            [K in Target]: Output<T>;
        };
    },
>(target: Target, schema: T): MiddlewareHandler<E, P, V> {
    return async (context, next) => {
        let value = {};

        try {
            switch (target) {
                case "json":
                    value = await context.req.json();
                    break;
                case "form":
                    value = await parseBody(context.req.raw);
                    break;
            }

            const result = parse(schema, value);

            context.req.addValidatedData(target, result);
        } catch (error) {
            throw createError({
                code: ErrorCode.INVALID,
            });
        }

        await next();
    };
}
