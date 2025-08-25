import LoadingComponent from "@/components/LoadingComponent";
import http from "@/http";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { dtFormat, FromStorage } from "../../../library";
import { Link } from "react-router-dom";

const List = () => {
  const [loading, setLoading] = useState(false);

  // Initialization
  const [postCategories, setpostCategories] = useState([]);

  // Get categories of product
  const getPostCategories = async () => {
    const { token } = JSON.parse(FromStorage("userInfo")) || null;

    setLoading(true);

    const response = await http.get("/admin/postCategories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setpostCategories(response.data.postCategories);
    setLoading(false);
  };

  useEffect(() => {
    getPostCategories();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);

    const { token } = JSON.parse(FromStorage("userInfo"));

    await http.delete(`/admin/postCategories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await http.get("/admin/postCategories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setpostCategories(data.postCategories);

    // console.log(postCategories);
  };

  return (
    <div className="container mx-auto p-4 mt-32">
      <h1 className="text-2xl font-bold mb-4">Post Category List</h1>

      <div className="flex justify-end">
        <Link className="btn btn-dark btn-sm me-2" to="/postCategory/create">
          <i className="fa-solid fa-plus me-2"></i>
          Add Post Category
        </Link>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {postCategories?.length > 0 ? (
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
                  {postCategories?.map((item, index) => (
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
