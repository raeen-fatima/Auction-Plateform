import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">Auction Platform</h2>
          <p className="text-gray-400 mt-2">
            Buy & sell products with real-time bidding. Secure & transparent!
          </p>
        </div>

        {/* Column 2: Useful Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
            <li><a href="/auctions" className="text-gray-400 hover:text-white transition">Live Auctions</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
            <li><a href="/PrivacyPolice" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="mt-4 flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition text-2xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition text-2xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Auction Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
