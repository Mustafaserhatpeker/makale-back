import { getLogs } from "../services/logService.js";

export const getLogsController = async (req, res) => {
    try {
        const { logType, logState, sortByDate } = req.body;
        const logs = await getLogs({ logType, logState, sortByDate });

        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: "No logs found." });
        }

        res.json({ logs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

