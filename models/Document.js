const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DOCUMENT } = require("../constant/index");
const DocumentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    day: {
      type: String,
      default: new Date().toISOString().slice(0, 10),
    },
    category: {
      type: String,
      enum: DOCUMENT,
      required: true,
    },
    image: {
      type: Buffer,
    },
  },
  {
    collection: "nb-documents",
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Document", DocumentSchema);
