import JWTDecode from "jwt-decode";

export const decodeJWT = <T>(token: string): T => JWTDecode(token);