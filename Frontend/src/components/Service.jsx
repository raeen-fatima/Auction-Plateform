import { motion } from "framer-motion";
import { FaHammer, FaGavel, FaShieldAlt, FaSearchDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Services() {
  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-10 py-16 px-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Auction Services</h2>
        <p className="text-lg text-gray-600">
          Explore our top-notch services designed for a seamless and transparent auction experience.
        </p>
      </motion.div>

      {/* Services Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Service 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
        >
          <div className="bg-primary p-6 text-white flex justify-center items-center">
            <FaHammer className="text-5xl" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Seamless Bidding</h3>
            <p className="text-gray-600 mt-2">
              Participate in smooth, transparent, and secure bidding with our real-time bidding platform.
            </p>
          </div>
        </motion.div>

        {/* Service 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
        >
          <div className="bg-primary p-6 text-white flex justify-center items-center">
            <FaGavel className="text-5xl" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Real-time Bidding</h3>
            <p className="text-gray-600 mt-2">
              Stay up-to-date with real-time auction data, including live bidding and price updates.
            </p>
          </div>
        </motion.div>

        {/* Service 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
        >
          <div className="bg-primary p-6 text-white flex justify-center items-center">
            <FaShieldAlt className="text-5xl" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Secure Transactions</h3>
            <p className="text-gray-600 mt-2">
              Rest assured knowing your transactions are securely processed with advanced encryption.
            </p>
          </div>
        </motion.div>

        {/* Service 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
        >
          <div className="bg-primary p-6 text-white flex justify-center items-center">
            <FaSearchDollar className="text-5xl" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800">Advanced Search</h3>
            <p className="text-gray-600 mt-2">
              Utilize advanced search filters to find the perfect auction item that meets your needs.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center mt-16"
      >
        <Link 
          to="/liveAuction"
          className="bg-primary text-white px-8 py-3 rounded-lg text-xl hover:bg-blue-900 transition-all"
        >
          Explore Auctions
        </Link>
      </motion.div>
      
    </div>
    <Footer />
    </>
  );
}

export default Services;
