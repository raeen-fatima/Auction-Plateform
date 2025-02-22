import { FaGavel } from "react-icons/fa";
import { motion } from "framer-motion";

const auctions = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description: "128GB, Space Black, Brand New",
    image: "https://tse1.mm.bing.net/th?id=OIP.vNpR-4DYMRCXEEpfrAzLXwHaE8&pid=Api&P=0&w=300&h=300",
    currentBid: "$900",
  },
  {
    id: 2,
    name: "Gaming Laptop",
    description: "RTX 3070, 16GB RAM, 1TB SSD",
    image: "https://tse1.mm.bing.net/th?id=OIP.vNpR-4DYMRCXEEpfrAzLXwHaE8&pid=Api&P=0&w=300&h=300",
    currentBid: "$1200",
  },
  {
    id: 3,
    name: "Luxury Watch",
    description: "Rolex Submariner, Stainless Steel",
    image: "https://tse1.mm.bing.net/th?id=OIP.vNpR-4DYMRCXEEpfrAzLXwHaE8&pid=Api&P=0&w=300&h=300",
    currentBid: "$500",
  },
];

const AuctionList = () => {
  return (
    <section className="py-10 bg-white min-h-screen">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Live Auctions</h2>
        <div className="grid md:grid-cols-3 gap-6 px-4">
          {auctions.map((item) => (
            <motion.div
              key={item.id}
              className="bg-primary p-4 shadow-lg rounded-lg hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl text-white font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-200 text-sm mb-2">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-300 text-lg font-semibold">{item.currentBid}</p>
                <motion.button
                  className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-md hover:bg-slate-100 transition"
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGavel className="text-lg" /> Place Bid
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-6">
          <a
            href="/liveAuction"
            className="px-6 py-3 bg-primary text-white hover:bg-blue-950 hover:text-white rounded-lg transition duration-300"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
};

export default AuctionList;
