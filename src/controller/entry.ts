import Router, { RouterContext } from "@koa/router";
import { Entry } from "../schemas";

async function getAll(ctx: RouterContext) {
  const feeds = await Entry.find().exec();
  ctx.body = feeds;
}

async function get(ctx: RouterContext) {
  const feed = await Entry.findById(ctx.params.id).exec();
  ctx.body = feed;
}

async function create(ctx: RouterContext) {
  const feeds = ctx.body instanceof Array ? ctx.body : [ctx.body];
  try {
    await Entry.collection.insertMany(feeds, { ordered: false });
  } catch (e) {
    // expect multiple errors :)
  }
  ctx.status = 202;
  ctx.body = "";
}

async function del(ctx: RouterContext) {
  await Entry.findByIdAndDelete(ctx.params.id).exec();
  ctx.status = 204;
}

async function delMany(ctx: RouterContext) {
  if (ctx.body instanceof Array) {
    await Promise.all(ctx.body.map((_) => Entry.findByIdAndDelete(_).exec()));
  }
  ctx.status = 204;
}

export function feedRoutes(router: Router) {
  router
    .get("/entries", getAll)
    .post("/entries", create)
    .get("/entries/:id", get)
    .del("/entries", delMany)
    .del("/entries/:id", del);
}
