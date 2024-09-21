import dataRoutes from "./routes/data.routes.js";
import authRoutes from "./routes/auth.routes.js";
import express from "express";
import pool from "./db.js";

const app = express();

app.use(express.json());

app.use("/api", dataRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
