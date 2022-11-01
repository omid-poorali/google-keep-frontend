import { SignUpRequest, SignUpResponse } from "./contract";

export const signUp = async (_payload: SignUpRequest) => {
  return new Promise<SignUpResponse>((resolve) => {
    resolve({
      accessToken: "token"
    });
  });
}