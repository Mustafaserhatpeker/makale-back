import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
    {
        logContent: { type: String, required: true },
        logType: { type: String, required: true },
        logDate: { type: Date, default: Date.now },
        logState: { type: String, required: true },
    },
    { timestamps: true }
);

const Log = mongoose.model("Logs", logSchema, "logs");
export default Log;
