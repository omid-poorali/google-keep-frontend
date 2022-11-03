import classNames from "classnames";
import { Options } from "./options";
import * as Models from "models";

type PropsType = {
  className: string;
  note: Models.Note;
  onDelete: (note: Models.Note) => void;
}

export const NoteItem = (props: PropsType) => {

  const {
    className,
    note,
    onDelete
  } = props;

  const rootClassName = classNames(`mb-4 p-2 flex flex-col
  shadow-[0px_1px_1px_rgba(9,30,66,0.25),0px_0px_1px_1px_rgba(9,30,66,0.13)] 
  hover:shadow-[0px_1px_2px_0_rgba(60,64,67,0.302),0px_2px_6px_2px_rgba(60,64,67,0.149)]`, className);


  return (
    <li className={rootClassName}>
      <div className="text-base font-medium text-gray-500">{note.title}</div>
      <p className="flex-grow text-base font-normal text-gray-400">{note.body}</p>
      <Options note={note} onDelete={onDelete} />
    </li>
  )
}