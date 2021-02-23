import { model, Schema, SchemaTypes } from "mongoose";

export const feedSourceSchema = new Schema({
  name: SchemaTypes.String,
  url: SchemaTypes.String,
  lastSync: { type: SchemaTypes.Date },
  interval: SchemaTypes.String,
  itemSelector: SchemaTypes.String,
  propertySelectors: SchemaTypes.Mixed,
});

export const FeedSource = model("feedSource", feedSourceSchema);
