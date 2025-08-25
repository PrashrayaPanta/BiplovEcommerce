import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import http from "@/http";
import { useSelector } from "react-redux";

const fakeReviews = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "AJ",
    rating: 5,
    comment: "Excellent product! Exceeded my expectations.",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "BS",
    rating: 4,
    comment: "Great value for money. Would recommend.",
  },
  {
    id: 3,
    name: "Carol White",
    avatar: "CW",
    rating: 3,
    comment: "Decent product, but could use some improvements.",
  },
  {
    id: 4,
    name: "David Brown",
    avatar: "DB",
    rating: 5,
    comment: "Absolutely love it! Will definitely buy again.",
  },
  {
    id: 5,
    name: "Eva Green",
    avatar: "EG",
    rating: 4,
    comment: "Very satisfied with my purchase. Fast shipping too!",
  },
];

function Reviews() {
  const { slug } = useParams();

  console.log(slug);

  const { token } = useSelector((state) => state.user.value);

  const formik = useFormik({
    initialValues: {
      reviewerName: "",
      reviewerComment: "",
      reviewerEmail: "",
    },

    validationSchema: Yup.object({
      reviewerName: Yup.string().required(),
      reviewerComment: Yup.string().required(),
      reviewerEmail: Yup.string().required().email(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log(data);

      async function PostReviewData() {
        try {
          console.log("I am inside the posty login data");

          const response = await http.post(`/products/${slug}/reviews`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response);

          // console.log(response);

          // console.log("I am after the response");

          // console.log(response);
        } catch ({ response }) {
          formik.setFieldError("email", response?.data?.message);
        } finally {
          setSubmitting(false);
          formik.resetForm();
        }
      }

      PostReviewData();

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

  const [reviews, setReviews] = useState([]);

  const getProductReviews = async () => {
    const { data } = await http.get(`/products/${slug}/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReviews(data.reviews.reviews);
  };

  useEffect(() => {
    getProductReviews();
  }, [reviews]);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Reviews</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              {/* Reviewer Name Text */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  name="reviewerName"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.reviewerName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.reviewerName && formik.errors.reviewerName && (
                  <div className="text-red-400">
                    {formik.errors.reviewerName}
                  </div>
                )}
              </div>

              {/* Reviewer Email ID */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  name="reviewerEmail"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.reviewerEmail}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.reviewerEmail &&
                  formik.errors.reviewerEmail && (
                    <div className="text-red-400">
                      {formik.errors.reviewerEmail}
                    </div>
                  )}
              </div>

              {/* Reviewer Comment */}
              <div className="grid gap-2">
                <Label htmlFor="message">Review</Label>
                <Textarea
                  id="message"
                  placeholder="Write your review here"
                  name="reviewerComment"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.reviewerComment}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.reviewerComment &&
                  formik.errors.reviewerComment && (
                    <div className="text-red-400">
                      {formik.errors.reviewerComment}
                    </div>
                  )}
              </div>
              <div>
                <Button type="submit">Submit Review</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 mb-8">
        {reviews?.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.avatar}`}
                  />
                  <AvatarFallback>{review.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{review.reviewerName}</CardTitle>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{review.reviewerComment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
