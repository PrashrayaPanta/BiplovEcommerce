import React from 'react';
import BlogBox from '../components/blogComponents/BlogBox'; // Adjust path if needed
import { blogData } from '../../public/jsons/blogs';
import WriteBlog from '@/components/blogComponents/WriteBlog';


function BlogPage() {
  return (
    <div className="container mx-auto py-8">
      <WriteBlog />
      <h2 className="text-3xl font-bold mb-6">Our Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogData.map((blog, index) => (
          <BlogBox
            key={index}
            image={blog.image}
            title={blog.title}
            date={blog.date}
            slug={blog.slug}
            description={blog.description}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
