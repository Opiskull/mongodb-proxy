import Koa from "koa";
import { env } from "process";
import { connect } from "mongoose";
import { init as initFeed } from "./controller/feed";

import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

require("dotenv").config();

const router = new Router();

connect(env.MONGODB_URL || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = new Koa();

initFeed(router);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(env.PORT || 8080);
