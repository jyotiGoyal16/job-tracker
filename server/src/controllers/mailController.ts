import { Request, Response } from "express";
import { google } from "googleapis";
import pool from "../configs/db";
import { oauth2Client } from "../configs/google";
import {
  getHeaderValue,
  extractEmailBody,
  detectApplicationStatus,
  getEmailContent,
} from "../utils/mailParser";
import { HeaderValues } from "../types/HeaderValues";
import { ApplicationStatus } from "../types/ApplicationStatus";
import format from "pg-format";
import { MailDetails } from "../types/MailDetails";

const getMails = async (req: Request, res: Response) => {
  try {
    const user = (req.session as any).user;
    if (!user) {
      return res
        .status(401)
        .json({ error: "Not authenticated. Please login." });
    }

    const existingUser = await pool.query(
      "SELECT id, email FROM users WHERE email = $1",
      [user.email],
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId: number = existingUser.rows[0].id;

    const tokens = await pool.query(
      `SELECT access_token, refresh_token, expires_at
       FROM oauth_tokens
       WHERE user_id = $1`,
      [userId],
    );

    if (tokens.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Tokens not found. Please login again." });
    }

    oauth2Client.setCredentials({
      access_token: tokens.rows[0].access_token,
      refresh_token: tokens.rows[0].refresh_token,
      expiry_date: tokens.rows[0].expires_at
        ? new Date(tokens.rows[0].expires_at).getTime()
        : null,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const searchQuery = `
    (from:jobs-noreply@linkedin.com OR from:indeedapply@indeed.com)
    after:${startDate}
    before:${endDate}
    -subject:("job alert" OR "job alerts" OR alerts OR recommendation OR recommendations OR "New jobs similar to" OR "New jobs matching your profile" OR "apply now to")
`;

    const listResponse = await gmail.users.messages.list({
      userId: "me",
      q: searchQuery,
    });

    const messages = listResponse.data.messages ?? [];

    const fullMessages = await Promise.all(
      messages
        .filter((m) => m.id)
        .map((m) =>
          gmail.users.messages.get({
            userId: "me",
            id: m.id!,
            format: "full",
          }),
        ),
    );

    const mailDetails: MailDetails[] = [];

    for (const message of fullMessages) {
      const messageId = message.data.id;
      if (!messageId) continue;

      const payload = message.data.payload;
      const headers: HeaderValues[] = payload?.headers ?? [];

      const from = getHeaderValue(headers, "From");
      const headerDate = getHeaderValue(headers, "Date");
      const body = extractEmailBody(payload);
      const emailContent = getEmailContent(headerDate, from, body);
      const status = detectApplicationStatus(emailContent?.content);
      const { date, role, company, location, platform } = emailContent;

      mailDetails.push({
        id: messageId,
        role,
        company,
        location,
        status,
        platform,
        date,
      });
    }

    const values = mailDetails.map((m) => [
      userId,
      m.company,
      m.role,
      m.platform,
      m.location,
      m.date,
      m.status,
      m.id,
      new Date(),
    ]);

    await pool.query(
      format(
        `INSERT INTO applications(user_id, company_name, role, platform, location, date_applied, status, source_email_id, created_at)
        VALUES %L
        ON CONFLICT (user_id, source_email_id) DO NOTHING
        `,
        values,
      ),
    );

    return res.json({
      message: "Mails fetched successfully",
      userId,
      totalFetched: messages.length,
      totalReturned: mailDetails.length,
      mailDetails,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", err });
  }
};

export { getMails };
