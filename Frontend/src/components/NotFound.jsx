import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-100 via-black to-gray-200 px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 max-w-xl text-center shadow-2xl border border-white/20">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }} 
          className="text-6xl font-extrabold text-orange-400 drop-shadow-sm"
        >
          404
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.6 }} 
          className="text-xl mt-4 text-white opacity-90"
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8"
        >
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-orange-200 hover:bg-orange-400 text-black rounded-full font-semibold shadow-lg transition-all duration-300"
          >
            🔙 Go to Homepage
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
