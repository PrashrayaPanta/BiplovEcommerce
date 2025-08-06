import React from 'react';
import { Link } from 'react-router-dom';

function BlogBox({ title, date, image, slug, description }) {
  // Limit description to 100 characters
  const truncatedDescription = description.length > 100 
    ? description.substring(0, 100) + "..." 
    : description;

  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{date}</p>
      <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: truncatedDescription }}></p>
      <Link
        to={`/blog/${slug}`}
        className="text-orange-500 hover:underline"
      >
        Read more
      </Link>
    </div>
  );
}

export default BlogBox;
