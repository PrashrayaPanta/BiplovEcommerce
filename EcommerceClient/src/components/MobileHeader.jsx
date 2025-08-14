import  { useState } from "react";
import {
  ChevronDown,
  Heart,
  Loader,
  Menu,
  Search,
  SearchIcon,
  ShoppingCartIcon,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import CartSheet from "./cartComponents/CartSheet";
import SearchDialog from "./SearchButton";
// import {
//   ClerkLoaded,
//   ClerkLoading,
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

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

function MobileHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  // State to control the visibility of the sheet (menu)
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
    <nav className="justify-between items-center flex  lg:hidden p-5 border-b border-gray-200 md:px-24 px-6 z-10 sticky top-0 bg-white shadow-sm">
      {/* Mobile Menu Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen} className="h-full">
        <SheetTrigger asChild>
          <Menu className="flex lg:hidden cursor-pointer text-gray-700 hover:text-gray-900 transition duration-200" />
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
            <div className="text-left flex flex-col gap-6 items-start mt-8">
              <button
                onClick={() => handleLinkClick("/categories")}
                className="block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Shop
              </button>
              <button
                onClick={() => handleLinkClick("/categories")}
                className="block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Product Categories
              </button>
              <button
                onClick={() => handleLinkClick("/blogs")}
                className="block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Blog
              </button>
              <button
                onClick={() => handleLinkClick("/wishlist")}
                className="block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Wishlist
              </button>
              <button
                onClick={() => handleLinkClick("/contact")}
                className="block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Contact
              </button>

              <button
                onClick={() => handleLinkClick("/register")}
                className="block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Register
              </button>

              <button
                onClick={() => handleLinkClick("/register")}
                className="block text-gray-800 text-lg hover:text-orange-500 transition-colors duration-200"
              >
                Register
              </button>
            </div>
          </SheetHeader>

          {/* Footer */}
          <div className="absolute bottom-4 left-4">
            <ClerkLoading>
              <Loader className="animate-spin w-6 h-6 text-gray-500" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignInButton>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-[#3c07ff] transition">
                    <User className="w-5 h-5" />
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </ClerkLoaded>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <Link to="/">
        <img
          src="/assets/img/hawastore.jpeg"
          alt="Hawa Store"
          className="w-14 h-14"
        />
      </Link>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* <SearchDialog className="hidden sm:flex text-gray-700 hover:text-gray-900 transition duration-200" /> */}
        {/* <Link to="/wishlist"><Heart className="text-gray-700 hover:text-gray-900 transition duration-200" /></Link> */}
        {/* <Link to="/login"><User className="hidden sm:flex text-gray-700 hover:text-gray-900 transition duration-200" /></Link> */}
        <CartSheet />
      </div>
    </nav>
  );
}

export default MobileHeader;
