import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { X } from "lucide-react";
import TinyMCEEditor from "@/components/blogComponents/TinyMCEEditor";
import { useFormik } from "formik";

import * as Yup from "yup";

import InputField from "@/components/InputField";
import http from "@/http";
import { useNavigate } from "react-router-dom";

const Create = () => {
  console.log("I am insiode post ko category");

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log(data);

      // console.log("Hello");

      // console.log("Form data object is cretaed");

      // console.log(form dat);

      // console.log("Hello");
      console.log(data);

      async function PostProductData() {
        const response = await http.post("/admin/postCategories", data);

        navigate("/postCategory");
        // console.log(response);
      }

      PostProductData();

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
    <form onSubmit={formik.handleSubmit} className="space-y-8 mt-24">
      <Card>
        <CardHeader>
          <CardTitle>Post Category Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <InputField
              formik={formik}
              label="Category Title"
              name="title"
              type="text"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Category for Post</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Create;
