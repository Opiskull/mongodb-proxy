import { model, Schema, SchemaTypes } from "mongoose";

export const feedEntrySchema = new Schema({
  source: { type: SchemaTypes.ObjectId, required: true },
  created: { type: SchemaTypes.Date, default: Date.now, immutable: true },
  content: { type: SchemaTypes.Mixed },
});

export const FeedEntry = model("feedEntry", feedEntrySchema);
