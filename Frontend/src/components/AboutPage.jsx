import { motion } from "framer-motion";
import { useState } from "react";

// FAQ data
const faqs = [
  { question: "What is our auction platform about?", answer: "We provide a transparent and seamless online auction experience for bidders and companies." },
  { question: "How do I participate in an auction?", answer: "Simply register on our platform, browse available auctions, and place your bids in real-time." },
  { question: "Is my payment secure?", answer: "Yes! We use advanced encryption and secure payment gateways for all transactions." },
  { question: "Can I sell my products here?", answer: "Absolutely! Contact us for more details on listing your items for auction." }
];

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 text-center bg-gray-50 font-playfair">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 max-w-4xl"
      >
        <h2 className="text-5xl font-bold text-gray-800 mb-6">About Us</h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xl text-gray-700 leading-relaxed mb-6"
        >
          Welcome to our auction platform, where transparency and seamless bidding
          come together. We provide a user-friendly experience, ensuring fair and
          hassle-free auctions for everyone.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          With years of expertise in the industry, we have successfully conducted thousands 
          of auctions, connecting buyers and sellers with ease. Our goal is to make the 
          auction process efficient, transparent, and rewarding for all participants.
        </motion.p>
      </motion.div>

      {/* Info Cards Section */}
      <div className="container mx-auto px-6 max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Our Motive */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-teal-500 p-8 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300 ease-in-out"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold mb-4">Our Motive</h3>
          <p className="text-lg">
            We aim to revolutionize the auction industry by ensuring fairness, trust, and convenience for both buyers and sellers.
          </p>
        </motion.div>

        {/* Our Expertise */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 p-8 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300 ease-in-out"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold mb-4">Our Expertise</h3>
          <p className="text-lg">
            With years of experience in the auction industry, we specialize in providing a cutting-edge platform that makes bidding simple, secure, and enjoyable.
          </p>
        </motion.div>

        {/* Auction Services */}
        <motion.div 
          className="bg-gradient-to-r from-green-500 to-teal-500 p-8 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300 ease-in-out"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold mb-4">Auction Services</h3>
          <p className="text-lg">
            We offer a variety of auction services including real estate, automobiles, collectibles, and corporate auctions.
          </p>
        </motion.div>

        {/* Our Values & Vision */}
        <motion.div 
          className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 rounded-xl shadow-lg text-white hover:shadow-xl transition-all duration-300 ease-in-out"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold mb-4">Our Values & Vision</h3>
          <p className="text-lg">
            We believe in integrity, transparency, and customer satisfaction. Our vision is to become the most trusted online auction platform globally.
          </p>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 max-w-3xl mt-16">
        <h3 className="text-3xl font-bold text-black mb-6">FAQs</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-semibold text-gray-800">{faq.question}</h4>
                <span className="text-2xl text-gray-500">{activeIndex === index ? "-" : "+"}</span>
              </div>
              {activeIndex === index && <p className="mt-4 text-gray-600">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
