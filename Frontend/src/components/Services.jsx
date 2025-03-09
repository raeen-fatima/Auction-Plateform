import { FaGavel, FaUserCheck, FaHeadset, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Live Auctions",
      description: "Bid on high-quality products in real-time with secure transactions.",
      icon: <FaGavel className="text-4xl text-white" />,
    },
    {
      id: 2,
      title: "Verified Sellers",
      description: "Buy from trusted sellers with verified profiles for a safe experience.",
      icon: <FaUserCheck className="text-4xl text-white" />,
    },
    {
      id: 3,
      title: "24/7 Support",
      description: "Our customer support is available 24/7 to assist you with queries.",
      icon: <FaHeadset className="text-4xl text-white" />,
    },
    {
      id: 4,
      title: "Secure Payments",
      description: "Multiple payment options with end-to-end encryption for safety.",
      icon: <FaLock className="text-4xl text-white" />,
    },
  ];

  return (
    <div className="container m-10 mx-auto p-6 text-center">
      <h2 className="text-4xl font-extrabold mb-6 text-primary">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="p-6 border rounded-lg shadow-lg bg-primary flex flex-col items-center"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
            <h3 className="text-xl text-white font-semibold mt-3">{service.title}</h3>
            <p className="text-gray-300 mt-2">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
