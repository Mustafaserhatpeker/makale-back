import { addMessageController } from "../controllers/messageController.js";

const router = express.Router();

router.post("/add-message", addMessageController);

export default router;
