import React from "react";
import { ChevronDown, Heart, Loader, Menu } from "lucide-react";
import { categories } from "../../public/jsons/categories";
import { Link, useLocation } from "react-router-dom";
import CartSheet from "./cartComponents/CartSheet";
import SearchDialog from "./SearchButton";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { User } from "lucide-react"; // User icon for SignInButton

export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="justify-between hidden lg:flex items-center flex p-5 border-b-2 md:px-24 px-6 z-10 sticky top-0 bg-white">
      <Menu className="flex lg:hidden cursor-pointer" />
      <Link to="/">
        <img
          src="/assets/img/hawastore.jpeg"
          alt="Hawa Store"
          className="w-14 h-14"
        />
      </Link>
      <div className="flex gap-12">
        <div className="hidden lg:flex gap-8">
          <Link
            to="/categories"
            className={isActive("/shop") ? "text-orange-500" : ""}
          >
            Shop
          </Link>
          {/* Product Categories Dropdown */}
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
                      isActive(`/categories/${category.name}`)
                        ? "text-orange-500"
                        : ""
                    }
                  >
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {capitalizeWords(category.name)} <hr />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <Link
            to="/blogs"
            className={isActive("/blogs") ? "text-orange-500" : ""}
          >
            Blogs
          </Link>
          <Link
            to="/contact"
            className={isActive("/contact") ? "text-orange-500" : ""}
          >
            Contact
          </Link>
        </div>
        {/* Icons */}
        <div className="flex gap-4 items-center">
          <SearchDialog className="hidden sm:flex" />
          <Link to="/wishlist">
            <Heart />
          </Link>
          <div className="cursor-pointer">
            {/* Conditionally render User or UserButton */}
            <ClerkLoading>
              <Loader className="animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignInButton>
                  <User className="w-6 h-6" />
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </ClerkLoaded>
          </div>
          <CartSheet />
        </div>
      </div>
    </nav>
  );
}

export default Header;
