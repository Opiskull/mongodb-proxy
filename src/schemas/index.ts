import { connect } from "mongoose";

export * from "./entry";
export * from "./feedSource";
export * from "./series";
export * from "./watched";

export function mongodbStart(mongodbUrl: string) {
  (async () => {
    try {
      await connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (e) {
      console.log(e);
    }
  })();
}
