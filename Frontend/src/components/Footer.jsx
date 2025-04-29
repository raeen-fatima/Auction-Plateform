import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6 border-t-4 border-primary mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-primary">BidNest</h2>
          <p className="text-sm opacity-80">
            Experience seamless and exciting real-time auctions. Trusted by 1000+ bidders.
          </p>
        </div>

        {/* Main Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-primary">Pages</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/blogs" className="hover:text-primary">Blogs</Link></li>
            <li><Link to="/service" className="hover:text-primary">Service</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>

        {/* User Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-primary">User Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/signIn" className="hover:text-primary">Sign In</Link></li>
            <li><Link to="/signUp" className="hover:text-primary">Sign Up</Link></li>
            <li><Link to="/mybids" className="hover:text-primary">My Bids</Link></li>
            <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/productForm" className="hover:text-primary">Sell Product</Link></li>
          </ul>
        </div>

        {/* Legal & Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-primary">Support & Legal</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/PrivacyPolicy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/pay" className="hover:text-primary">Payments</Link></li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-primary"><FaFacebook /></a>
            <a href="#" className="hover:text-primary"><FaInstagram /></a>
            <a href="#" className="hover:text-primary"><FaTwitter /></a>
            <a href="#" className="hover:text-primary"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="text-center text-xs mt-10 opacity-60">
        &copy; {new Date().getFullYear()} BidNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
