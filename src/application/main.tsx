import { AuthProvider } from "./auth";
import { NotesProvider } from "contexts";
import { ErrorBoundary } from "./errorBoundary";
import { AppRoutes } from "./routes";

export const Application = () => {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <NotesProvider>
                    <AppRoutes />
                </NotesProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}