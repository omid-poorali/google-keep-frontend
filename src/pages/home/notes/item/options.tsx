import React from "react";
import { Icons, IconButton, MultiSelect } from "components";
import * as Models from "models";
import { useTags } from "contexts";


type PropsType = {
    note: Models.Note;
    onDelete?: (_note: Models.Note) => void;
    onUpdate?: (_note: Models.Note) => void;
}

export const Options = (props: PropsType) => {
    const {
        note,
        onUpdate,
        onDelete
    } = props;

    const { tags } = useTags();

    const tagsOptions = tags.map(tag => ({ label: tag.name, value: tag.id }));

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDelete?.(note);
    }

    return (
        <div className="mt-4 w-full flex flex-row justify-end items-center">
            <MultiSelect
                fullWidth
                options={tagsOptions}
                value={note.tags}
                onChange={({ value }) => {
                    const update = {
                        ...note,
                        tags: value
                    }
                    onUpdate?.(update);
                }}
            />
            <IconButton type="button" onClick={handleDeleteClick}>
                <Icons.Delete className="w-4 text-green-900  hover:text-red-900" />
            </IconButton>

        </div>
    )
}