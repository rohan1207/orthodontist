// Simple API base helper for the orthodontist frontend
const rawBase = import.meta.env.VITE_API_URL || '';
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
