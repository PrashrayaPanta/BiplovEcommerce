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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store";
import { FromStorage, ToStorage } from "@/library";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((state) => state.user.value);

  console.log(user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user?.username,
      email: user?.email,
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

          const { token } = JSON.parse(FromStorage("userInfo")) || null;

          await http.put("/users/profile/edit", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          //   console.log(response);

          const response1 = await http.get("/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // console.log(response1);

          //   console.log(response1.data.user);

          //   console.log(response1.data.user);

          //   console.log(data);

          //   console.log(data);

          //   console.log({ data });

          //   ToStorage("userInfo", JSON.stringify(response1.data.user));

          // ToStorage("userInfo", JSON.stringify(response1.data.user));

          dispatch(setUser(response1.data.user));

          navigate("/");
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
                <Label htmlFor="username">New Username</Label>
                <Input
                  id="username"
                  placeholder="New username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-red-400">{formik.errors.username}</div>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">New Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="New Email"
                  name="email"
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
