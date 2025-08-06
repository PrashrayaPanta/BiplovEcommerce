import WishProductBox from '@/components/wishlist/WishProductBox';
import { products } from '../../public/jsons/products';
import React from 'react'

export function Wishlist() {
  // Taking the first two products from the array
  const wishlistProducts = products.slice(0, 2);

  return (
    <div className="wishlist-page max-w-4xl mx-auto py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <WishProductBox
            key={product.name}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

