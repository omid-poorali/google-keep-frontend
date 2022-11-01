// import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UIKIT } from "components";
// import * as Routes from "routes";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    trigger,
    setValue,
    getValues,
    control,
    handleSubmit
  } = useForm<any>({
    defaultValues: {
      areaCode: "98",
      phoneNumber: ""
    }
  });

  const values = getValues();

  const getPhoneNumberWithAreaCode = (values: any) => {
    return `${values.areaCode}${Number(values.phoneNumber)}`;
  }

  const onSubmit = (values: any) => {
    const variables = {
      areaCode: values.areaCode,
      phoneNumber: getPhoneNumberWithAreaCode(values)
    };


  };


  return (
    <div>
      <h3 className="mb-4 text-center">به فروشگاه خود خوش آمدید</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center"
      >
        <Controller
          rules={{
            required: true
          }}
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <UIKIT.InputText
              error
              placeholder="شماره موبایل"
              onBlur={field.onBlur}
              onChange={(event) => {
                const { value } = event.target;
                if (value) {
                  if (value.length <= 11) {
                    const numbers = value.match(/\d+/g)?.[0];
                    if (numbers) {
                      const numberValue = Number(numbers);
                      setValue("phoneNumber", `0${numberValue > 0 ? numberValue : ""}`);
                    }
                  }
                } else setValue("phoneNumber", "");
                trigger("phoneNumber");
              }}
              value={field.value}
              helperText={fieldState.error && "لطفا شماره موبایل خود را وارد نمایید"}
            />
          )}
        />
        <UIKIT.Button
          className="my-4"
          type="submit">
          ارسال
        </UIKIT.Button>
      </form>
    </div>
  );
};


export default SignUp;