import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export const tinyMceApiKey = import.meta.env.VITE_TINYMCE_API_KEY || "";

const uploadImageToServer = async (blobInfo) => {
  const formData = new FormData();
  formData.append("image", blobInfo.blob(), blobInfo.filename());

  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admin/post/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Upload failed (${response.status}): ${errorBody || "Unknown error"}`
    );
  }

  const data = await response.json();
  if (!data?.url) {
    throw new Error("Upload succeeded but server returned no URL");
  }
  return data.url;
};

const TinyMCEEditor = ({ content, onEditorChange }) => {
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
            console.log(blobInfo);

            const url = await uploadImageToServer(blobInfo);
            success(url);
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
