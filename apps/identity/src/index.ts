import { Hono } from "hono";
import { cors } from "hono/cors";
import { mapAccountEndpoints } from "./endpoints/account";
import { mapMemberEndpoints } from "./endpoints/member";
import { mapOrganizationEndpoints } from "./endpoints/organization";
import { mapSessionEndpoints } from "./endpoints/session";
import { mapTokenEndpoints } from "./endpoints/token";

const app = new Hono();

app.use("*", cors());

mapAccountEndpoints(app);
mapSessionEndpoints(app);
mapTokenEndpoints(app);
mapOrganizationEndpoints(app);
mapMemberEndpoints(app);

export default app;
