import { Enums } from "../commons";
import { SystemRoute } from "./main";
import { lazy } from "react";


export const signUp: SystemRoute = {
    path: "/auth/sign-up",
    element: lazy(() => import("../pages/auth/signUp")),
    layout: Enums.Layout.Simple,
    access: Enums.RouteAccess.Public,
}



export const all = [
    signUp
]