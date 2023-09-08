import { getRouterParams, readBody, type H3Event } from "h3";
import { Output, parseAsync, type BaseSchemaAsync } from "valibot";

export async function useValidatedBody<T extends BaseSchemaAsync>(
    event: H3Event,
    schema: T
): Promise<Output<T>> {
    const body = await readBody(event);
    const parsed = await parseAsync<T>(schema, body);

    return parsed;
}

export async function useValidatedParams<T extends BaseSchemaAsync>(
    event: H3Event,
    schema: T
): Promise<Output<T>> {
    const params = getRouterParams(event);
    const parsed = await parseAsync<T>(schema, params);

    return parsed;
}
