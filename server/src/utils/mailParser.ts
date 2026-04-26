import { ApplicationStatus } from "../types/ApplicationStatus";
import { HeaderValues } from "../types/HeaderValues";
import { decodePayloadBody, toIsoDate } from "./mailUtility";

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

const extractEmailBody = (payload: any): string => {
  if (!payload) return "";

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
    text.includes("not be moving forward")
  ) {
    return "rejected";
  } else if (
    text.includes("application submitted") ||
    text.includes("application was sent to")
  ) {
    return "applied";
  }
  return "other";
};

export {
  getHeaderValue,
  getPlatform,
  getEmailContent,
  detectApplicationStatus,
  extractEmailBody,
};
