import Router, { RouterContext } from "@koa/router";
import { model, Schema, SchemaTypes } from "mongoose";

const feedSchema = new Schema({
  url: { type: SchemaTypes.String, required: true },
  created: { type: SchemaTypes.Date, default: Date.now },
  content: { type: SchemaTypes.Mixed },
});

const Feed = model("feed", feedSchema);

async function getAll(ctx: RouterContext) {
  const feeds = await Feed.find().exec();
  ctx.body = feeds;
}

async function get(ctx: RouterContext) {
  const feed = await Feed.findById(ctx.params.id).exec();
  ctx.body = feed;
}

async function create(ctx: RouterContext) {
  const feeds = ctx.body instanceof Array ? ctx.body : [ctx.body];
  ctx.body = await Promise.all(feeds.map((_) => Feed.create(_)));
}

async function del(ctx: RouterContext) {
  await Feed.findByIdAndDelete(ctx.params.id).exec();
  ctx.status = 204;
}

async function delMany(ctx: RouterContext) {
  if (ctx.body instanceof Array) {
    await Promise.all(ctx.body.map((_) => Feed.findByIdAndDelete(_).exec()));
  }
  ctx.status = 204;
}

export function feedRoutes(router: Router) {
  router
    .get("/feeds", getAll)
    .post("/feeds", create)
    .get("/feeds/:id", get)
    .del("/feeds", delMany)
    .del("/feeds/:id", del);
}
