import JWTDecode, { JwtPayload } from "jwt-decode";

export const decodeJWT = <T>(token: string): T => JWTDecode(token);

export const isTokenExpired = (token: string): boolean => {
    const decoded = JWTDecode(token) as JwtPayload;
    if (decoded?.exp) {
        if (Date.now() >= decoded.exp * 1000) {
            return true;
        }
    }
    return false;
};