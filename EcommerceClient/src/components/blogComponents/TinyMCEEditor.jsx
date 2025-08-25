import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FromStorage } from "@/library";
import http from "@/http";

export const tinyMceApiKey = import.meta.env.VITE_TINYMCE_API_KEY || "";

const uploadImageToCloudinaryServer = async (blobInfo) => {
  console.log("I am insdie the upload image to server");

  const formData = new FormData();

  console.log("I am after the formData initkiuxzation");

  formData.append("image", blobInfo.blob(), blobInfo.filename());

  console.log(formData);

  console.log("I am after the form data you know");

  const { token } = JSON.parse(FromStorage("userInfo"));

  console.log(token);

  console.log("I am after the token");

  const { data } = await http.post("/admin/post/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // needed for file uploads
    },
  });

  //   `${import.meta.env.VITE_API_URL}/admin/post/upload`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: formData,
  //   }
  // );
  console.log("I am after the response");

  if (!data?.url) {
    throw new Error("Upload succeeded but server returned no URL");
  }
  return { url: data.url, public_id: data.public_id };
};

const TinyMCEEditor = ({ content, onEditorChange, setFieldvalue }) => {
  console.log(setFieldvalue);

  return (
    <Editor
      apiKey={tinyMceApiKey}
      initialValue=""
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "lists", // For ordered/unordered lists
          "table", // For table support
          "image", // For image uploads
          "link", // Optional, for adding links
          "code", // For viewing/editing HTML content
          "preview", // For previewing content
        ],
        toolbar: `
          undo redo | formatselect | bold italic underline | 
          alignleft aligncenter alignright alignjustify | 
          bullist numlist | table | image | link | code | preview
        `,
        content_style: `
          body { font-family:Helvetica,Arial,sans-serif; font-size:16px; }
          ul, ol { margin-left: 20px; }
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid black; padding: 5px; text-align: left; }
        `,
        images_upload_handler: async (blobInfo, success, failure) => {
          try {
            // blobInfo is just a object having id filename as proepties
            console.log(blobInfo);
            // console.log(blobInfo);

            const { url, public_id } = await uploadImageToCloudinaryServer(
              blobInfo
            );

            console.log(url);

            console.log(public_id);

            // When save button ic clicked the url associated is shown in Content Section

            //If success the ui rendered the url
            success(url);

            //Also set Formik's image field
            setFieldvalue("image", {
              url,
              public_id,
            });
          } catch (err) {
            failure(err?.message || "Image upload failed");
          }
        },
      }}
      value={content}
      onEditorChange={onEditorChange}
    />
  );
};

export default TinyMCEEditor;
