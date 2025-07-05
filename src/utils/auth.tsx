import Cookies from "js-cookie";
import { instance } from "./client";

type TokenProps = {
  token: string;
};

const COOKIE_AUTH_KEY = "auth_token";

export const setAuthToken = ({ token }: TokenProps) => {
  Cookies.set(COOKIE_AUTH_KEY, token, { expires: 7 });
  // axiosのデフォルトヘッダーにトークンを設定
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getAuthToken = () => {
  const token = Cookies.get(COOKIE_AUTH_KEY);
  return token;
};

export const removeToken = () => {
  Cookies.remove(COOKIE_AUTH_KEY);
  delete instance.defaults.headers.common["Authorization"];
};

// サイドバーのプロフィール用にCookieに保存したトークンをデコードする処理
export const decodeJWT = (token: string): { [key: string]: any } | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};
