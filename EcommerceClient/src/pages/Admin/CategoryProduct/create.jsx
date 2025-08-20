import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import http from "@/http";
import { useNavigate } from "react-router-dom";
import { SubmitBtn } from "@/components/SubmitBtn";

const Create = () => {
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
        const { token } = JSON.parse(localStorage.getItem("userInfo"));

        try {
          const response = await http.post("/admin/productCategory", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigate("/productCategory");
        } catch (error) {
        } finally {
          setSubmitting(false);
        }

       
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
          <CardTitle>Product Category Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-400">{formik.errors.title}</div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitBtn formik={formik} label="save Category for products" />
          {/* <Button type="submit">Save Category for Product</Button> */}
        </CardFooter>
      </Card>
    </form>
  );
};

export default Create;
