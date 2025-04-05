import { getAllLogs, getLogsByState, getLogsByType } from "../services/logService";

export const getAllLogsController = async (req, res) => {
    try {
        const logs = await getAllLogs();
        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: "No logs found." });
        }
        res.json({ logs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getLogsByTypeController = async (req, res) => {
    try {
        const { logType } = req.body;
        const logs = await getLogsByType(logType);
        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: "No logs found." });
        }
        res.json({ logs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const getLogsByStateController = async (req, res) => {
    try {
        const { logState } = req.body;
        const logs = await getLogsByState(logState);
        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: "No logs found." });
        }
        res.json({ logs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}