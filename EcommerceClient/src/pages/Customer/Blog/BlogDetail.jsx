import http from "@/http";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Assuming this is the file where your blog data is stored

export function BlogDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState({});

  const getBlogDetail = async () => {
    const { data } = await http.get(`/post/${slug}`);
    setPost(data.post);
  };

  useEffect(() => {
    getBlogDetail();
  }, [slug]);

  console.log(post);

  // console.log(content);

  // console.log(post.content);

  const htmlString = post.content;

  console.log(htmlString);

  console.log(typeof htmlString);

  // Parse the HTML string
  const parser = new DOMParser();

  //Return Dom Object
  const doc = parser.parseFromString(htmlString, "text/html");

  console.log(typeof doc);

  const pTag = doc.querySelector("p");

  const pTagInner = pTag?.innerHTML;

  // console.log();

  const imgSrc = doc.querySelector("img")?.getAttribute("src");

  // Find the blog post with the matching slug

  // If blog post is not found
  if (!post) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Blog not found</h2>
        <p className="text-gray-600">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
      </div>
    );
  }

  // const { title, date, image, description } = blogPost;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      {/* <img
        src={
          imgSrc ||
          "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        }
        alt=""
        className="w-full h-auto object-cover rounded-lg mb-6"
      /> */}
      <h1 className="text-3xl font-semibold mb-4">{post?.title}</h1>
      <h1>{post?.tags?.[0]}</h1>
      <p className="text-gray-500 text-sm mb-4">{post.postCategory?.title}</p>

      <div
        className="text-gray-700 text-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      >
        {/* {pTagInner?.split("img")[0]} */}
      </div>
    </div>
  );
}
