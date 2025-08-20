import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import InputField from "@/components/InputField";
import { SubmitBtn } from "@/components/SubmitBtn.jsx";
import { useState } from "react";

import http from "../../http";

import { ToStorage } from "@/library";

import { useDispatch } from "react-redux";
import { setUser } from "../../store";

// const loginSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   password: z.string().min(6, {
//     message: "Password must be at least 6 characters.",
//   }),
// });

export function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [remember, setRemember] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log(data);

      async function PostLoginData() {
        try {
          console.log("I am inside the posty login data");

          const response = await http.post("/users/login", data);

          // console.log(response);

          // console.log("I am after the response");

          // console.log(response);

          // console.log(response)

          // console.log(response.data.token);

          // if (response.data.isAdmin) {
          //   ToStorage("adminToken", response.data.token, remember);
          // } else {
          //   ToStorage("customerToken", response.data.token, remember);
          // }

          dispatch(setUser(response.data));

          navigate("/");

          localStorage.setItem("userInfo", JSON.stringify(response.data));

          // ToStorage("adminToken", response.data.token, remember);

          // console.log("I am after the ToSring");

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

      PostLoginData();

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
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-8 max-w-[30rem] mx-auto p-6 border-2 rounded-lg my-4 mt-20"
    >
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <div className="flex flex-col gap-6">
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

        {/* <InputField formik={formik} label="Password" icon="fa-solid fa-key" type="password" name="password"/> */}

        {/* <Label>Rememberm me</Label> */}

        <div className="flex bg-red-400 items-center gap-2">
          <input
            type="checkbox"
            id="rememberme"
            onChange={() => setRemember(!remember)}
          />
          <label htmlFor="rememberme">Remeber Me</label>
        </div>

        <SubmitBtn formik={formik} label="Login" />
      </div>

      {/* Registration Prompt */}
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?
        <Link to="/register" className="text-blue-600 hover:underline ml-1">
          Register
        </Link>
      </p>
    </form>
  );
}
