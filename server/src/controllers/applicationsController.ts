import { Request, Response } from "express";
import pool from "../configs/db";

const DEFAULT_PAGE_SIZE = 10;

const getApplications = async (req: Request, res: Response) => {
  try {
    const user = (req.session as any).user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [user.email],
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = existingUser.rows[0].id;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const page = Number(req.query.page) || 1;
    const itemsPerPage = Number(req.query.limit) || DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * itemsPerPage;

    const { rows: countRows } = await pool.query(
      `SELECT COUNT(*)::int AS total FROM applications WHERE user_id = $1 AND date_applied::date BETWEEN $2::date AND $3::date`,
      [userId, startDate, endDate],
    );
    const total = countRows[0]?.total ?? 0;

    const { rows } = await pool.query(
      `SELECT id, company_name AS company, role, platform, location, date_applied AS date, status
         FROM applications
        WHERE user_id = $1 AND date_applied::date BETWEEN $2::date AND $3::date
        ORDER BY date_applied DESC, id DESC
        LIMIT $4 OFFSET $5`,
      [userId, startDate, endDate, itemsPerPage, offset],
    );

    return res.json({
      data: rows,
      total,
      page,
      itemsPerPage,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error", err });
  }
};

export { getApplications };
