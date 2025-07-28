import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchDialog from "../SearchButton";
import { ChevronDown, Menu, SearchIcon } from "lucide-react";
import CategorySidebar from "../categoryComponents/CategorySidebar";
import { categories } from "../../../public/jsons/categories";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";

export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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
  const location = useLocation();
    const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

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

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[80%] flex justify-between items-center p-4 shadow-md bg-white rounded-full px-8 mt-6 z-50">
      <Link className="text-2xl font-bold" to="/" style={{ cursor: "pointer" }}>
        <img src="https://files.catbox.moe/ijugcr.svg" alt="Hawa" className="h-10 sm:hidden" />
        {/* <img src="/assets/img/hawastore.jpeg" alt="Hawa" className="h-10" /> */}
        <img src="https://files.catbox.moe/s6ffdc.svg" alt="Hawa Store" className="h-10 hidden sm:flex" />
      </Link>
      <ul className="hidden lg:flex space-x-6 text-gray-800">
        <li>
          <Link
            to="/categories"
            className="hover:text-gray-500"
            style={{ cursor: "pointer" }}
          >
            Shop
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
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/categories/?cat=${category.slug}`}
                    className={
                      isActive(`/categories/${CategorySidebar.name}`)
                        ? "text-orange-500"
                        : ""
                    }
                  >
                    <li key={index} className="px-4 py-2 hover:bg-gray-200">
                      {capitalizeWords(category.name)} <hr />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </li>
        <li>
          <Link
            to="/blogs"
            className="hover:text-gray-500"
            style={{ cursor: "pointer" }}
          >
            Blogs
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



        <li>
          <Link
            to="/login"
            className="hover:text-gray-500"
            style={{ cursor: "pointer" }}
          >
            Login
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className="hover:text-gray-500"
            style={{ cursor: "pointer" }}
          >
            Contact
          </Link>
        </li>

        <SearchDialog />

      </ul>

      {/* {Mobile} */}
      <Sheet open={isOpen} onOpenChange={setIsOpen} className="h-full">
        <SheetTrigger asChild >
          <Menu  style={{ cursor: 'pointer' }} className="flex lg:hidden cursor-pointeer text-gray-700 hover:text-gray-900 transition duration-200" />
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
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-around p-8 bg-gradient-to-br from-gray-100 to-blue-400">
      {/* <Navbar /> */}
      <div className="flex max-w-[60rem] w-full items-center justify-between mt-20">
        <div className="md:w-1/2 text-left">
          <h1 className="text-5xl font-bold text-black leading-tight">
            Step into the <br /> world of{" "}
            <span className="text-blue-600 underline">Audiophile</span>
          </h1>
          <h1 className="text-5xl font-bold text-black leading-tight">
            with <span className="text-blue-600 underline">KZ-EDX Pro IEM</span>
          </h1>
          <p className="text-gray-600 mt-2">Available at Hawa Store</p>
          <button
            style={{ cursor: "pointer" }}
            className="mt-4 px-6 py-4 bg-[#3c07ff] text-white rounded-full font-semibold hover:bg-[#444444] text-sm tracking-widest"
          >
            VIEW PRODUCT
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.pexels.com/photos/30725355/pexels-photo-30725355/free-photo-of-stylish-portrait-of-a-fashionable-man-in-kumasi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Woman"
            className="w-96 h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

const Header = () => {
  return (
    <div className="relative">
      <HeroSection />
    </div>
  );
};

export default Header;
