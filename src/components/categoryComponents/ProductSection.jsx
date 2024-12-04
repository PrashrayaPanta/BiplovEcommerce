import React from 'react';
import { products } from '../../../public/jsons/products'; // Adjust the import path as needed
import ProductBox from './ProductBox';
import { useLocation } from 'react-router-dom'; // Import useLocation to get query params

// Helper function to filter products by category and search term
function filterProducts(category, searchTerm) {
  return products.filter(product => {
    const matchesCategory = category ? product.categories.includes(category) : true; // Check if the product matches the category
    const matchesSearch = searchTerm ? 
      product.slug.includes(searchTerm) || 
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) : 
      true; // Check if the product matches the search term
    return matchesCategory && matchesSearch; // Return true if both category and search match
  });
}

// Helper function to capitalize and format category names
function capitalizeWords(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function ProductSection() {
  const location = useLocation();

  // Extract query parameters using URLSearchParams
  const searchParams = new URLSearchParams(location.search);
  const searchCategory = searchParams.get('cat'); // e.g., 'computer-accessories'
  const searchProduct = searchParams.get('search'); // e.g., 'computer'

  // Filter products based on the selected category and search term
  const filteredProducts = filterProducts(searchCategory, searchProduct);

  return (
    <div className="p-6">
      {/* Show the selected category or 'Our Products' if none is selected */}
      <h2 className="text-2xl font-semibold mb-4">
        {searchCategory
          ? `Products in "${capitalizeWords(searchCategory)}"`
          : 'Our Products'}
      </h2>

      {/* Display search term if present */}
      {searchProduct && (
        <p className="text-md mb-2">
          Searching for: <strong>{searchProduct}</strong>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductBox key={product.name} product={product} />
          ))
        ) : (
          <p>No products found for this category or search term.</p> // Message if no products found
        )}
      </div>
    </div>
  );
}

export default ProductSection;
