import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { sessionMiddleWare } from "./middlewares/session";
import authRouter from "./routes/auth";
import mailRouter from "./routes/mail";
import applicationsRouter from "./routes/applications";

const app = express();
const PORT = 3001;

app.use(sessionMiddleWare);

app.use("/auth", authRouter);
app.use("/mail", mailRouter);
app.use("/applications", applicationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
