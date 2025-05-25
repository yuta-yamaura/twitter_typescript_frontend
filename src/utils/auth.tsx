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
  Cookies.get(COOKIE_AUTH_KEY);
};

export const removeToken = () => {
  Cookies.remove(COOKIE_AUTH_KEY);
  delete instance.defaults.headers.common["Authorization"];
};
