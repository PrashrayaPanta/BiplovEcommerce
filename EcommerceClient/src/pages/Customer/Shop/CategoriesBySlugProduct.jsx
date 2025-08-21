import CategorySidebar from "@/components/categoryComponents/CategorySidebar";
import ProductSection from "@/components/categoryComponents/ProductSection";
import http from "@/http";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";





const CategoriesBySlugProduct = () => {
  const { slug } = useParams();

  const [categoryProducts, setCategoryProducts] = useState([]);


  const [Loading, setLoading] = useState(false);

  const getCategoriesProducts = async () => {
    setLoading(true);

    const { data } = await http.get(`/categories/${slug}/products`);

    setCategoryProducts(data.products);

    setLoading(false);
  };

  useEffect(() => {
    getCategoriesProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-6 mt-20">


      <CategorySidebar />

      <ProductSection
        title={`Product by ${slug} category `}
        products={categoryProducts}
        isLoading={Loading}
      />
    </div>
  );
};

export default CategoriesBySlugProduct;
