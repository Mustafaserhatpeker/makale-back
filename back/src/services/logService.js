import Log from "../models/Log.js";

export const getAllLogs = async () => {
    const logs = await Log.find().sort({ createdAt: -1 });
    if (!logs || logs.length === 0) {
        return null;
    }
    return logs;
}
export const getLogsByType = async (logType) => {
    const logs = await Log.find({ logType }).sort({ createdAt: -1 });
    if (!logs || logs.length === 0) {
        return null;
    }
    return logs;
}
export const getLogsByState = async (logState) => {
    const logs = await Log.find({ logState }).sort({ createdAt: -1 });
    if (!logs || logs.length === 0) {
        return null;
    }
    return logs;
}