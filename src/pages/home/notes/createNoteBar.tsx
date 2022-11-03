import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useOutsideRefClick } from "hooks";
import { Textarea, Button, MultiSelect } from "components";
import { useNotes, useTags } from "contexts";
import * as Models from "models";

type NewNote = Omit<Models.Note, "id">;

export const CreateNoteBar = () => {

  const { addNote } = useNotes();
  const { tags } = useTags();

  const tagsOptions = tags.map(tag => ({ label: tag.name, value: tag.id }));

  const [expand, setExpand] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const isSubmitting = useRef<boolean>(false);

  useEffect(() => {
    if (expand) {
      bodyRef.current?.focus();
    }
  }, [expand]);

  const defaultValues = {
    title: "",
    body: "",
    tags: []
  };

  const {
    setValue,
    reset,
    control,
    handleSubmit
  } = useForm<NewNote>({
    defaultValues
  });

  const resetForm = () => {
    isSubmitting.current = false;
    setExpand(() => false);
    reset(defaultValues);
  }

  useOutsideRefClick(() => {
    handleSubmit(onSubmit)();
  }, formRef)


  const onSubmit = (values: NewNote) => {
    if (!isSubmitting.current) {
      isSubmitting.current = true;
      if (values.title || values.body) {
        addNote(values).then(() => {
          resetForm();
        });
      }
      else {
        resetForm();
      }
    }
  }

  const handleTitleFocus = () => {
    setExpand(() => true);
  };

  return (
    <form
      ref={formRef}
      className="w-full max-w-md flex flex-col shadow-[0px_1px_1px_rgba(9,30,66,0.25),0px_0px_1px_1px_rgba(9,30,66,0.13)]"
      onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            className="p-2 border-none outline-none"
            type="text"
            placeholder={expand ? "Title" : "Take a note..."}
            value={value ?? ""}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={handleTitleFocus}
          />
        )}
      />
      {expand && (
        <>
          <Controller
            name="body"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                ref={bodyRef}
                fullWidth
                autoGrowing
                className="p-2 mt-1 border-none outline-none"
                placeholder="Take a note..."
                value={value ?? ""}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <div className="p-2 flex flex-row justify-end items-center">
            <Controller
              name="tags"
              control={control}
              render={({ field: { value } }) => (
                <MultiSelect
                  searchable
                  fullWidth
                  options={tagsOptions}
                  value={value}
                  onChange={({ value }) => {
                    setValue("tags", value)
                  }} />
              )}
            />

            <Button type="submit" variant="text">add</Button>
          </div>
        </>
      )}
    </form>
  );
};