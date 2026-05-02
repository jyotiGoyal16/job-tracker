import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { sessionMiddleWare } from "./middlewares/session";
import authRouter from "./routes/auth";
import mailRouter from "./routes/mail";
import applicationsRouter from "./routes/applications";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(sessionMiddleWare);

app.use("/auth", authRouter);
app.use("/mail", mailRouter);
app.use("/applications", applicationsRouter);

// Serve React frontend
const frontendBuildPath = path.join(__dirname, "../../dist");
app.use(express.static(frontendBuildPath));
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
