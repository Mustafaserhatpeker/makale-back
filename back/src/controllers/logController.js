import { getLogs } from "../services/logService.js";

export const getLogsController = async (req, res) => {
    try {
        const { data } = req.body;
        console.log(req.body);
        const logState = data.logState;
        const sortByDate = data.sortByDate;
        const logType = data.logType;
        const logs = await getLogs({ logType, logState, sortByDate });

        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: "No logs found." });
        }
        return res.json({ logs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

