
import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pixell River Financial API is running!");
});

app.use("/api/employees", employeeRoutes);
app.use("/api/roles", roleRoutes);

export default app;
