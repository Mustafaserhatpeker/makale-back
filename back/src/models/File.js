import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filePath: { type: String, required: true },
    uploadedBy: {
      type: String,
      required: true,
    },
    jury: {
      type: String,
    },
    fileStatus: { type: Number, default: 0 },
    isConverted: { type: Boolean, default: false },
    convertedFilePath: { type: String },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema, "files");
export default File;
