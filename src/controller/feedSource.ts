import Router, { RouterContext } from "@koa/router";
import { FeedSource } from "../schemas";

async function getAll(ctx: RouterContext) {
  const feeds = await FeedSource.find().exec();
  ctx.body = feeds;
  ctx.status = 200;
}

async function get(ctx: RouterContext) {
  const feed = await FeedSource.findById(ctx.params.id).exec();
  ctx.body = feed;
  ctx.status = 200;
}

async function create(ctx: RouterContext) {
  ctx.body = await FeedSource.create(ctx.body);
  ctx.status = 202;
}

async function del(ctx: RouterContext) {
  await FeedSource.findByIdAndDelete(ctx.params.id).exec();
  ctx.status = 204;
}

async function update(ctx: RouterContext) {
  await FeedSource.findByIdAndUpdate(ctx.params.id, ctx.body);
  ctx.status = 200;
}

export function sourcesRoutes(router: Router) {
  return router
    .get("/api/sources", getAll)
    .post("/api/sources", create)
    .get("/api/sources/:id", get)
    .put("/api/sources/:id", update)
    .del("/api/sources/:id", del);
}
