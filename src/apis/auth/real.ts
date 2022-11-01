import request from "apis/request";
import { SignUpRequest, SignUpResponse, VerifyRequest, VerifyResponse } from "./contract";

export const signUp = async (payload: SignUpRequest) => {
  return await request.post<SignUpRequest, SignUpResponse>("/auth/otp/sign-up", payload);
}

export const verify = async (payload: VerifyRequest) => {
  return await request.post<VerifyRequest, VerifyResponse>("/auth/otp/verify", payload);
}