import { google } from "googleapis";
import { oauth2Client, SCOPES } from "../configs/google";
import { Request, Response } from "express";
import pool from "../configs/db";

const googleLogin = (req: Request, res: Response) => {
  const authUrl: string = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
  res.redirect(authUrl);
};

const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userProfile = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await userProfile.userinfo.get();

    let userId: number;
    const existingUser = await pool.query(
      "SELECT id, email, name, picture FROM users WHERE email= $1",
      [data.email],
    );

    if (existingUser.rows.length > 0) {
      userId = existingUser.rows[0].id;
    } else {
      const newUser = await pool.query(
        "INSERT INTO users (email, name, picture) VALUES ($1, $2, $3) RETURNING id",
        [data.email, data.name, data.picture],
      );
      userId = newUser.rows[0].id;
    }

    const expiresAt = tokens.expiry_date ? new Date(tokens.expiry_date) : null;
    const existingToken = await pool.query(
      "SELECT id FROM oauth_tokens WHERE user_id = $1",
      [userId],
    );

    if (existingToken.rows.length > 0) {
      await pool.query(
        `UPDATE oauth_tokens
        SET access_token = $1,
        refresh_token = COALESCE($2, refresh_token),
        expires_at = $3,
        updated_at = NOW()
        WHERE user_id = $4
        `,
        [tokens.access_token, tokens.refresh_token, expiresAt, userId],
      );
    } else {
      await pool.query(
        `INSERT INTO oauth_tokens (user_id, access_token, refresh_token, expires_at) VALUES ($1, $2, $3, $4)`,
        [userId, tokens.access_token, tokens.refresh_token, expiresAt],
      );
    }

    (req.session as any).user = data;
    (req.session as any).tokens = tokens;
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (err) {
    return res.status(401).json({
      error: "Request is missing required authentication credentials",
    });
  }
};

const healthCheck = (req: Request, res: Response) => {
  const user = (req.session as any).user;

  if (!user) {
    return res.json({ isLoggedIn: false });
  }

  res.json({ message: "Logged In!", user });
};

const logout = (req: Request, res: Response) => {
  (req.session as any).destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
};

export { googleLogin, googleCallback, healthCheck, logout };
