import React from 'react';
import { Home, Search, Grid } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchButton from './SearchButton';

function MobileFooter() {
  const navigate = useNavigate()
  return (
    <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="container mx-auto flex justify-around py-2">
        
        {/* Shop Button */}
        <Link className="flex flex-col items-center" to="/">
          <Home className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600">Shop</span>
        </Link>
        
        {/* Search Button */}
        {/* <Link className="flex flex-col items-center" to="/categories">
          <Search className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600">Search</span>
        </Link> */}

        <div className="flex flex-col items-center">
          <SearchButton />
          <span className="text-xs text-gray-600">Search</span>
        </div>

        {/* Categories Button */}
        <Link className="flex flex-col items-center" to="/categories">
          <Grid className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600">Categories</span>
        </Link>
        
      </div>
    </div>
  );
}

export default MobileFooter;
