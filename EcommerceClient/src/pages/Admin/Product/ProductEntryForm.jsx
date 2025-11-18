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

import http from "@/http";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FromStorage } from "@/library";

export const ProductEntryForm = () => {
  // console.log("i am inside product entry form");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Initialization
  const [productCategories, setproductCategories] = useState([]);

  // Get categories of product
  const getProductCategories = async () => {
    const { token } = JSON.parse(FromStorage("userInfo"));

    setLoading(true);

    const response = await http.get("/admin/productCategory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setproductCategories(response.data.productCategories);
    setLoading(false);
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  // const [product, setProduct] = useState({
  //   name: "",
  //   image: [],
  //   price: "",
  //   fakePrice: "",
  //   categories: [],
  //   slug: "",
  //   description: "",
  //   details: {},
  // });

  console.log(productCategories);

  const formik = useFormik({
    initialValues: {
      title: "",
      images: [],
      price: "",
      originalPrice: "",
      categoryId: "",
      slug: "",
      description: "",
      key: "",
      value: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required(),
      categoryId: Yup.string().required(),
      slug: Yup.string().required(),
      description: Yup.string().required(),
      key: Yup.string().required(),
      value: Yup.string().required(),
      images: Yup.mixed()
        .test("count", "select atleast one file", (files) => files.length > 0)
        .test("type", "select valid image files", (files) => {
          for (let image of files) {
            if (!image.type.startsWith("image")) {
              return false;
            }
          }
          return true;
        }),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log("Formdata", data);

      console.log(data);

      console.log(data);
      // console.log("Hello");

      const fd = new FormData();

      // console.log("Form data object is cretaed");

      // console.log(form dat);

      for (let k in data) {
        if (k == "images") {
          for (let files of data[k]) {
            fd.append(k, files);
          }
        } else {
          fd.append(k, data[k]);
        }
      }

      // console.log("Hello");
      // console.log(data);

      async function PostProductData() {
        try {
          const response = await http.post("/admin/products", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response);
          // ToStorage("customerPartToken", response.data.token, remember);
          // dispatch(setUser(response.data));
          // navigate("/");
        } catch ({ response }) {
          formik.setFieldError("email", response?.data?.message);
        } finally {
          setSubmitting(false);
          formik.resetForm();
        }
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

  // const [newDetailKey, setNewDetailKey] = useState("");
  // const [newDetailValue, setNewDetailValue] = useState("");

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProduct((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setProduct((prev) => ({ ...prev, image: [...prev.image, ...files] }));
  // };

  // const handleCategoryChange = (value) => {
  //   setProduct((prev) => ({
  //     ...prev,
  //     categories: [...prev.categories, value],
  //   }));
  // };

  // const handleDescriptionChange = (content) => {
  //   setProduct((prev) => ({ ...prev, description: content }));
  // };

  // const handleAddDetail = () => {
  //   if (newDetailKey && newDetailValue) {
  //     setProduct((prev) => ({
  //       ...prev,
  //       details: { ...prev.details, [newDetailKey]: newDetailValue },
  //     }));
  //     setNewDetailKey("");
  //     setNewDetailValue("");
  //   }
  // };

  // const handleRemoveDetail = (key) => {
  //   setProduct((prev) => {
  //     const newDetails = { ...prev.details };
  //     delete newDetails[key];
  //     return { ...prev, details: newDetails };
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(product);
  //   // Here you would typically send the data to your backend
  // };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8 mt-24">
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product Name */}
          <div>
            <Label htmlFor="name">Product Name</Label>
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

          {/* Product Images */}
          <div>
            <Label htmlFor="images">Product Images</Label>
            <Input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="invalid:bg-red-400"
              onBlur={formik.handleBlur}
              onChange={({ target }) =>
                formik.setFieldValue("images", Array.from(target.files))
              }
            />
            {formik.touched.images && formik.errors.images && (
              <div className="text-red-400">{formik.errors.images}</div>
            )}

            {formik.values.images.length > 0 && (
              <div className="flex">
                {formik.values.images.map((file, i) => (
                  <div className="mt-3">
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="object-cover w-80 h-50"
                      srcset=""
                      multiple
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                onBlur={formik.handleBlur}
                value={formik.values.price}
                onChange={formik.handleChange}
                // value={product.price}
                // onChange={handleInputChange}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-400">{formik.errors.price}</div>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="fakePrice">Original Price</Label>
              <Input
                id="fakePrice"
                name="originalPrice"
                type="number"
                onBlur={formik.handleBlur}
                value={formik.values.originalPrice}
                onChange={formik.handleChange}
                // value={product.fakePrice}
                // onChange={handleInputChange}
              />
              {formik.touched.originalPrice && formik.errors.originalPrice && (
                <div className="text-red-400">
                  {formik.errors.originalPrice}
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="categories">Categories</Label>
            <Select
              value={formik.values.categoryId} // Bind the value to formik's state
              onValueChange={(value) =>
                formik.setFieldValue("categoryId", value)
              } // Update formik's state on change
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((cat) => (
                  <SelectItem value={cat._id} key={cat._id}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <div className="text-red-400">{formik.errors.categoryId}</div>
            )}
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              onBlur={formik.handleBlur}
              value={formik.values.slug}
              onChange={formik.handleChange}
            />
            {formik.touched.slug && formik.errors.slug && (
              <div className="text-red-400">{formik.errors.slug}</div>
            )}
          </div>

          {/* Product Descriotion */}
          <div>
            <Label>Product Description</Label>
            <TinyMCEEditor
              name="description"
              value={formik.values.description}
              onEditorChange={(content) =>
                formik.setFieldValue("description", content)
              }
              onBlur={() => formik.setFieldTouched("description", true)}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-400">{formik.errors.description}</div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <Label>Product Details</Label>
            {/* <div className="space-y-2">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Input value={key} disabled />
                  <Textarea
                    value={value}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        details: { ...prev.details, [key]: e.target.value },
                      }))
                    }
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveDetail(key)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div> */}
            <div className="flex items-end space-x-2 mt-2">
              <div className="flex-1">
                <Label htmlFor="newDetailKey">Key</Label>
                <Input
                  id="newDetailKey"
                  name="key"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.key}
                  // value={newDetailKey}
                  // onChange={(e) => setNewDetailKey(e.target.value)}
                  placeholder="e.g., Weight"
                />
                {formik.touched.key && formik.errors.key && (
                  <div className="text-red-400">{formik.errors.key}</div>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="newDetailValue">Value</Label>
                <Input
                  id="newDetailValue"
                  name="value"
                  onChange={formik.handleChange}
                  value={formik.values.value}
                  onBlur={formik.handleBlur}
                  // value={newDetailValue}
                  // onChange={(e) => setNewDetailValue(e.target.value)}
                  placeholder="e.g., 76 Grams"
                />
                {formik.touched.value && formik.errors.value && (
                  <div className="text-red-400">{formik.errors.value}</div>
                )}
              </div>
              <Button type="submit">Add Detail</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Product</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
