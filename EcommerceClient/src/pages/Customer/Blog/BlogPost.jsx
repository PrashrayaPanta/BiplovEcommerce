import React, { useEffect, useState } from "react";
import BlogBox from "../../../components/blogComponents/BlogBox"; // Adjust path if needed

import WriteBlog from "@/components/blogComponents/WriteBlog";
import http from "@/http";
import { dtFormat } from "@/library";
import LoadingComponent from "@/components/LoadingComponent";

export function BlogPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPost = async () => {
    try {
      setLoading(true);
      const { data } = await http.get("/post");
      setPosts(data.posts);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  console.log(posts);

  return (
    <div className="container mx-auto py-8 mt-20">
      {/* <WriteBlog /> */}
      <h2 className="text-3xl font-bold mb-6">Our Blog</h2>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-slate-100">
          {posts.map((blog, index) => (
            <BlogBox
              key={index}
              content={blog.content}
              title={blog.title}
              tags={blog.tags}
              date={dtFormat(blog.createdAt)}
              slug={blog.slug}
              description={blog.content}
            />
          ))}
        </div>
      )}
    </div>
  );
}
