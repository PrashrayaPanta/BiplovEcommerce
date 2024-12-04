import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductBox({ product }) {
  // Calculate discount percentage
  const discount = product.fakePrice 
    ? Math.round(((product.fakePrice - product.price) / product.fakePrice) * 100) 
    : 0;

  const navigate = useNavigate()

  return (
    
    <div>
      <div key={product.id} className="group relative rounded-lg transition-transform transform hover:scale-105">
        <div className="aspect-square w-full bg-gray-200 relative"> {/* Add relative positioning here */}
          {/* Display discount badge */}
          {product.fakePrice && discount > 0 && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold py-1 px-2 rounded">
              {discount}% Off
            </span>
          )}
          <img
            alt={product.name}
            src={product.image}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-between h-32">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <p className="text-md text-gray-500 items-center flex gap-2 justify-center">
            {product.fakePrice ? (
              <span className='line-through'>Rs. {product.fakePrice}</span>
            ) : ""} 
            Rs. {product.price}
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <button 
        onClick={()=>{
          navigate(`/product/${product.slug}`)
        }}
        className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition duration-300 ease-in-out">
          View Product
        </button>
      </div>
    </div>
  );
}
