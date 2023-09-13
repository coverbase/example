import { Hono } from "hono";
import { cors } from "hono/cors";
import { mapAccountEndpoints } from "./endpoints/account";
import { mapCountryEndpoints } from "./endpoints/country";
import { mapLanguageEndpoints } from "./endpoints/language";
import { mapSessionEndpoints } from "./endpoints/session";
import { mapTokenEndpoints } from "./endpoints/token";

const app = new Hono();

app.use("*", cors());

mapAccountEndpoints(app);
mapSessionEndpoints(app);
mapTokenEndpoints(app);
mapLanguageEndpoints(app);
mapCountryEndpoints(app);

export default app;
