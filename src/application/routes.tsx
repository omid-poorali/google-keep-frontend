import React, { Suspense } from "react";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./auth";
import { Layouts } from "components";
import { Enums } from 'commons';
import * as AllRoutes from "routes";
import * as Views from "./views";

export const AppRoutes = () => {

    const Element = ({ access, element }: AllRoutes.Main.SystemRoute) => {

        const { isAuthenticated, loading } = useAuthContext();

        if (loading) {
            return <Views.Loading />;
        }

        if (access === Enums.RouteAccess.Private) {
            if (!isAuthenticated) {
                return <Navigate to={AllRoutes.Auth.signUp.path} replace />
            }
        }

        return (
            <Suspense fallback={<Views.Loading />}>
                <Layouts.Simple>
                    {React.createElement(element)}
                </Layouts.Simple>
            </Suspense>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={AllRoutes.Main.home.path} replace />} />
                {React.Children.toArray(
                    AllRoutes.all.map((route) => (
                        <Route
                            path={route.path}
                            element={<Element {...route} />} />
                    ))
                )}
                <Route path="*" element={<Views.NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}