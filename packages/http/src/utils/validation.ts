import { Context } from "hono";
import { Output, parseAsync, type BaseSchemaAsync } from "valibot";

export async function useValidatedBody<T extends BaseSchemaAsync>(
    context: Context,
    schema: T
): Promise<Output<T>> {
    const body = await context.req.json();
    const parsed = await parseAsync<T>(schema, body);

    return parsed;
}

export async function useValidatedParams<T extends BaseSchemaAsync>(
    context: Context,
    schema: T
): Promise<Output<T>> {
    const params = context.req.param();
    const parsed = await parseAsync<T>(schema, params);

    return parsed;
}
