// Simple API base helper for the orthodontist frontend
const rawBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
let normalizedBase = rawBase || '';
if (normalizedBase && !/^https?:\/\//i.test(normalizedBase)) {
  normalizedBase = `http://${normalizedBase}`;
}
// remove trailing slash
if (normalizedBase) normalizedBase = normalizedBase.replace(/\/$/, '');

export const API_BASE = normalizedBase; // may be empty string which means same-origin

export const buildApiUrl = (path) => {
  const p = path && path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE) return p; // same-origin
  return `${API_BASE}${p}`;
};

export default { API_BASE, buildApiUrl };

/**
 * Converts a standard Google Drive sharing URL into a direct download link.
 * @param {string} url The Google Drive URL.
 * @returns {string} The direct download URL.
 */
export const getGoogleDriveDownloadUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return '#'; // Return a safe link if URL is invalid
  }

  let fileId = null;

  // Regex for drive.google.com/file/d/FILE_ID/view or /edit
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  // Regex for docs.google.com/document/d/FILE_ID/edit
  const docsRegex = /docs\.google\.com\/(?:document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]+)/;

  const driveMatch = url.match(driveRegex);
  if (driveMatch && driveMatch[1]) {
    fileId = driveMatch[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  const docsMatch = url.match(docsRegex);
  if (docsMatch && docsMatch[1]) {
    fileId = docsMatch[1];
    // For Google Docs, Sheets, or Slides, export as PDF. This is a robust default.
    if (url.includes('/document/')) {
      return `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
    } else if (url.includes('/spreadsheets/')) {
      return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;
    } else if (url.includes('/presentation/')) {
      return `https://docs.google.com/presentation/d/${fileId}/export?format=pptx`;
    }
  }

  // If it's not a recognized Google Drive/Docs link, return the original URL.
  return url;
};

