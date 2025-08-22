import { useEffect, useState } from "react";
import CategorySidebar from "../../../components/categoryComponents/CategorySidebar";
import ProductSection from "../../../components/categoryComponents/ProductSection";

import http from "@/http";

export function Categories() {
  const [isLoading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [categoryCount, setCategoryCount] = useState({});

  const getAllProductsData = async () => {
    setLoading(true);
    const { data } = await http.get("/products");
    setAllProducts(data.products);
    setLoading(false);
  };

  const getProductCategory = async () => {
    const { data } = await http.get("/productCategory");
    setProductCategory(data.productCategories);
  };

  useEffect(() => {
    getAllProductsData();
    getProductCategory();
  }, []);

  // compute category counts whenever products or categories change
  useEffect(() => {
    if (allProducts.length && productCategory.length) {
      const counts = {};

      // initialize categories with 0
      productCategory.forEach((cat) => {
        counts[cat.slug] = 0;
      });

      // count products by category slug
      allProducts.forEach((prod) => {
        if (counts[prod.productCategorySlug] !== undefined) {
          counts[prod.productCategorySlug] += 1;
        }
      });

      setCategoryCount(counts);
    }
  }, [allProducts, productCategory]);

  console.log("Category Counts:", categoryCount);

  return (
    <div className="flex flex-col md:flex-row p-6 mt-20 bg-blue">
      {/* Category Sidebar */}
      <CategorySidebar categoryCount={categoryCount} />

      {/* Product Section */}
      <ProductSection
        title="Our Products"
        products={allProducts}
        isLoading={isLoading}
      />
    </div>
  );
}
