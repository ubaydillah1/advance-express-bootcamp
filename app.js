import dataRoutes from "./routes/data.routes.js";
import express from "express";

const app = express();

app.use(express.json());

app.use("/api", dataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
