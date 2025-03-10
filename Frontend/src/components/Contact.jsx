import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        {/* Contact Form & Location */}
        <div className="container mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 max-w-4xl"
          >
            <h2 className="text-5xl text-center font-bold text-gray-800 ">Contact Us</h2>
            
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 border rounded-lg shadow-lg bg-white flex items-center space-x-4">
                <FaPhoneAlt className="text-primary text-3xl" />
                <div>
                  <h4 className="font-semibold">To Know More</h4>
                  <p className="text-gray-600">+91-737 621 4321</p>
                  <p className="text-gray-600">+91-737 621 4321</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg shadow-lg bg-white flex items-center space-x-4 ">
                <FaEnvelope className="text-primary text-3xl" />
                <div>
                  <h4 className="font-semibold">Email Now</h4>
                  <p className="text-gray-600">info@example.com</p>
                  <p className="text-gray-600">example@example.com</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg shadow-lg bg-white flex items-center space-x-4">
                <FaMapMarkerAlt className="text-primary text-3xl" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600">Sector 18, Noida</p>
                  <p className="text-gray-600">Uttar Pradesh, India</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="p-6 bg-blue-50 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Name*" className="w-full p-3 border rounded" required />
                <input type="text" placeholder="Phone" className="w-full p-3 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded" required />
                <textarea placeholder="Write Your Message*" className="w-full p-3 border rounded h-24" required></textarea>
                <motion.button
                  className="w-40 bg-primary text-white py-2 rounded-lg hover:bg-blue-950 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Now
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <iframe
              className="w-full h-72 rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d224356.85923002096!2d77.23700944947541!3d28.52240403742143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1740588861369!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
