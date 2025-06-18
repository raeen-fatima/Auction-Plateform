import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-blue-900 px-4">
      <div className="bg-white/60 backdrop-blur-xl border border-primary/50 rounded-3xl p-10 max-w-xl text-center shadow-2xl">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-7xl font-extrabold text-primary drop-shadow-lg"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg mt-6 text-black"
        >
          Sorry, the page you're trying to access doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-100 text-primary hover:bg-primary hover:text-white font-bold rounded-full transition-all duration-300 shadow-md"
          >
              Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;
