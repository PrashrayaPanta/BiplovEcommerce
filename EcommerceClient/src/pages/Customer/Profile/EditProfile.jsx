import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";

import * as Yup from "yup";
import http from "@/http";

const EditProfile = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().required().email(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log(data);

      async function PostEditProfileData() {
        try {
          console.log("I am inside the posty login data");

          const { token } =
            JSON.parse(localStorage.getItem("userInfo")) || null;

          const response = await http.put("/users/profile/edit", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response);

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

          //   dispatch(setUser(response.data));

          //   navigate("/");

          //   localStorage.setItem("userInfo", JSON.stringify(response.data));

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
          formik.resetForm();
        }
      }

      PostEditProfileData();

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
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              {/* Reviewer Name Text */}
              <div className="grid gap-2">
                <Label htmlFor="password">New Username</Label>
                <Input
                  id="password"
                  placeholder="New username"
                  name="username"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-red-400">{formik.errors.username}</div>
                )}
              </div>

              {/* confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="email">New Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="New Email"
                  name="email"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-400">{formik.errors.email}</div>
                )}
              </div>

              <div>
                <Button type="submit">Change Password</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
