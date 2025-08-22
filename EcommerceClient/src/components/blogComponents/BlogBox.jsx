import React from "react";
import { Link } from "react-router-dom";

function BlogBox({ title, date, content, slug, description, tags }) {
  console.log(content);

  const htmlString = content;

  // Parse the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const imgSrc = doc.querySelector("img")?.getAttribute("src");

  // console.log(imgSrc);

  // yedi imgSrc ko value cha vani img src vanni ma imgSrc halni natra

  // Limit description to 100 characters
  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={
          imgSrc ||
          "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        }
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{date}</p>
      <p
        className="text-gray-700 mb-4"
        // dangerouslySetInnerHTML={{ __html:  tags[0] }}
      >
        {tags[0]}
      </p>
      <Link to={`/blogs/${slug}`} className="text-orange-500 hover:underline">
        Read more
      </Link>
    </div>
  );
}

export default BlogBox;
