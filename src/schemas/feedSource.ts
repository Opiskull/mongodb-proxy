import { model, Schema, SchemaTypes } from "mongoose";

export const feedSourceSchema = new Schema({
  url: SchemaTypes.String,
  lastSync: { type: SchemaTypes.Date },
  interval: SchemaTypes.String,
});

export const FeedSource = model("feedSource", feedSourceSchema);
