import Koa from "koa";
import { env } from "process";
import { feedRoutes } from "./controller/entry";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";
import {
  logCtx,
  errorHandler,
  logRequest,
  addUniqueIdToCtx,
} from "./middlewares";
import { mongodbStart } from "./schemas";
import { sourcesRoutes } from "./controller/feedSource";

require("dotenv").config();

const throwEnv = (name: string) => {
  const value = env[name];
  if (!value) {
    throw new Error(`${name} is missing`);
  }
  return value;
};

const MONGODB_URL = throwEnv("MONGODB_URL");
const SECRET = throwEnv("SECRET");

mongodbStart(MONGODB_URL);

const router = new Router();

const app = new Koa();

feedRoutes(router);
sourcesRoutes(router);

app.use(errorHandler({ debug: env["DEBUG"] }));
app.use(addUniqueIdToCtx());
app.use(logCtx());
app.use(logRequest());
app.use(jwt({ secret: SECRET }));
app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next();
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.PORT || 8080);
