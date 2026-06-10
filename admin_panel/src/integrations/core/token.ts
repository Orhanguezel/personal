// src/integrations/core/token.ts
const TOKEN_KEY = "mh_access_token";
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function setTokenCookie(token: string) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; Path=/; Max-Age=${TOKEN_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

function clearTokenCookie() {
  document.cookie = `${TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export const tokenStore = {
  get(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(TOKEN_KEY) || "";
  },
  set(token?: string | null) {
    if (typeof window === 'undefined') return;
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      clearTokenCookie();
    } else {
      localStorage.setItem(TOKEN_KEY, token);
      setTokenCookie(token);
    }
  },
};
