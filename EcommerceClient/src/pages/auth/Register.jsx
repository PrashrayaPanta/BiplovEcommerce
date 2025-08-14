

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";


import http from "../../http"

// Import Link for navigation
import InputField from "@/components/InputField";
import { SubmitBtn } from "@/components/SubmitBtn.jsx";



// export const registerSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Invalid email address.",
//   }),
//   password: z.string().min(6, {
//     message: "Password must be at least 6 characters.",
//   }),
// });

export function Register() {

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {

      username:"",
      email: "",
      password: "",

    },

    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      // console.log("Hello");

      console.log(data);

      async function PostData() {
        console.log("I am insidce post data call");

        try {
          const response = await http.post("/users/register", data);

          console.log(response);


        
        
          navigate("/login");

          




          // ToStorage("customerPartToken", response.data.token, remember);

          // dispatch(setUser(response.data));

          // navigate("/");

          // response.data.token);

          // if(response){
          //   navigate("/login")
          // }
        } catch ({ response }) {
          formik.setFieldError("email", response?.data?.message);
        } finally {
          setSubmitting(false);
        }
      }

      PostData();

      //   setTimeout(() => setSubmitting(false), 2000);
      // console.log(setSubmitting);
      //api request
      // https://mern-130.nru.com.np/ is common route in all so make it in other file and call it
      // console.log(response);

      // http
      //   .post("/api/users/r", data)
      //   .then(({ data }) => navigate("/login"))
      //   .catch(({ response }) => {
      //     console.log(response);

      //     BackendvalidationError(formik, response);
      //   })
      //   .finally(() => setSubmitting(false));
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-8 max-w-[30rem] mx-auto p-6 border-2 rounded-lg   mt-20"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <div className="flex flex-col gap-6">


        <div className="grid gap-2">
            <InputField
              formik={formik}
              label="Username"
              icon="fa-solid fa-user"
              type="text"
              name="username"
            />
          </div>
          <div className="grid gap-2">
            {/* Label With SVG Icon Container */}

            <InputField
              formik={formik}
              label="Email"
              icon="fa-solid fa-envelope"
              type="text"
              name="email"
            />
          </div>
          <div className="grid gap-2">
            <InputField
              formik={formik}
              label="Password"
              icon="fa-solid fa-key"
              type="password"
              name="password"
            />
          </div>

      
          <SubmitBtn formik={formik} label="Register" />
        </div>
        {/* Login Prompt */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
