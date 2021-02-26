import { model, Schema, SchemaTypes } from "mongoose";

export const feedSourceSchema = new Schema({
  name: { type: SchemaTypes.String, unique: true },
  url: SchemaTypes.String,
  lastSync: { type: SchemaTypes.Date },
  interval: SchemaTypes.String,
  itemSelector: SchemaTypes.String,
  propertySelectors: SchemaTypes.Mixed,
});

feedSourceSchema.statics.findByUrl = (url: string) => {
  return FeedSource.findOne({ url: url });
};

export const FeedSource = model("FeedSource", feedSourceSchema);
