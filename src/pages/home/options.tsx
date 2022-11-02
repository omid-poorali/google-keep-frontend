import React from "react";
import { Icons, IconButton } from "components";
import * as Models from "models";


type PropsType = {
    note: Models.Note;
    onDelete?: (_note: Models.Note) => void;
}

export const Options = (props: PropsType) => {
    const {
        note,
        onDelete
    } = props;

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDelete?.(note);
    }

    return (
        <div className="w-full flex flex-row justify-end">
            <IconButton type="button" onClick={handleDeleteClick}>
                <Icons.Delete className="w-4 text-green-900  hover:text-red-900" />
            </IconButton>
        </div>
    )
}