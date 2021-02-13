import Router, { RouterContext } from "@koa/router";
import { model, Schema, SchemaTypes } from "mongoose";

const feedSchema = new Schema({
  url: { type: SchemaTypes.String },
  created: { type: SchemaTypes.Date, default: Date.now },
  content: { type: SchemaTypes.Mixed }, // field level
});

const Feed = model("feed", feedSchema);

async function getAll(ctx: RouterContext) {
  const feeds = await Feed.find().exec();
  ctx.body = feeds;
}

async function create(ctx: RouterContext) {
  const feed = await Feed.create(ctx.request.body);
  ctx.body = feed;
}

async function del(ctx: RouterContext) {
  await Feed.findByIdAndDelete(ctx.params.id);
  ctx.status = 204;
}

async function delMany(ctx: RouterContext) {
  if (ctx.body instanceof Array) {
    await Promise.all(ctx.body.map((_) => Feed.findByIdAndDelete(_).exec()));
  }
  ctx.status = 204;
}

export function init(router: Router) {
  router
    .get("/feeds", getAll)
    .post("/feeds", create)
    .del("/feeds", delMany)
    .del("/feeds/:id", del);
}
