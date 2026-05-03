import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "../configs/db";

const PgSession = connectPgSimple(session);

export const sessionMiddleWare = [
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),

  session({
    store: new PgSession({
      pool, // reuse existing pg pool
      tableName: "session", // DB table name
      createTableIfMissing: true, // auto-creates it on first boot
    }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
];
