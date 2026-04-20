import { google } from "googleapis";
import { oauth2Client, SCOPES } from "../config/google";
import { Request, Response } from "express";

const googleLogin = (req: Request, res: Response) => {
  const authUrl: string = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
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
    (req as any).session.user = data;

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (err) {
    return res.status(401).json({
      error: "Request is missing required authentication credentials",
    });
  }
};

const healthCheck = (req: Request, res: Response) => {
  const user = (req as any).session.user;

  if (!user) {
    return res.json({ isLoggedIn: false });
  }

  res.json({ message: "Logged In!", user });
};

const logout = (req: Request, res: Response) => {
  (req as any).session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
};

export { googleLogin, googleCallback, healthCheck, logout };
