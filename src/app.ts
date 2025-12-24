import "./config/container"; // OK, setelah reflect-metadata

import express from "express";
import userRoutes from "./interfaces/http/routes/user.route";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

export default app;
