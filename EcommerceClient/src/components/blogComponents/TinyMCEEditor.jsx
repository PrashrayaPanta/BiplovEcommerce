import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export const tinyMceApiKey = "ndo1wi5r3kxwm9qkqf3equfk6i8qbszwumz83ilkvlftpmjf";

const TinyMCEEditor = ({ content, onEditorChange }) => {
  return (
    <Editor
      apiKey={tinyMceApiKey}
      initialValue="<p>Start writing your blog post here...</p>"
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
        images_upload_handler: (blobInfo, success, failure) => {
          // Replace this with your backend upload logic.
          setTimeout(() => {
            success("https://via.placeholder.com/150"); // Replace with uploaded image URL.
          }, 1000);
        },
      }}
      value={content}
      onEditorChange={onEditorChange}
    />
  );
};

export default TinyMCEEditor;
