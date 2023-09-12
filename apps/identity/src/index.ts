import { Hono } from "hono";
import { cors } from "hono/cors";
import { mapAccountEndpoints } from "./endpoints/account";
import { mapSessionEndpoints } from "./endpoints/session";
import { mapTokenEndpoints } from "./endpoints/token";

const app = new Hono();

app.use("*", cors());

mapAccountEndpoints(app);
mapSessionEndpoints(app);
mapTokenEndpoints(app);

export default app;
