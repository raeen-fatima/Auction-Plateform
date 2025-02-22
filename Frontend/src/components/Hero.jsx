import { motion } from "framer-motion";
// import bg from "../../public/cool-background.svg"

export default function HeroSection() {
  return (
    <div className="mt-14">

    <section className="relative h-[70vh] flex flex-col items-center justify-center text-center text-black  p-4 bg-cover bg-center"
    style={{ backgroundImage: "url('/cool-background.svg')" }}>
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-3xl font-bold drop-shadow-lg"
      >
        Welcome to the Future of Auctions
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5, duration: 1 }}
        className="text-md mt-4 max-w-xl"
      >
        Discover, Bid, and Win Exclusive Items with Real-time Bidding Experience.
      </motion.p>
      
      <motion.a 
        href="liveAuction" 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        className="mt-6 bg-white text-indigo-600 px-4 py-2 rounded-full text-md font-semibold shadow-lg hover:bg-gray-200"
      >
        Start Bidding
      </motion.a>
    </section>
    </div>

  );
}
