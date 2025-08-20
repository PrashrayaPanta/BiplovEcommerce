import React, { useEffect, useState } from "react";
import BlogBox from "../components/blogComponents/BlogBox"; // Adjust path if needed
import { blogData } from "../../public/jsons/blogs";
import WriteBlog from "@/components/blogComponents/WriteBlog";
import http from "@/http";
import { dtFormat } from "@/library";

export function Blog() {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const { data } = await http.get("/post");
    setPosts(data.posts);
  };

  useEffect(() => {
    getAllPost();
  }, []);


  console.log(posts);
  

  return (
    <div className="container mx-auto py-8 mt-20">
      {/* <WriteBlog /> */}
      <h2 className="text-3xl font-bold mb-6">Our Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((blog, index) => (
          <BlogBox
            key={index}
            content={blog.content}
            title={blog.title}
            date={dtFormat(blog.createdAt)}
            slug={blog.slug}
            description={blog.content}
          />
        ))}
      </div>
    </div>
  );
}
