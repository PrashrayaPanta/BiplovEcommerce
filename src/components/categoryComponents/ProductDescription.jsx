import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../../public/jsons/products'; // Update the path accordingly

const ProductDescription = () => {
  const { slug } = useParams();

  // Find the product matching the slug
  const product = products.find(item => item.slug === slug);

  // If product not found, display a message
  if (!product) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product not found</h2>
          <p className="text-gray-600 dark:text-gray-300">Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                <span className="text-gray-600 dark:text-gray-300">${product.price / 100}</span> {/* Assuming price is in cents */}
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                <span className="text-gray-600 dark:text-gray-300">{product.fakePrice ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
              <div className="text-gray-600 dark:text-gray-300 text-sm mt-2" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
