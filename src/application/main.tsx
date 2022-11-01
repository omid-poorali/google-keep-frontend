import { AuthProvider } from "./auth";
import { SettingsProvider } from "contexts";
import { ErrorBoundary } from "./errorBoundary";
import { AppRoutes } from "./routes";

export const Application = () => {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <SettingsProvider>
                    <AppRoutes />
                </SettingsProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}