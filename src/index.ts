import Koa from "koa";
import { env } from "process";
import { connect } from "mongoose";
import { feedRoutes } from "./controller/feed";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import { logCtx, logError, logRequest } from "./middlewares";

require("dotenv").config();

(async () => {
  try {
    await connect(env.MONGODB_URL || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (e) {
    console.log(e);
  }
})();

const router = new Router();

const app = new Koa();

feedRoutes(router);

app.use(logCtx());
app.use(logError());
app.use(logRequest());
app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next();
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.PORT || 8080);
