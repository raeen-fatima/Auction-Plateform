import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="mt-14">
      <section 
        className="relative h-screen flex flex-col items-center justify-center text-center text-white p-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/auction.jpg')" }}
      >
        {/* Glassmorphism container */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-lg flex flex-col items-center justify-center px-6 py-8 rounded-xl shadow-xl space-y-6">
          {/* Main Heading with modern gradient text and shadow */}
          <motion.h1 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-600 drop-shadow-2xl"
          >
            Welcome to the Future of Auctions
          </motion.h1>
          
          {/* Subheading with opacity adjustment for better contrast */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 1 }}
            className="text-md mt-4 max-w-3xl text-white opacity-90"
          >
            Discover, Bid, and Win Exclusive Items with Real-time Bidding Experience.
          </motion.p>

          {/* Button Container with Flex layout */}
          <div className="flex flex-row space-x-6">
            {/* Start Bidding Button */}
            <motion.a 
              href="products" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-black text-orange-100 px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:bg-orange-100 hover:text-black transition-all duration-300"
            >
              Start Bidding
            </motion.a>
            
            {/* Support Button */}
            <motion.a 
              href="contact" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white px-8 py-3 rounded-full text-lg font-semibold border-2 border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Need Help?
            </motion.a>
          </div>
          
          {/* Optional: Add a secondary call-to-action button */}
          <motion.a 
            href="blogs" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="mt-6 text-white text-md font-semibold underline hover:text-orange-100 transition-all duration-300"
          >
            Explore More
          </motion.a>
        </div>
      </section>
    </div>
  );
}
