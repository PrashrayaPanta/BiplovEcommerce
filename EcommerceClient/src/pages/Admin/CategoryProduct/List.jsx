import LoadingComponent from "@/components/LoadingComponent";
import http from "@/http";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { dtFormat, FromStorage } from "../../../library";
import { Link } from "react-router-dom";

const List = () => {
  const [loading, setLoading] = useState(false);

  // Initialization
  const [productCategories, setproductCategories] = useState([]);

  // Get categories of product
  const getProductCategories = async () => {
    setLoading(true);

    const response = await http.get("/admin/productCategory");

    setproductCategories(response.data.productCategories);

    setLoading(false);
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  const handleDelete = async (id) => {
    await http.delete(`/admin/productCategory/${id}`);

    const { data } = await http.get("/admin/productCategory");

    setproductCategories(data.productCategories);
  };

  return (
    <div className="container mx-auto p-4 mt-32">
      <h1 className="text-2xl font-bold mb-4">Product Category List</h1>

      <div className="flex justify-end">
        <Link className="btn btn-dark btn-sm me-2" to="/productCategory/create">
          <i className="fa-solid fa-plus me-2"></i>
          Add product Category
        </Link>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {productCategories?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                      Updated At
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {productCategories?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">
                        {dtFormat(item.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">
                        {dtFormat(item.updatedAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 border-b">
                        <Button onClick={() => handleDelete(item._id)}>
                          <i className="fa-solid fa-trash me-2"></i>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1>No Categories</h1>
          )}
        </>
      )}
    </div>
  );
};

export default List;
