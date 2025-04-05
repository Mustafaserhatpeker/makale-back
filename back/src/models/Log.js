import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
    {
        logContent: { type: String, required: true },
        logType: { type: String, required: true },
        logDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Log = mongoose.model("Logs", logSchema, "logs");
export default Log;
