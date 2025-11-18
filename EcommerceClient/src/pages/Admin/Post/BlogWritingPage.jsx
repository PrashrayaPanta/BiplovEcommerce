import React, { useEffect, useState } from "react";
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
import { FromStorage } from "@/library";

export const BlogWritingPage = () => {
  console.log("Ia minside the blog writing page");

  const [editorKey, setEditorKey] = useState(0);
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      tags: "",
      content: "",
      image: { url: "", public_id: "" }, // ✅ added image object
    },

    validationSchema: Yup.object({
      title: Yup.string().required(),
      category: Yup.string().required(),
      tags: Yup.string().required(),
      content: Yup.string().required(),
    }),

    onSubmit: async (data, { setSubmitting, resetForm }) => {
      try {
        const response = await http.post("/admin/post", data);

        // resetForm();

        console.log(response);
      } catch ({ response }) {
        formik.setFieldError("email", response?.data?.message);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },

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
  });

  const [postCategories, setPostCategories] = useState([]);

  const getPostCategories = async () => {
    const response = await http.get("/admin/postCategories");

    setPostCategories(response.data.postCategories);
  };

  useEffect(() => {
    getPostCategories();
  }, []);

  return (
    <div className="container mx-auto p-4 mt-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Write a New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter your blog post title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-400">{formik.errors.title}</div>
              )}
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                key={formik.values.category}
                onValueChange={(value) =>
                  formik.setFieldValue("category", value)
                }
                value={formik.values.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {postCategories.map((postCategory, index) => (
                    <SelectItem value={postCategory._id} key={postCategory._id}>
                      {postCategory.title}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="food">Food</SelectItem> */}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-400">{formik.errors.category}</div>
              )}
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="Enter tags separated by commas"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
              />
              {formik.touched.tags && formik.errors.tags && (
                <div className="text-red-400">{formik.errors.tags}</div>
              )}
            </div>
            {/* 
            {/* Content */}
            <div>
              <Label>Content</Label>
              <TinyMCEEditor
                key={editorKey}
                content={formik.values.content}
                setFieldvalue={formik.setFieldValue}
                onEditorChange={(newContent) =>
                  formik.setFieldValue("content", newContent)
                }
              />
              {formik.touched.content && formik.errors.content && (
                <div className="text-red-400">{formik.errors.content}</div>
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

      {/* Preview Section */}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-bold mb-2">{formik.values.title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            Category:{formik.values.category} | {formik.values.tags}
            {/* Category: {category} | Tags: {tags} */}
          </div>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(formik.values.content),
              }}
            />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
