import { createLogger } from "bunyan";
import { Context, Next } from "koa";

const ctxLogger = createLogger({ name: "ctx" });

export function logCtx() {
  return async (ctx: Context, next: Next) => {
    ctx.logger = ctxLogger;
    next();
  };
}

export function logError() {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (e) {
      ctxLogger.error(e);
    }
  };
}

export function logRequest() {
  return async (ctx: Context, next: Next) => {
    ctxLogger.info({ url: ctx.req.url, method: ctx.req.method }, "start");
    await next();
    ctxLogger.info({ url: ctx.req.url, method: ctx.req.method }, "end");
  };
}
