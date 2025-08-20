import React from "react";
import { useParams } from "react-router-dom";
// Assuming this is the file where your blog data is stored

export function BlogDetail() {
  const { slug } = useParams();

  // Find the blog post with the matching slug
  const blogPost = blogData.find((post) => post.slug === slug);

  // If blog post is not found
  if (!blogPost) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Blog not found</h2>
        <p className="text-gray-600">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
      </div>
    );
  }

  const { title, date, image, description } = blogPost;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={image}
        alt={title}
        className="w-full h-auto object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-semibold mb-4">{title}</h1>
      <p className="text-gray-500 text-sm mb-4">{date}</p>
      <div
        className="text-gray-700 text-lg"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
}
