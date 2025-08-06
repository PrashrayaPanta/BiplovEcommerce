import { Link } from "react-router-dom";
import { products } from "../../../public/jsons/products";

export const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`} className="bg-white shadow-md rounded-lg w-full mx-auto text-center p-4" style={{cursor: "pointer"}}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-square object-contain mb-3 rounded-t-lg"
      />
      <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.category}</p>
      <div className="mt-2">
        <span className="text-lg font-bold text-purple-600">₹ {product.price}</span>
        <span className="text-gray-400 line-through ml-2">₹ {product.originalPrice}</span>
      </div>
      <div className="flex justify-center space-x-2 mt-2 text-lg">
        <span>🎧</span>
        <span>🔊</span>
        <span>🎵</span>
        <span>💿</span>
        <span>⚡</span>
      </div>
      <div className="flex items-center justify-center mt-3">
        <input type="checkbox" id={`compare-${product.id}`} className="mr-2" />
        <label htmlFor={`compare-${product.id}`} className="text-gray-600 text-sm">Add to Compare</label>
      </div>
    </Link>
  );
};

// Dummy product data array
const dummyProducts = [
  {
    id: 1,
    name: "SNOWSKY - WIND",
    category: "On-Ear Headphones",
    price: "1,499",
    originalPrice: "1,699",
    image: "https://placehold.co/150",
  },
  {
    id: 2,
    name: "AUDIO-TECH WAVE",
    category: "Over-Ear Headphones",
    price: "2,999",
    originalPrice: "3,499",
    image: "https://placehold.co/150",
  },
  {
    id: 3,
    name: "BASS BOOST PRO",
    category: "Wireless Headphones",
    price: "1,999",
    originalPrice: "2,499",
    image: "https://placehold.co/150",
  },
  {
    id: 4,
    name: "SONIC BLAST X",
    category: "Gaming Headset",
    price: "3,499",
    originalPrice: "4,299",
    image: "https://placehold.co/150",
  },
  {
    id: 5,
    name: "MEGA SOUND VIBE",
    category: "Bluetooth Headphones",
    price: "2,199",
    originalPrice: "2,799",
    image: "https://placehold.co/150",
  },
  {
    id: 6,
    name: "NOISE CANCEL PRO",
    category: "Noise-Canceling Headphones",
    price: "4,499",
    originalPrice: "5,299",
    image: "https://placehold.co/150",
  },
];

export default function NewArrivals() {
  return (
    <div className="py-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">New Arrivals</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4)
          .map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
      </div>
    </div>
  );
}
