import { categories } from '../../../public/jsons/categories';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomeCategoryBox() {
  return (
    <div className="mx-auto py-24 w-4/5 md:w-7/10 lg:w-3/5">
      <div className="text-center text-2xl font-semibold mb-6">Shop By Categories</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group aspect-square border-gray-300 rounded-lg shadow-md hover:shadow-2xl transition duration-300"
          >
            <Link to={`/categories?cat=${cat.slug}`} className="block">
              <CategoryImage smallImage={cat.smallImage} fullImage={cat.image} alt={cat.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryImage({ smallImage, fullImage, alt }) {
  const [imageSrc, setImageSrc] = useState(smallImage);

  const handleImageLoad = () => {
    setImageSrc(fullImage);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      style={{cursor: "pointer"}}
      loading='lazy'
      className="w-full h-auto object-cover rounded-md transition-transform duration-300"
      onLoad={imageSrc === smallImage ? handleImageLoad : undefined}
    />
  );
}

export default HomeCategoryBox;
