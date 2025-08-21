import CategorySidebar from "@/components/categoryComponents/CategorySidebar";
import ProductSection from "@/components/categoryComponents/ProductSection";
import http from "@/http";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";





const CategoriesBySlugProduct = () => {


  console.log("I am inside categoriuesd by slug poroduct");
  
  const { slug } = useParams();

  const [categoryProducts, setCategoryProducts] = useState([]);


  const [Loading, setLoading] = useState(false);

  const getCategoriesProducts = async () => {
    setLoading(true);

    const { data } = await http.get(`/productCategory/${slug}/products`);

    setCategoryProducts(data.products);

    setLoading(false);
  };

  useEffect(() => {
    getCategoriesProducts();
  }, [slug]);



  

  return (
    <div className="flex flex-col md:flex-row p-6 mt-20">


      <CategorySidebar  />

      <ProductSection
        title={`Product by ${slug} category `}
        products={categoryProducts}
        isLoading={Loading}
      />
    </div>
  );
};

export default CategoriesBySlugProduct;
