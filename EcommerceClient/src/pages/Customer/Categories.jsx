
import CategorySidebar from '../../components/categoryComponents/CategorySidebar'; // Adjust the import path as needed
import ProductSection from '../../components/categoryComponents/ProductSection'; // Adjust the import path as needed

export function Categories() {
  return (
    <div className="flex flex-col md:flex-row p-6 mt-20">
      
      {/* Category Sidebar */}
      <CategorySidebar />

      {/* Product Section */}
      <ProductSection />
    </div>
  );
}


