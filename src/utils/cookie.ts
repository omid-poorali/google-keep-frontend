import Cookies from "js-cookie";

// set cookie
export const setCookie = (key: string, value: string | undefined) => {
  if (value) {
    Cookies.set(key, value, {
      expires: new Date(new Date().getTime() + 60 * 60 * 360 * 1000)
    });
  }
};

// remove cookie
export const removeCookie = (key: string) => {
  Cookies.remove(key);
};

// get cookie
export const getCookie = (key: string) => {
  return Cookies.get(key);
};