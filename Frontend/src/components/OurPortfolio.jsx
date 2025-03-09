import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

const stats = [
  { label: "Years of Experience", value: "30+" },
  { label: "Auctions Conducted", value: "12k+" },
  { label: "Companies Onboarded", value: "500+" },
  { label: "Bidder Connections", value: "18k+" },

];

const brands = [
  "https://tse2.mm.bing.net/th?id=OIP.eRyJzwroH31TFNItq4XkTgHaEK&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.3DbB0C3-LsGSt-xtIonLLQHaEK&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.q147_8-0-KUzdNrCSjVNvQHaHa&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.Iu-B0F_E_GIgn29ao-y_jgHaEc&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.EcMWCespHtkMHfd2Vsh3AwHaHa&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP._Duvn7Y3cJp65b9J_zVe9AHaEK&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.TCxG5sHUhF83uYz5jnsAEgHaEK&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.GG4iv002Nu6h9wg9AELDPQHaFj&pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th?id=OIP.GltgzDUQ1Ze93aVcOv74CQHaCw&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.BhyAEwVYYZMU-fx-7PGljQHaE8&pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th?id=OIP.aeHvnFKyesLUoES72tc1owHaEc&pid=Api&P=0&h=180",
  'https://tse2.mm.bing.net/th?id=OIP.Zp7xGedEdLgbQEN3KxyyYQHaHa&pid=Api&P=0&h=180',
];

const Portfolio = () => {
  const [slidePercentage, setSlidePercentage] = useState(80);

  // Adjust slide percentage based on screen size
  useEffect(() => {
    const updateSlidePercentage = () => {
      setSlidePercentage(window.innerWidth < 768 ? 100 : 80);
    };
    updateSlidePercentage();
    window.addEventListener("resize", updateSlidePercentage);
    return () => window.removeEventListener("resize", updateSlidePercentage);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 ">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary">Our Portfolio</h2>
        <p className="text-lg text-gray-600 mt-3 mb-12">
          Proven Expertise Across Industries — Explore Our Success Stories
        </p>

        {/* Stats Section */}
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-primary p-6 shadow-lg rounded-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.07 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-indigo-200 py-10">
          {/* Clients Section */}
        <h3 className="text-4xl font-extrabold md:text-4xl text-gray-800 mb-8">Our Valued Clients</h3>
        <p className="text-lg text-gray-600  ">Building Long-Lasting Partnerships</p>

        {/* Clients Carousel */}
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          autoPlay
          infiniteLoop
          interval={3000}
          centerMode
          centerSlidePercentage={slidePercentage}
          aria-label="Client Logos Carousel"
        >
          {Array.from({ length: Math.ceil(brands.length / 4) }).map((_, i) => (
            <div key={i} className="flex py-16 justify-center gap-6 flex-wrap">
              {brands.slice(i * 4, i * 4 + 4).map((logo, index) => (
                <motion.div
                  key={index}
                  className="bg-white w-32 h-32 md:w-40 md:h-40 p-4 rounded-xl shadow-lg flex justify-center items-center hover:shadow-2xl transition-transform duration-300 hover:scale-105"
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={logo}
                    alt={`Client logo ${index + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
