import { model, Schema, SchemaTypes } from "mongoose";

export const seriesSchema = new Schema({
  title: { type: SchemaTypes.String, required: true },
  titles: [SchemaTypes.String],
  latestChapter: SchemaTypes.Number,
  latestVolume: SchemaTypes.Number,
  imageUrl: SchemaTypes.String,
});

export const Series = model("series", seriesSchema);
