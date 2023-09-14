import { Hono } from "hono";
import { cors } from "hono/cors";
import { mapAccountEndpoints } from "./endpoints/account";
import { mapCountryEndpoints } from "./endpoints/country";
import { mapFileEndpoints } from "./endpoints/file";
import { mapLanguageEndpoints } from "./endpoints/language";
import { mapMemberEndpoints } from "./endpoints/member";
import { mapProjectEndpoints } from "./endpoints/project";
import { mapRoleEndpoints } from "./endpoints/role";
import { mapSessionEndpoints } from "./endpoints/session";
import { mapTokenEndpoints } from "./endpoints/token";

const app = new Hono();

app.use("*", cors());

mapAccountEndpoints(app);
mapSessionEndpoints(app);
mapTokenEndpoints(app);
mapLanguageEndpoints(app);
mapCountryEndpoints(app);
mapProjectEndpoints(app);
mapMemberEndpoints(app);
mapRoleEndpoints(app);
mapFileEndpoints(app);

export default app;
