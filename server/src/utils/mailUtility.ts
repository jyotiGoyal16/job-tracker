import { convert } from "html-to-text";

const toIsoDate = (rawDate: string): string | null => {
  if (!rawDate) return null;

  const parsed = new Date(rawDate);
  return parsed.toISOString();
};

const decodeBase64Url = (input?: string): string => {
  if (!input) return "";
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf-8");
};

const convertHtmlToText = (html: string): string => {
  return convert(html, {
    wordwrap: 120,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "img", format: "skip" },
    ],
  })
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const decodePayloadBody = (
  payloadBody: string,
  mimeType: string,
): { htmlText: string; plainText: string } => {
  let htmlText = "";
  let plainText = "";
  const decoded = decodeBase64Url(payloadBody);

  if (mimeType === "text/html") {
    htmlText = convertHtmlToText(decoded);
  } else {
    plainText = decoded;
  }

  return { htmlText, plainText };
};

export { toIsoDate, decodeBase64Url, convertHtmlToText, decodePayloadBody };
