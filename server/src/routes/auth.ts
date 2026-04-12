import { Router } from "express";
import { google } from "googleapis";
import { oauth2Client, SCOPES } from "../config/google";

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

    (req.session as any).user = {
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
