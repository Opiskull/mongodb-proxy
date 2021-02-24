import { model, Schema, SchemaTypes } from "mongoose";

export const watchedSchema = new Schema({
  series: SchemaTypes.ObjectId,
  chapter: SchemaTypes.Number,
  volume: SchemaTypes.Number,
  source: SchemaTypes.ObjectId,
});

export const Watched = model("Watched", watchedSchema);
