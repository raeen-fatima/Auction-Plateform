import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3 seconds
    }
  };

  return (
    <section className="py-10 bg-indigo-200 text-center">
      <div className="container mx-auto px-6 md:w-1/2">
        <h2 className="text-3xl font-extrabold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">Stay updated with our latest news and offers.</p>
        <motion.form
          className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-md"
          onSubmit={handleSubmit}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center border rounded-lg overflow-hidden w-full">
            <span className="px-3 text-gray-500"><FaEnvelope /></span>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300"
            whileTap={{ scale: 0.9 }}
          >
            Subscribe
          </motion.button>
        </motion.form>
        {submitted && (
          <motion.p
            className="mt-4 text-primary font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
             Thank you for subscribing!
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default NewsletterForm;
