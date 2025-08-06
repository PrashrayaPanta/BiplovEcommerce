import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    return (
      <footer className="py-10 mt-16 mx-4 bg-red-500">
        <div className="max-w-6xl mx-auto flex gap-8 justify-between flex-wrap">
          {/* Logo & Social Media */}
          <div>
            <img src="https://placehold.co/400" alt="Hawa Store Logo" className="w-16 h-16" />
            <h2 className="text-2xl font-bold text-[#3c07ff] mt-2">Hawa Store</h2>
            <p className="text-gray-600 mt-6 font-bold">Social Medias</p>
            <div className="flex gap-4 mt-2">
              <Facebook />
              <Instagram />
              <Youtube />
            </div>
          </div>
  
  <div className="flex flex-row gap-28">
          {/* Shop */}
          <div>
            <h3 className="font-bold text-gray-800">SHOP</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li><a href="#">Products</a></li>
              <li><a href="#">Overview</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Releases</a></li>
            </ul>
          </div>
  
          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-800">COMPANY</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          </div>
  
          {/* Newsletter */}
          <div className="text-center  mx-auto md:mx-0">
            <h3 className="font-bold text-gray-800">STAY UP TO DATE</h3>
            <div className="flex  mt-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-[#444444] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
  
        {/* Bottom Links */}
        <div className="max-w-6xl mx-auto mt-8 border-t pt-4 flex justify-end gap-6 text-gray-500 text-sm px-6">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  