import { model, Schema, SchemaTypes } from "mongoose";

export const entrySchema = new Schema({
  // source: { type: SchemaTypes.ObjectId, required: true },
  created: { type: SchemaTypes.Date, default: Date.now, immutable: true },
  url: { type: SchemaTypes.String },
  chapter: { type: SchemaTypes.String },
  title: { type: SchemaTypes.String },
});

entrySchema.index(
  { url: 1, chapter: 1, title: 1 },
  { unique: true, sparse: true }
);

export const Entry = model("entry", entrySchema);
