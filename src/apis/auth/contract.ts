export type SignUpRequest = {
    email: string;
    password: string;
}

export type SignUpResponse  = {
    accessToken: string;
}