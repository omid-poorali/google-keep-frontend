import request from "apis/request";
import { SignUpRequest, SignUpResponse } from "./contract";

export const signUp = async (payload: SignUpRequest) => {
  return await request.post<SignUpRequest, SignUpResponse>("/auth/sign-up", payload);
}