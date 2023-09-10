import { Hono } from "hono";
import { cors } from "hono/cors";
import { createAccount, deleteAccount, getAccount, updateAccount } from "./endpoints/account";
import { createSession, getSession } from "./endpoints/session";

const app = new Hono();

app.use("*", cors());

app.post("/accounts", createAccount);
app.put("/accounts", updateAccount);
app.delete("/accounts", deleteAccount);
app.get("/accounts", getAccount);

app.post("/sessions", createSession);
app.get("/sessions/:sessionId", getSession);

export default app;
