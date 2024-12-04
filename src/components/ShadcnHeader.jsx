import React from 'react'
import { ChevronDown, Heart, Menu, Search, ShoppingCart, User } from "lucide-react"
import { categories } from '../../public/jsons/categories';
import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger, ListItem, NavigationMenuLink
  } from "@/components/ui/navigation-menu"


function ShadcnHeader() {
  return (
    <NavigationMenu className='justify-between items-center flex p-5 border-b-2 md:px-24 px-6 sticky top-20 bg-white'>
      {/* Mobile Menu Icon */}
      <Menu className='flex lg:hidden'/>
      
      {/* Logo */}
      <NavigationMenuItem>
      <Link to="/">
        <img src="/assets/img/hawastore.jpeg" alt="Hawa Store" className='w-14 h-14'/>
      </Link>
      </NavigationMenuItem>

      {/* Navigation Links */}
      <div className='flex gap-12'>
        <div className='hidden lg:flex gap-8'>
        <NavigationMenuItem>
          <Link to="/shop">Shop</Link></NavigationMenuItem>
          
        <NavigationMenuItem className='relative'>
            <NavigationMenuTrigger className='-mt-1'>
            Product Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ListItem>hello</ListItem>
                 {/* <hr /> */}
                <ListItem>world</ListItem>
            </NavigationMenuContent>
        </NavigationMenuItem>

          <NavigationMenuItem><Link to={'/blogs'}>Blogs</Link></NavigationMenuItem>
          <NavigationMenuItem><Link to="/contact">Contact</Link></NavigationMenuItem>
        </div>

        {/* Icons */}
        <div className='flex gap-4'>
          <Search className='hidden sm:flex'/>
          <Heart />
          <User className='hidden sm:flex'/>
          <ShoppingCart />
        </div>
      </div>
    </NavigationMenu>
  )
}

export default ShadcnHeader;
