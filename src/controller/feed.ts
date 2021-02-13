import Router from "@koa/router";
import { Context } from "koa";
import { model, Schema, SchemaTypes } from "mongoose";

const feedSchema = new Schema({
  url: { type: SchemaTypes.String },
  created: { type: SchemaTypes.Date },
  content: { type: SchemaTypes.Mixed }, // field level
});

const Feed = model("feed", feedSchema);

async function getAll(ctx: Context) {
  const feeds = await Feed.find().exec();

  ctx.body = feeds;
}

async function create(ctx: Context) {
  const feed = await Feed.create(ctx.request.body);
  ctx.body = feed;
}

export function init(router: Router) {
  router.get("/feeds", getAll).post("/feeds", create);
}
