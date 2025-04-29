import { FaUserPlus, FaGavel, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Register & Login",
    description: "Create your free account to start bidding.",
    icon: <FaUserPlus className="text-5xl text-primary" />,
  },
  {
    id: 2,
    title: "Place Your Bid",
    description: "Bid on your favorite items in live auctions.",
    icon: <FaGavel className="text-5xl text-primary" />,
  },
  {
    id: 3,
    title: "Win & Checkout",
    description: "If you win, complete the payment & get your item.",
    icon: <FaShoppingCart className="text-5xl text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 mt-5  bg-slate-50 text-center">
      <div className="container mx-auto">
        <h2 className="text-5xl text-primary font-extrabold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 px-6">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.id * 0.2 }}
              className="p-6 bg-white border rounded-lg shadow-lg flex flex-col items-center"
            >
              {step.icon}
              <h3 className="text-xl font-semibold my-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
