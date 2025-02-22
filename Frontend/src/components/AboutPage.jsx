import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  { question: "What is our auction platform about?", answer: "We provide a transparent and seamless online auction experience for bidders and companies." },
  { question: "How do I participate in an auction?", answer: "Simply register on our platform, browse available auctions, and place your bids in real-time." },
  { question: "Is my payment secure?", answer: "Yes! We use advanced encryption and secure payment gateways for all transactions." },
  { question: "Can I sell my products here?", answer: "Absolutely! Contact us for more details on listing your items for auction." }
];

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20  text-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 max-w-4xl"
      >
        <h2 className="text-5xl font-bold text-gray-800 mb-8">About Us</h2>
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
      
      <div className="container mx-auto px-6 max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Our Motive */}
        <motion.div className="bg-primary p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3 className="text-3xl font-bold text-white mb-4">Our Motive</h3>
          <p className="text-lg text-gray-400">We aim to revolutionize the auction industry by ensuring fairness, trust, and convenience for both buyers and sellers.</p>
        </motion.div>

        {/* Our Expertise */}
        <motion.div className="bg-primary p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3 className="text-3xl font-bold text-white mb-4">Our Expertise</h3>
          <p className="text-lg text-gray-400">With years of experience in the auction industry, we specialize in providing a cutting-edge platform that makes bidding simple, secure, and enjoyable.</p>
        </motion.div>

        {/* Auction Services */}
        <motion.div className="bg-primary p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3 className="text-3xl font-bold text-white mb-4">Auction Services</h3>
          <p className="text-lg text-gray-400">We offer a variety of auction services including real estate, automobiles, collectibles, and corporate auctions.</p>
        </motion.div>

        {/* Our Values & Vision */}
        <motion.div className="bg-primary p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3 className="text-3xl font-bold text-white mb-4">Our Values & Vision</h3>
          <p className="text-lg text-gray-400">We believe in integrity, transparency, and customer satisfaction. Our vision is to become the most trusted online auction platform globally.</p>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 max-w-3xl mt-16">
        <h3 className="text-3xl font-bold text-black mb-6">FAQs</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="bg-primary p-4 rounded-lg shadow-md cursor-pointer"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-white">{faq.question}</h4>
                <span className="text-xl">{activeIndex === index ? "-" : "+"}</span>
              </div>
              {activeIndex === index && <p className="mt-2 text-gray-300">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form & Location */}
      <div className="container mx-auto px-6 max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div className="bg-white p-6 rounded-lg shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
            <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
            <textarea placeholder="Your Message" rows="4" className="w-full p-3 border rounded-lg"></textarea>
            <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700">Send Message</button>
          </form>
        </motion.div>
        <motion.div className="rounded-lg overflow-hidden shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3 className="text-4xl font-bold text-black mb-6">Our Location</h3>
          <iframe 
            className="w-full h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353159049!3d-37.81627974202153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1df54ff%3A0xa0f3c7b5d9fdf4d!2sVictoria!5e0!3m2!1sen!2sus!4v1639624864146!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
