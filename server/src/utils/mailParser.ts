import {
  GREENHOUSE_COMPANY_PATTERNS,
  GREENHOUSE_ROLE_PATTERNS,
  WORKDAY_COMPANY_PATTERNS,
  WORKDAY_ROLE_PATTERNS,
} from "../constants";
import { ApplicationStatus } from "../types/ApplicationStatus";
import { HeaderValues } from "../types/HeaderValues";
import { decodePayloadBody, toIsoDate } from "./mailUtility";

const extractRole = (text: string, rolePatterns: RegExp[]) => {
  for (const re of rolePatterns) {
    const m = re.exec(text);
    if (m?.[1]) return m[1].trim();
  }
  return "";
};

const extractCompany = (text: string, companyPatterns: RegExp[]) => {
  for (const pattern of companyPatterns) {
    const match = pattern.exec(text);
    if (match?.[1]) return match[1].trim().replace(/[!.,]$/, "");
  }
  return "";
};

const getHeaderValue = (
  headers: HeaderValues[],
  headerName: string,
): string => {
  const header = headers.find(
    (h) => h.name?.toLowerCase() === headerName.toLowerCase(),
  );
  return header?.value || "";
};

const getPlatform = (from: string) => {
  if (!from) return "-";

  if (from.includes("linkedin")) return "Linkedin";
  if (from.includes("indeed")) return "Indeed";
  if (from.includes("greenhouse-mail.io")) return "Greenhouse";
  if (from.includes("@myworkday.com")) return "Workday";
  return "other";
};

const pickBestBody = (plainText: string, htmlText: string): string => {
  const pTrim = plainText.trim();
  const hTrim = htmlText.trim();

  if (!pTrim) return htmlText;
  if (!hTrim) return plainText;

  // Plain text wins for LinkedIn application emails — it's way cleaner
  if (
    /your application was sent to|application submitted|indeed application/i.test(
      pTrim,
    )
  ) {
    return plainText;
  }

  // Otherwise score-based pick
  const score = (text: string): number => {
    const t = text.toLowerCase();
    let s = 0;
    s += Math.min(text.length, 2500) / 250;
    if (t.includes("application")) s += 3;
    if (t.includes("submitted")) s += 2;
    if (t.includes("interview")) s += 2;
    if (t.includes("position")) s += 2;
    if (t.includes("location")) s += 2;
    if (t.includes("company")) s += 1;
    if (t.includes("we'll help you get started")) s -= 2;
    if (t.length < 80) s -= 1;
    return s;
  };

  return score(hTrim) > score(pTrim) ? htmlText : plainText;
};

const extractEmailBodyJobBoard = (payload: any): string => {
  let textContent = "",
    htmlContent = "";

  if (!payload?.parts?.length) {
    if (payload.body?.data) {
      const { htmlText, plainText } = decodePayloadBody(
        payload.body.data,
        payload.mimeType,
      );
      textContent = plainText;
      htmlContent = htmlText;
    }
  } else {
    for (const part of payload.parts) {
      if (!part?.body?.data) continue;

      const { htmlText, plainText } = decodePayloadBody(
        part.body.data,
        part.mimeType,
      );
      textContent = plainText;
      htmlContent = htmlText;
    }
  }

  return pickBestBody(textContent, htmlContent);
};

const extractEmailBodyOther = (payload: any): string => {
  const parts = payload?.parts?.length ? payload.parts : [payload];

  for (const part of parts) {
    if (part?.body?.data) {
      const { htmlText, plainText } = decodePayloadBody(
        part.body.data,
        part.mimeType,
      );
      const picked = pickBestBody(plainText, htmlText);
      if (picked) return picked;
    }

    // one-level nested
    if (part?.parts?.length) {
      for (const child of part.parts) {
        if (!child?.body?.data) continue;
        const { htmlText, plainText } = decodePayloadBody(
          child.body.data,
          child.mimeType,
        );
        const picked = pickBestBody(plainText, htmlText);
        if (picked) return picked;
      }
    }
  }

  return "";
};

const extractEmailBody = (payload: any, from: string): string => {
  if (!payload) return "";

  const platform = getPlatform(from) || "";

  if (platform === "Linkedin" || platform === "Indeed") {
    return extractEmailBodyJobBoard(payload);
  } else if (platform === "Greenhouse" || platform === "Workday") {
    return extractEmailBodyOther(payload);
  }

  return "";
};

const getEmailContent = (
  headerDate: string,
  from: string,
  body: string,
): {
  date: string;
  role: string;
  company: string;
  location: string;
  platform: string;
  content: string[];
} => {
  const content: string[] = body
    .split("\n") // split on actual newline
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const platform = getPlatform(from) || "";
  const date = toIsoDate(headerDate) || "";
  let role: string = "";
  let company: string = "";
  let location: string = "";

  if (platform === "Linkedin") {
    const companyData = content[7]?.split(" · ") || [];
    role = content[6] || "";
    company = companyData[0] || "";
    location = companyData[1] || "";
  } else if (platform === "Indeed") {
    const companyData = content[4]?.split(" - ") || [];
    role = content[3] || "";
    company = companyData[0] || "";
    location = companyData[1] || "";
  } else if (platform === "Greenhouse") {
    role = extractRole(content.join(" "), GREENHOUSE_ROLE_PATTERNS);
    company = extractCompany(content.join(" "), GREENHOUSE_COMPANY_PATTERNS);
    location = "Bengaluru, Karnataka, India";
  } else if (platform === "Workday") {
    role = extractRole(content.join(" "), WORKDAY_ROLE_PATTERNS);
    company = extractCompany(content.join(" "), WORKDAY_COMPANY_PATTERNS);
    location = "Bengaluru, Karnataka, India";
  } else {
    const companyData = content[4]?.split(" - ") || [];
    role = content[3] || "";
    company = companyData[0] || "";
    location = companyData[1] || "";
  }
  return { date, role, company, location, platform, content };
};

const detectApplicationStatus = (body: string[]): ApplicationStatus => {
  const text = body?.join(" ").toLowerCase();

  if (
    text.includes("unfortunately") ||
    text.includes("we're sorry") ||
    text.includes("moving forward with other") ||
    text.includes("not be moving forward") ||
    text.includes("with another candidate")
  ) {
    return "rejected";
  } else if (
    text.includes("application submitted") ||
    text.includes("application was sent to") ||
    text.includes("for applying to") ||
    text.includes("for applying for") ||
    text.includes("received your application") ||
    text.includes("has been received") ||
    text.includes("for your interest in") ||
    text.includes("application is currently under review") ||
    text.includes("application is under review")
  ) {
    return "applied";
  }
  return "applied";
};

export {
  getHeaderValue,
  getPlatform,
  getEmailContent,
  detectApplicationStatus,
  extractEmailBody,
};
