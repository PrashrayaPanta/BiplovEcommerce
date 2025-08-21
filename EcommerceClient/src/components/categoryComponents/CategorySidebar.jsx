import React, { useEffect, useState } from 'react';
import { categories } from '../../../public/jsons/categories';
import { products } from '../../../public/jsons/products';
import { Link } from 'react-router-dom';
// import http from '@/http';



import http from '../../http';





// Function to count products in each category
// function countProductsByCategory() {


//   const [products, setProducts] = useState([]);

//   const getProducts = async() =>{

//       const {data} = await http.get("/products");

//       setProducts(data.products)

//   }


//   useEffect(() =>{
//     getProducts();
//   },[])


//   console.log(products);
  
 


//   // const categoryCounts = {};

//   // // Loop through each product and increment the count for each of its categories
//   // products.forEach(product => {
//   //   product.categories.forEach(category => {
//   //     if (!categoryCounts[category]) {
//   //       categoryCounts[category] = 0;
//   //     }
//   //     categoryCounts[category]++;
//   //   });
//   // });

//   // return categoryCounts;
// }

function CategorySidebar() {

  // const categoryCounts = countProductsByCategory();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  const [productCategories, setProductCategories] = useState([]);



  const getProductCategoriesData = async () => {
    setLoading(true);
    const { data } = await http.get("/productCategory");
    setProductCategories(data.productCategories);
    setLoading(false);
  };

  //Get the Product CategoriesData
  useEffect(() => {
    getProductCategoriesData()
  }, []);


  console.log(productCategories);
  
  


  return (
    <div className="shadow-md rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {productCategories.map((category) => (
          <Link to={`/categories/${category.slug}`} key={category.name} className="hover:text-orange-500 hover:bg-gray-50 flex justify-between items-center">
            <p
              
              className="capitalize"
            >
              {category.title}
            </p>
            <span className="text-sm text-gray-500">
              0
              {/* {categoryCounts[category.slug] || 0} Display count or 0 if no products */}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CategorySidebar;
