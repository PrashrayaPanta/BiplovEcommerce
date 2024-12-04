import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    setContent(content);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>React TinyMCE Integration</h2>
      <Editor
        apiKey="YOUR_TINYMCE_API_KEY" // Replace with your API key from TinyMCE
        initialValue="<p>Start typing here...</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={handleEditorChange}
      />
      <h3>Editor Output:</h3>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginTop: '20px',
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TinyMCEEditor;
