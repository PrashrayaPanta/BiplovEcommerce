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
import { useNavigate } from "react-router-dom";
import { SubmitBtn } from "@/components/SubmitBtn";

const ChangePassword = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      OldPassword: "",
      newPassword: "",
    },

    validationSchema: Yup.object({
      OldPassword: Yup.string().required(),
      newPassword: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log(data);

      async function PutChangePasswordData() {
        try {
          const response = await http.put("/users/profile/password", data);

          navigate("/login");
        } catch ({ response }) {
          formik.setFieldError("email", response?.data?.message);
        } finally {
          setSubmitting(false);
          formik.resetForm();
        }
      }

      PutChangePasswordData();

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
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              {/* Reviewer Name Text */}
              <div className="grid gap-2">
                <Label htmlFor="password">Current Password</Label>
                <Input
                  id="password"
                  placeholder="Your password"
                  name="OldPassword"
                  onChange={formik.handleChange}
                  value={formik.values.OldPassword}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.OldPassword && formik.errors.OldPassword && (
                  <div className="text-red-400">
                    {formik.errors.OldPassword}
                  </div>
                )}
              </div>

              {/* confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Confirm Password"
                  name="newPassword"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-red-400">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>

              <div>
                <SubmitBtn
                  formik={formik}
                  label="Change Password"
                  icon="fas fa-edit"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
