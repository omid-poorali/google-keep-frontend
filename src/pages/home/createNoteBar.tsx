import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";
import { useOutsideRefClick } from "hooks";
import { Textarea, Button } from "components";
import { useNotes } from "contexts";
import * as Models from "models";
import * as Apis from "apis";

type NewNote = Omit<Models.Note, "id">;

export const CreateNoteBar = () => {

  const { addNote } = useNotes();

  const [expand, setExpand] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (expand) {
      bodyRef.current?.focus();
    }
  }, [expand]);

  const defaultValues = {
    title: "",
    body: ""
  };

  const {
    reset,
    control,
    handleSubmit
  } = useForm<NewNote>({
    defaultValues
  });

  const resetForm = () => {
    setExpand(() => false);
    reset(defaultValues);
  }

  useOutsideRefClick(() => {
    handleSubmit(onSubmit)();
  }, formRef)


  const onSubmit = async (values: NewNote) => {
    if (values.title || values.body) {
      const newNote = await Apis.note.createNote(values);
      if (newNote) {
        addNote(newNote);
        resetForm();
      }
    }
    else {
      resetForm();
    }
  }

  const handleTitleFocus = () => {
    setExpand(() => true);
  };

  const wrapperClassName = classNames({
    "hidden": !expand
  });

  return (
    <form
      ref={formRef}
      className="w-full max-w-md flex flex-col shadow-[0px_1px_2px_0_rgba(60,64,67,0.302),0px_2px_6px_2px_rgba(60,64,67,0.149)]"
      onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            className="p-2 border-none outline-none"
            type="text"
            placeholder="Title"
            value={value ?? ""}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={handleTitleFocus}
          />
        )}
      />
      <div className={wrapperClassName}>
        <Controller
          name="body"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Textarea
              ref={bodyRef}
              autoGrowing
              className="p-2 mt-1 border-none outline-none"
              placeholder="Take a note..."
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <div className="p-2 flex flex-row justify-end">
          <Button type="submit" variant="text">add</Button>
        </div>
      </div>
    </form>
  );
};