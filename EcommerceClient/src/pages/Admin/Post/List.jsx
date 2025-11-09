import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";

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
import { Button } from "@/components/ui/button";
import { SubmitBtn } from "@/components/SubmitBtn";
import http from "@/http";
import LoadingComponent from "@/components/LoadingComponent";
import { FromStorage } from "@/library";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);

  const { token } = JSON.parse(FromStorage("userInfo")) || null;

  const getPostData = async () => {
    setLoading(true);
    try {
      const { data } = await http.get("/admin/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(data.posts);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  console.log(posts);

  const handleHello = () => {
    navigate("/writeBlog/create");
  };

  const handlePostDelete = async (slug) => {
    console.log("I am inside handle post delete");

    const { token } = JSON.parse(FromStorage("userInfo")) || null;

    const response = await http.delete(`/admin/post/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response1 = await http.get("/admin/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPosts(response1.data.posts);
  };

  return (
    <>
      <div className="container mx-auto">
        {/* <nav className="flex justify-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 bg-blue-500">
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
        </nav> */}

        <div className="mt-32">
          <div className="text-right">
            <Button onClick={handleHello} className="bg-red-500">
              Add
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <LoadingComponent />
            ) : posts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Post Content</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post?._id}>
                      <TableCell>{post?.title}</TableCell>
                      <TableCell>{post?.postCategory?.title}</TableCell>
                      <TableCell>{post?.tags[0]}</TableCell>
                      <TableCell>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.content),
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Button onClick={() => handlePostDelete(post.slug)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* {product?.productDetails &&
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
                  ))} */}
                </TableBody>
              </Table>
            ) : (
              <h1>Non Data</h1>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default List;
