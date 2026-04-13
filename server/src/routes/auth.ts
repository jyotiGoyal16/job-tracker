import { Router } from "express";
import { google } from "googleapis";
import { oauth2Client, SCOPES } from "../config/google";
import pool from "../config/db";

const router = Router();

//redirect to google consent screen
router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
  res.redirect(url);
});

//handle google callback
router.get("/google/callback", async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    const existingUser = await pool.query(
      "SELECT id, email, name, picture FROM users WHERE email = $1",
      [data.email],
    );

    let userId: number;

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

    const existingTokens = await pool.query(
      "SELECT id FROM oauth_tokens WHERE user_id = $1",
      [userId],
    );

    if (existingTokens.rows.length > 0) {
      await pool.query(
        `UPDATE oauth_tokens 
            SET access_token = $1,
            refresh_token = $2,
            expires_at = $3,
            updated_at = NOW()
            WHERE user_id = $4
            `,
        [tokens.access_token, tokens.refresh_token, expiresAt, userId],
      );
    } else {
      await pool.query(
        `
            INSERT INTO oauth_tokens (user_id, access_token, refresh_token, expires_at) VALUES ($1, $2, $3, $4)`,
        [userId, tokens.access_token, tokens.refresh_token, expiresAt],
      );
    }

    (req.session as any).user = {
      id: userId,
      email: data.email,
      name: data.name,
      picture: data.picture,
    };

    (req.session as any).tokens = tokens;
    res.redirect(process.env.CLIENT_URL || "http://localhost:5173");
  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).json({ error: "Failed to authenticate with Google" });
  }
});

router.get("/me", (req, res) => {
  if ((req.session as any).user) {
    res.json({
      user: (req.session as any).user,
    });
    return;
  }

  res.status(401).json({ error: "Unauthorized" });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

export default router;
