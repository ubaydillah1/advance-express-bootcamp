import dataRoutes from "./routes/data.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", dataRoutes);
app.use("/api/auth", authRoutes);
app.use("/", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
