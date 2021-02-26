import { logger } from "./../logger";
import { Context, Next } from "koa";

import { v4 } from "uuid";

export function addUniqueIdToCtx() {
  return async (ctx: Context, next: Next) => {
    ctx.id = v4();
    return next();
  };
}

export function logCtx() {
  return async (ctx: Context, next: Next) => {
    ctx.logger = logger.child({ req_id: ctx.id });
    await next();
  };
}

export function errorHandler(opts: { debug: string | undefined }) {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (e) {
      ctx.logger.error(e);
      ctx.status = 500;
      ctx.body = { status: 500, message: "internal server error" };

      if (e.status === 401) {
        ctx.status = 401;
        ctx.body = { status: 401, message: "access denied" };
      }

      if (opts.debug) {
        ctx.body.error = JSON.stringify(e);
      }
    }
  };
}

export function logRequest() {
  return async (ctx: Context, next: Next) => {
    ctx.logger.info({ url: ctx.req.url, method: ctx.req.method }, "start");
    await next();
    ctx.logger.info({ url: ctx.req.url, method: ctx.req.method }, "end");
  };
}
