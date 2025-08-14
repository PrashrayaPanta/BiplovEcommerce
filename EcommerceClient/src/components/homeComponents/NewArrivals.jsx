import React, { useEffect, useState } from 'react'

import ProductBox from '../categoryComponents/ProductBox';


import http from "../../http";


// Sort products by `createdAt` in descending order and take the newest 4
// const newestProducts = products
//   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//   .slice(0, 4);

function NewArrivals() {

  console.log("I am inside new Arrival component");
  
  const [newestProducts, setnewestProducts] = useState([]);



  const getLatestProducts = async () =>{

    try{
      const {data} = await http.get("/products/Latestproducts");
      console.log(data);
      setnewestProducts(data.products)


    }catch(err){
      console.log(err);
    }

  }


  // console.log("I am outside the get latest products")

  console.log("I am before the useEffect of New Arrivals component");


  useEffect(() =>{

    getLatestProducts();

  }, [])





  console.log(newestProducts);
  
  return (
    <div className="container mx-auto py-12 bg-red-500 p-2">
      <h2 className="text-3xl font-semibold text-center mb-8">New Arrivals</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {newestProducts?.map((product, index) => (
          <ProductBox key={product.name} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default NewArrivals
