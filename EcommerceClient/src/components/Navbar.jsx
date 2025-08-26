import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchDialog from "./SearchButton";
import { ChevronDown, Menu, SearchIcon } from "lucide-react";
import CategorySidebar from "./categoryComponents/CategorySidebar";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useEffect, useState } from "react";

import http from "../http";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { setUser, clearUser } from "../store";
import { ClearStorage, FromStorage } from "@/library";

export function capitalizeWords(str) {
  return str
    ?.split(" ")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
export function convertToSlug(phrase) {
  return phrase
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters (except spaces and hyphens)
    .trim() // Trim leading/trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}
export const Navbar = () => {
  //Get the user from store
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [productCategories, setProductCategories] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    ClearStorage("customerToken");
    dispatch(clearUser());
    navigate("/");
  };

  const getProductCategoriesData = async () => {
    console.log("I am insdie the get producyt categories");

    setLoading(true);
    const { data } = await http.get("/productCategory");
    setProductCategories(data.productCategories);
    setLoading(false);
  };

  //Get the Product CategoriesData
  useEffect(() => {
    getProductCategoriesData();
  }, []);

  const isActive = (path) => location.pathname === path;

  // Function to handle link click, close the sheet and navigate
  const handleLinkClick = (path) => {
    setIsOpen(false); // Close the sheet
    navigate(path); // Redirect to the path
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false); // Close the sheet
    const term = convertToSlug(name);
    navigate(`/categories/?search=${term}`);
  };

  const getUserProfile = async () => {
    const { token } = JSON.parse(FromStorage("userInfo")) || null;

    const { data } = await http.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    // console.log(data);

    dispatch(setUser(data.user));

    // console.log(user);

    // .then(({ data }) => {
    //   console.log(data.user);
    //   dispatch(setUser(data.user));
    //   // dispatch(setUser(data));
  };

  useEffect(() => {
    try {
      setLoading(true);
      if (!user) {
        const { token } = JSON.parse(FromStorage("userInfo")) || null;
        console.log(token);
        if (token) {
          console.log("I am inside the token ");

          getUserProfile();
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
    } finally {
      setLoading(true);
    }
  }, [user]);

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[80%] flex justify-between items-center p-4 shadow-md bg-white rounded-full px-8 mt-6 z-50">
      <Link className="text-2xl font-bold" to="/" style={{ cursor: "pointer" }}>
        <img
          src="https://files.catbox.moe/ijugcr.svg"
          alt="Hawa"
          className="h-10 sm:hidden"
        />
        {/* <img src="/assets/img/hawastore.jpeg" alt="Hawa" className="h-10" /> */}
        <img
          src="https://files.catbox.moe/s6ffdc.svg"
          alt="Hawa Store"
          className="h-10 hidden sm:flex"
        />
      </Link>
      <ul className="hidden xl:flex space-x-6 text-gray-800">
        {!user?.isAdmin && (
          <>
            <li>
              <Link
                to="/categories"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                Cart
              </Link>
            </li>
            {/* Product Categories Dropdown */}
            <li>
              <div className="relative group">
                <div className="flex items-center cursor-pointer">
                  Product Categories <ChevronDown className="w-4 h-4 mx-1" />
                </div>
                {/* Dropdown content */}
                <div className="absolute mt-1 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-300 origin-top bg-white shadow-md border rounded-md w-52">
                  <ul className="py-2">
                    {productCategories.map((category, index) => (
                      <Link
                        key={index}
                        to={`/categories/${category.slug}`}
                        className={
                          isActive(`/categories/${CategorySidebar.name}`)
                            ? "text-orange-500"
                            : ""
                        }
                      >
                        <li key={index} className="px-4 py-2 hover:bg-gray-200">
                          {capitalizeWords(category.title)} <hr />
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </>
        )}
        <li>
          <Link
            to="/blogs"
            className="hover:text-gray-500"
            style={{ cursor: "pointer" }}
          >
            Blogs
          </Link>
        </li>
        {/* Admin ma yeslai nadekhauni aaru ma dekhauni */}
        {user?.isAdmin ? (
          ""
        ) : (
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-500"
              style={{ cursor: "pointer" }}
            >
              Contact
            </Link>
          </li>
        )}
        {user ? (
          <>
            <li>
              <Link
                to="/profile"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                {user.username}
              </Link>
            </li>

            <li>
              <Link
                onClick={handleLogout}
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/Login"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                Register
              </Link>
            </li>
          </>
        )}
        {user?.isAdmin && (
          <>
            <li>
              <Link
                to="/productEntry"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                Product Entry Form
              </Link>
            </li>

            <li>
              <Link
                to="/writeBlog"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                Write Blogs
              </Link>
            </li>

            <li>
              <Link
                to="/postCategory"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                Post Category
              </Link>
            </li>

            <li>
              <Link
                to="/productCategory"
                className="hover:text-gray-500"
                style={{ cursor: "pointer" }}
              >
                ProductCategory
              </Link>
            </li>
          </>
        )}
        <SearchDialog />
      </ul>
      <Sheet open={isOpen} onOpenChange={setIsOpen} className="h-full">
        <SheetTrigger asChild>
          <Menu
            style={{ cursor: "pointer" }}
            className="flex xl:hidden cursor-pointeer text-gray-700 hover:text-gray-900 transition duration-200"
          />
        </SheetTrigger>

        {/* Slide-in Mobile Menu */}
        <SheetContent side="left" className="bg-white h-full">
          <SheetHeader>
            <SheetTitle>
              <div className="pb-4 text-xl font-semibold">Menu</div>
              <hr className="border-gray-300" />
            </SheetTitle>

            {/* Search input section */}
            <div className="w-full text-left mt-4">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <SearchIcon className="w-6 h-6" />
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Search something..."
                  />
                </form>
              </div>
            </div>

            {/* Menu Links */}
            <div className="text-left flex flex-col gap-1 items-start mt-8">
              {/* {["Shop",""]} */}
              <button
                onClick={() => handleLinkClick("/categories")}
                className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Shop
              </button>
              <button
                onClick={() => handleLinkClick("/categories")}
                className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Product Categories
              </button>
              <button
                onClick={() => handleLinkClick("/blogs")}
                className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Blog
              </button>
              <button
                onClick={() => handleLinkClick("/wishlist")}
                className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Wishlist
              </button>
              <button
                onClick={() => handleLinkClick("/contact")}
                className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Contact
              </button>

              {user ? (
                <>
                  <button
                    // onClick={() => handleLinkClick("/register")}
                    className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
                  >
                    {user.username}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleLinkClick("/register")}
                    className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
                  >
                    Register
                  </button>

                  <button
                    onClick={() => handleLinkClick("/login")}
                    className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
                  >
                    Login
                  </button>
                </>
              )}

              <button
                onClick={() => handleLinkClick("/productEntry")}
                className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Product Entry Form
              </button>

              <button
                onClick={() => handleLinkClick("/writeBlog")}
                className="hover:bg-gray-200 w-full text-left py-2 px-3 rounded-xl block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Write Blogs
              </button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
