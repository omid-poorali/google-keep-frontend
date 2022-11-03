import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "components";
import { useTags } from "contexts";
import * as Models from "models";

type NewTag = Omit<Models.Tag, "id">;

type PropsType = {
  onClose?: () => void;
}

export const CreateNewTag = (props: PropsType) => {

  const {
    onClose
  } = props;

  const { addTag } = useTags();
  const isSubmitting = useRef<boolean>(false);

  const defaultValues = {
    name: "",
  };

  const {
    reset,
    control,
    handleSubmit
  } = useForm<NewTag>({
    defaultValues
  });

  const resetForm = () => {
    isSubmitting.current = false;
    reset(defaultValues);
  }

  const onSubmit = (values: NewTag) => {
    if (!isSubmitting.current) {
      isSubmitting.current = true;
      addTag(values).then(() => {
        resetForm();
        onClose?.();
      });
    }
  }

  return (
    <div className="p-4 w-full max-w-md flex flex-col bg-white">
      <h3 className="mb-4">Add new Tag</h3>
      <form
        className="w-full flex flex-col"
        onSubmit={handleSubmit(onSubmit)}>
        <Controller
          rules={{
            required: true
          }}
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              className="p-2"
              type="text"
              placeholder={"name of tag"}
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <div className="mt-2 flex flex-row justify-end">
          <Button type="submit" variant="text">add</Button>
        </div>
      </form>
    </div>
  );
};