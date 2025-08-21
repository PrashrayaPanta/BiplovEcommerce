import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Info, Star, FileText } from "lucide-react";
import Reviews from "../../../components/categoryComponents/Reviews";
import ProductGallery from "../../../components/categoryComponents/ProductGallery";
import http from "@/http";
import { useSelector } from "react-redux";

export const ProductDescription = () => {
  console.log("I am inside ProductDescription component");

  const user = useSelector((state) => state.user.value);

  const [activeTab, setActiveTab] = useState("details");
  const { slug } = useParams();

  const [product, setProduct] = useState({});

  const fetchgetProductBySlug = async () => {
    const { data } = await http.get(`/products/${slug}`);

    // console.log(data);

    setProduct(data.product);
  };

  useEffect(() => {
    // fetchProduct();
    fetchgetProductBySlug();
  }, [slug]);

  console.log(product);

  const tabs = [
    { id: "details", label: "Product Details", icon: FileText },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "shipping", label: "Shipping Info", icon: Info },
  ];

  if (!product) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Product not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Sorry, we couldn&apos;t find the product you&apos;re looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-1003 dark:bg-gray-800 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:grid grid-cols-2 -mx-4">
          <div className="px-4">
            <ProductGallery images={product?.images} />
            <div className="flex -mx-2 mb-4">
              {/* add To Cart */}
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>

              {/* Add to WishList */}
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Product Name:{product?.title}
            </h2>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price: {product.price}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  ${product?.price / 100}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {/* {product?.fakePrice ? "In Stock" : "Out of Stock"} */}
                </span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description: {product.description}
              </span>
              <div
                className="text-gray-600 dark:text-gray-300 text-sm mt-2"
                // dangerouslySetInnerHTML={{ __html: product?.description }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <nav className="flex justify-center border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex flex-col items-center pb-4 pt-2 px-1 ${
                      activeTab === tab.id
                        ? "text-orange-500"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                        layoutId="activeTab"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="mt-8">
            {activeTab === "details" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Specification</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product?.productDetails &&
                      Object.keys(product?.productDetails).map((key) => (
                        <TableRow key={key}>
                          <TableCell className="font-bold">
                            {key
                              .split(/(?=[A-Z])/)
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </TableCell>
                          <TableCell>{product?.productDetails[key]}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {user && <Reviews />}
              </motion.div>
            )}

            {activeTab === "shipping" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold">Shipping Information</h3>
                  <p>
                    Standard shipping takes 3-5 business days. Express shipping
                    options are available at checkout.
                  </p>
                  {/* Add more shipping information as needed */}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
