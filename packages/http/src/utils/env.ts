import { H3Event } from "h3";

export function env<T = Record<string, string>>(event: H3Event): T {
    return event.context.cloudflare.env;
}
