import { createApp, toWebHandler } from "h3";

const app = createApp();

const webHandler = toWebHandler(app);

export default {
    async fetch(request: Request, env: any, ctx: any): Promise<Response> {
        return webHandler(request, {
            cloudflare: { env, ctx },
        });
    },
};
