import React from 'react'
import { products } from '../../../public/jsons/products';
import ProductBox from '../categoryComponents/ProductBox';


// Sort products by `createdAt` in descending order and take the newest 4
const newestProducts = products
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 4);

function NewArrivals() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">New Arrivals</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {newestProducts.map((product, index) => (
          <ProductBox key={product.name} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default NewArrivals
