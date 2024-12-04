import React from 'react';

function WishProductBox({ image, title, price }) {
  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">${price}</p>
    </div>
  );
}

export default WishProductBox;
