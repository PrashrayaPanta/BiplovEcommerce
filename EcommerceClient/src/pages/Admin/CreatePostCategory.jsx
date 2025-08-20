import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TinyMCEEditor from "@/components/blogComponents/TinyMCEEditor";

import { useFormik } from "formik";
import * as Yup from "yup";
import http from "@/http";




export const CreatePostCategory = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      tags: "",
      content: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required(),
      category: Yup.string().required(),
      tags: Yup.string().required(),
      content: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log("Ia mk insiden the han dle suibmit jkbkjhbkj");

      console.log(data);

      // console.log("Hello");
      console.log(data);

      async function PostData() {
        console.log("I am insidce post data call");

        try {


          const response = await http.post("/admin/post", data);

          console.log(response);

        
            

          // const response = await http.post("/api/users/login", data);
          // console.log(response.data);
          // ToStorage("customerPartToken", response.data.token, remember)
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
    <div className="container mx-auto p-4 mt-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Write a New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
         

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  formik.setFieldValue("category", value)
                }
                value={formik.values.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-400">{formik.errors.category}</div>
              )}
            </div>




              <div className="flex justify-between">
              <Button variant="outline">Save Draft</Button>
              <Button type="submit">Publish</Button>

              </div>
      
          </form>
        </CardContent>
        {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Save Draft</Button>
          <Button type="submit">Publish</Button>
        </CardFooter> */}
      </Card>

   
    </div>
  );
};
