import { useEffect, useState } from "react";
import CategorySidebar from "../../components/categoryComponents/CategorySidebar"; // Adjust the import path as needed
import ProductSection from "../../components/categoryComponents/ProductSection"; // Adjust the import path as needed
import http from "@/http";

export function Categories() {
  const [isLoading, setLoading] = useState(true);

  const [allProducts, setAllProducts] = useState([]);

  const getAllProductsData = async () => {
    setLoading(true);
    const { data } = await http.get("/products");
    setAllProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    getAllProductsData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-6 mt-20">
      {/* Category Sidebar */}
      <CategorySidebar />

      {/* Product Section */}
      <ProductSection title="Our Products" products={allProducts} isLoading={isLoading} />
    </div>
  );
}
