import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTags } from "contexts";
import classNames from "classnames";
import { IconButton, Modal, Icons } from "components";
import { CreateNewTag } from "./createNewTag";
import * as Routes from "routes";

type PropsType = {
    className: string;
}

export const Tags = (props: PropsType) => {

    const {
        className
    } = props;

    const { tags } = useTags();


    const [modal, setModal] = useState({
        open: false
    });

    const handleNewTagClick = () => {
        setModal(prevData => ({ ...prevData, open: true }));
    }

    const handleModalClose = () => {
        setModal(prevData => ({ ...prevData, open: false }));

    }

    const rootClassName = classNames("flex flex-row md:flex-col bg-green-400", className);
    const tagClassName = "m-4 text-center";

    return (
        <div className={rootClassName}>
            <div className="flex-grow flex flex-row flex-wrap items-center justify-start md:flex-col md:justify-start">
                <Link className={tagClassName} to="/">All</Link>

                {React.Children.toArray(tags.map(tag => (
                    <Link className={tagClassName} to={`${Routes.Main.home.path}?tag=${tag.id}`}>{tag.name}</Link>
                )))}
            </div>
            <div className="p-4 flex flex-col items-center">
                <IconButton type="button" onClick={handleNewTagClick}>
                    <Icons.TagPlus />
                </IconButton>
                <span className="hidden md:inline-block">Add New Tag</span>
            </div>
            <Modal open={modal.open} onOverlayClick={handleModalClose}>
                <CreateNewTag onClose={handleModalClose} />
            </Modal>
        </div>
    )
}