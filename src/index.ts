import Koa from "koa";
import { env } from "process";
import { connect } from "mongoose";
import { feedRoutes } from "./controller/entry";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";
import { logCtx, logError, logRequest } from "./middlewares";
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

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 410) {
      ctx.body = { status: 410, message: "Access Denied" };
      ctx.status = 410;
    } else {
      ctx.body = { status: 500, message: "Internal Server Error" };
      ctx.status = 500;
    }
  }
});
app.use(logCtx());
app.use(logError());
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
