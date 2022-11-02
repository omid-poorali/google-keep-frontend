import { AuthProvider } from "./auth";
import { NotesProvider, TagsProvider } from "contexts";
import { ErrorBoundary } from "./errorBoundary";
import { AppRoutes } from "./routes";

export const Application = () => {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <TagsProvider>
                    <NotesProvider>
                        <AppRoutes />
                    </NotesProvider>
                </TagsProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}