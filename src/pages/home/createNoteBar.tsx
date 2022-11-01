import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import classNames from "classnames";
import { Textarea, Button } from "components";
// import { useNotes } from "contexts";
import * as Models from "models";
// import * as Apis from "apis";

type NewNote = Omit<Models.Note, "id">;


export const CreateNoteBar = () => {

  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [expand, setExpand] = useState<boolean>(false);

  useEffect(() => {
    if (expand) {
      bodyRef.current?.focus();
    }
  }, [expand]);

  const {
    control,
    handleSubmit
  } = useForm<NewNote>({
    defaultValues: {
      title: "",
      body: ""
    }
  })

  // const { addNote } = useNotes();

  // const handleAddNote = async (noteToAdd: NewNote) => {
  //   try {
  //     const response = await Apis.note.createNote({
  //       title: noteToAdd.title,
  //       body: noteToAdd.body,
  //     });

  //     const addedNote = {
  //       ...response.data,
  //     };

  //     addNote(addedNote);
  //   } catch (err) {
  //     addToast({
  //       type: "error",
  //       title: "Erro ao adicionar nota",
  //     });
  //   } finally {
  //     setColor(0);
  //   }
  // };

  const handleTitleFocus = () => {
    setExpand(() => true);
  };

  const onSubmit = (values: NewNote) => {
    console.log(values)
  }

  const wrapperClassName = classNames({
    "hidden": !expand
  });

  return (
    <form
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