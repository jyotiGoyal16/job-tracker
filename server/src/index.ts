import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { sessionMiddleWare } from "./middleware/session";
import authRouter from "./routes/auth";

const app = express();
const PORT = 3001;

app.use(sessionMiddleWare);

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
