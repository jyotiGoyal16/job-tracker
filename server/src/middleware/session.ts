import cors from "cors";
import session from "express-session";

export const sessionMiddleWare = [
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),

  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //change to true in production
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
];
