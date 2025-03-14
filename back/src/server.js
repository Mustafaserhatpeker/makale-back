import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import "./pythonservice/websocketServer.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", fileRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
