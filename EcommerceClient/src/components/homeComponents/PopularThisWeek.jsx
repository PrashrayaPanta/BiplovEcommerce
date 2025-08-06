import React from 'react'
import { products } from '../../../public/jsons/products'  // Import the products
import ProductBox from '../categoryComponents/ProductBox';

// Sort products by sales in descending order
const popularProducts = products
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 4);  // Limit to top 4 popular products

function PopularThisWeek() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Popular This Week</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {popularProducts.map((product, index) => (
          <ProductBox key={product.name} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default PopularThisWeek
