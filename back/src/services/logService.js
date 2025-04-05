import Log from "../models/Log.js";


export const getLogs = async ({ logType, logState, sortByDate = "desc" } = {}) => {
    const filter = {};

    if (logType) {
        filter.logType = logType;
    }

    if (logState) {
        filter.logState = logState;
    }

    const sortOrder = sortByDate === "asc" ? 1 : -1;

    const logs = await Log.find(filter).sort({ createdAt: sortOrder });

    return logs.length > 0 ? logs : null;
}
