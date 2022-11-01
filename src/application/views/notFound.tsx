import { UIKIT } from "components";
import { useNavigate } from "react-router-dom";
import * as Routes from "routes";

export const NotFound = () => {
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate(Routes.Main.addNote.path, { replace: true });
    }

    return (
        <div className="w-full flex flex-col justify-center items-center min-h-screen bg-background">
            <div className="p-4 bg-white rounded-lg flex flex-col justify-center items-center shadow-xl">
                <h1 className="p-4 pt-8 font-bold text-5xl"> 404 Error.</h1>
                <p className="p-4 text-base"> We can't find the page you're looking for.</p>
                <UIKIT.Button className="my-4" onClick={handleButtonClick}>Back to home</UIKIT.Button>
            </div>
        </div>
    )
}