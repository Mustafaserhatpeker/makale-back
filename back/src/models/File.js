import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filePath: { type: String, required: true },
    uploadedBy: {
      type: String,
      required: true,
    },
    uploadedFor: {
      type: String,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema, "files");
export default File;
