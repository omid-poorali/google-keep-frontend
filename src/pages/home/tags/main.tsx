import React from "react";
import { Link } from "react-router-dom";
import { useTags } from "contexts";
import classNames from "classnames";
import * as Routes from "routes";

type PropsType = {
    className: string;
}

export const Tags = (props: PropsType) => {

    const {
        className
    } = props;

    const { tags } = useTags();

    const rootClassName = classNames("flex flex-row md:flex-col bg-green-400", className);
    const tagClassName = "w-full p-2 text-center";

    return (
        <div className={rootClassName}>
            <Link className={tagClassName} to="/">All</Link>
            {React.Children.toArray(tags.map(tag => (
                <Link className={tagClassName} to={`${Routes.Main.home.path}?tag=${tag.id}`}>{tag.name}</Link>
            )))}
        </div>
    )
}