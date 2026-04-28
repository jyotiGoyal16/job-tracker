const WORKDAY_ROLE_PATTERNS: RegExp[] = [
  /\bapplication for (?:the )?(?:R\d+\s+)?([A-Z][A-Za-z0-9,&().\/' -]{2,}?)\s+(?:position|role)\b/i,
  /\bthank you for applying to (?:our )?([A-Z][A-Za-z0-9,&().\/' -]{2,}?)\s+(?:position|role)\b/i,
  /\binterest in the ([A-Z][A-Za-z0-9,&().\/' -]{2,}?)\s+(?:position|role)\b/i,
  /\bfor the (?:R\d+\s+)?([A-Z][A-Za-z0-9,&().\/' -]{2,}?)\s+(?:position|role)\b/i,
  /\bapplying for (?:the )?([A-Z][A-Za-z0-9,&().\/' -]{2,}?)\s+(?:position|role)\b/i,
];

const GREENHOUSE_ROLE_PATTERNS = [
  /\bapplication for (?:the )?(.+?)\s+(?:position|role)\b/i,
  /\binterested in (?:the )?(.+?)\s+(?:position|role)\b/i,
  /\bapplying for (?:the )?(.+?)\s+(?:position|role)\b/i,
  /\bapplied for (?:the )?(.+?)\s+(?:position|role)\b/i,
  /\bfor (?:the )?(.+?)\s+(?:position|role)\b/i,
];

const WORKDAY_COMPANY_PATTERNS: RegExp[] = [
  /\bYour\s+([A-Za-z0-9&.' -]+?)\s+Hiring Team\b/i, // Walmart
  /\b([A-Za-z0-9&.' -]+?)\s+Talent Acquisition Team\b/i, // Visa / Adobe
  /\bapplying to\s+([A-Za-z0-9&.' -]+?)\s+for\b/i, // Movado Group ...
  /\b([A-Za-z0-9&.' -]+?)\s+(?:Inc\.|Incorporated|Private Limited)\b/i,
];

const GREENHOUSE_COMPANY_PATTERNS: RegExp[] = [
  /\bapplying to\s+([A-Za-z0-9&.' -]+?)[!.,]/i,
  /\bjoining\s+([A-Za-z0-9&.' -]+?)[!.,]/i,
  /\bconsidering\s+([A-Za-z0-9&.' -]+?)\s+to be\b/i,
  /\b([A-Za-z0-9&.' -]+?)'s\s+Talent Team\b/i,
];

export {
  WORKDAY_ROLE_PATTERNS,
  GREENHOUSE_ROLE_PATTERNS,
  WORKDAY_COMPANY_PATTERNS,
  GREENHOUSE_COMPANY_PATTERNS,
};
