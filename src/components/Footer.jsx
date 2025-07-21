
import { Separator } from '@radix-ui/react-separator';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const SUPPORT_LINKS = ["About Us", "Terms & Conditions", "Privacy Policy"];
const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-red-500 py-8 border-t border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6">
        {/* Left section */}
        <div className="text-left">
          <h3 className="text-lg font-bold">Hawa Store</h3>
          <p className="mt-4 mb-2 font-semibold">Follow Us On:</p>
          <div className="flex justify-start space-x-4 text-xl">
            <a href="https://www.instagram.com/hawastore404" target='_blank'> <Instagram className="cursor-pointer hover:text-gray-500" /></a>
            <a href="https://www.facebook.com/hawastore" target='_blank'> <Facebook className="cursor-pointer hover:text-gray-500" /></a>
            <a href="https://www.youtube.com/@hawastore" target='_blank'> <Youtube className="cursor-pointer hover:text-gray-500" /></a>

          </div>
        </div>

        {/* Support Links */}
        <div className="mt-8 md:mt-0 text-left">
          <h4 className="font-semibold">Support</h4>
          <ul className="space-y-2 mt-4">
            {SUPPORT_LINKS.map((link, index) => (
              <li key={index} className="font-normal">
                <a href="/about-us" className="text-gray-600 hover:text-gray-800">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="mt-8 md:mt-0 text-left">
          <h4 className="font-semibold">Get In Touch</h4>
          <ul className="space-y-2 mt-4">
            <li className="font-normal">
          <address className="not-italic mt-4 text-gray-600">
            Chabahil Chowk, Tyanglaphat, Kritipur.
          </address>
            </li>
            <li className="font-normal text-gray-600 hover:text-gray-800">
          <a href="tel:+977 9823207881" className='mt-6'>Call/WhatsApp : +977 9823207881</a></li>
          <li className="font-normal text-gray-600 hover:text-gray-800">
          <a href="mainto:hawastore404@gmail.com" className='mt-6'>hawastore404@gmail.com</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center">
        <div className="text-gray-600">
          &copy; {currentYear} Hawa Store. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
