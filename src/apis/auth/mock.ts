import { RequestResult } from "apis/request";
import { SignUpRequest, SignUpResponse, VerifyRequest, VerifyResponse } from "./contract";

export const signUp = async (payload: SignUpRequest) => {
  return new Promise<RequestResult<SignUpResponse>>((resolve) => {
    resolve({
      message: "success"
    } as RequestResult<SignUpResponse>);
  });
}

export const verify = async (payload: VerifyRequest) => {
  return new Promise<RequestResult<VerifyResponse>>((resolve) => {
    resolve({
      message: "success",
      data: {
        accessToken: "accessToken"
      }
    } as RequestResult<VerifyResponse>);
  });
}