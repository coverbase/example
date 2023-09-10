import { createApp, createRouter, eventHandler, handleCors, toWebHandler } from "h3";
import { createAccount, deleteAccount, getAccount, updateAccount } from "./endpoints/account";
import { createSession, getSession } from "./endpoints/session";

const app = createApp();
const router = createRouter();

router.use(
    "*",
    eventHandler((event) =>
        handleCors(event, {
            allowHeaders: "*",
            methods: "*",
            origin: "*",
        })
    )
);

router.post("/accounts", createAccount);
router.put("/accounts", updateAccount);
router.delete("/accounts", deleteAccount);
router.get("/accounts", getAccount);

router.post("/sessions", createSession);
router.get("/sessions", getSession);

app.use(router);

const webHandler = toWebHandler(app);

export default {
    async fetch(request: Request, env: any, ctx: any): Promise<Response> {
        return webHandler(request, {
            cloudflare: { env, ctx },
        });
    },
};
