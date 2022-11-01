export type SignUpRequest = {
    areaCode: string;
    phoneNumber: string;
}

export type VerifyRequest = {
    phoneNumber: string;
    password: string;
}

export type SignUpResponse = void

export type VerifyResponse = {
    accessToken: string;
}