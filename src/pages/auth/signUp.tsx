import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "application";
import * as Routes from "routes";
import * as Apis from "apis";

const SignUp = () => {

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit
  } = useForm<any>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: any) => {
    Apis.auth.signUp(values).then(({ accessToken }) => {
      login({ accessToken });
      navigate(Routes.Main.home.path);
    });
  };

  return (
    <div className="w-full antialiased bg-gray-200 text-gray-900 font-sans">
      <div className="flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl font-bold mb-4">Note Taking</span>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4" action="/" method="post">
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-xs mb-1">Email</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email")} />
            </div>
            <div className="mb-6 md:w-full">
              <label htmlFor="password" className="block text-xs mb-1">Password</label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")} />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">login</button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default SignUp;