import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const reasons = [

  { title: "Secure & Transparent", description: "Our platform ensures security and transparency, giving you peace of mind in every transaction." },
  { title: "Seamless Bidding Experience", description: "Enjoy a hassle-free bidding process with an intuitive user interface and real-time updates." },
  { title: "Diverse Listings", description: "From real estate to machinery, we offer a wide range of auction listings to fit your needs." },

];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mt-2 mb-10">
          Experience excellence with our trusted auction platform.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 shadow-md rounded-lg flex items-start space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <FaCheckCircle className="text-primary text-3xl" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{reason.title}</h3>
                <p className="text-gray-600 mt-2">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;