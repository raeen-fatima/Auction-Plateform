import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const stats = [
  { label: "Years of Experience", value: "30+" },
  { label: "Auctions Conducted", value: "12k+" },
  { label: "Companies Onboarded", value: "500+" },
  { label: "Bidder Connections", value: "18k+" },
  { label: "Auction Value", value: "12k Cr" },
];

const brands = [
  "https://flyclipart.com/thumb2/ibm-logo-png-transparent-background-large-876564.png", "https://tse1.mm.bing.net/th?id=OIP.3DbB0C3-LsGSt-xtIonLLQHaEK&pid=Api&P=0&h=180", 'https://tse4.mm.bing.net/th?id=OIP.q147_8-0-KUzdNrCSjVNvQHaHa&pid=Api&P=0&h=180','https://tse4.mm.bing.net/th?id=OIP.Iu-B0F_E_GIgn29ao-y_jgHaEc&pid=Api&P=0&h=180','https://tse4.mm.bing.net/th?id=OIP.EcMWCespHtkMHfd2Vsh3AwHaHa&pid=Api&P=0&h=180','https://tse4.mm.bing.net/th?id=OIP._Duvn7Y3cJp65b9J_zVe9AHaEK&pid=Api&P=0&h=180','https://tse1.mm.bing.net/th?id=OIP.TCxG5sHUhF83uYz5jnsAEgHaEK&pid=Api&P=0&h=180', 'https://tse1.mm.bing.net/th?id=OIP.GG4iv002Nu6h9wg9AELDPQHaFj&pid=Api&P=0&h=180','https://tse2.mm.bing.net/th?id=OIP.GltgzDUQ1Ze93aVcOv74CQHaCw&pid=Api&P=0&h=180','https://tse4.mm.bing.net/th?id=OIP.BhyAEwVYYZMU-fx-7PGljQHaE8&pid=Api&P=0&h=180'
  ];

const Portfolio = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-800">Our Portfolio</h2>
        <p className="text-lg text-gray-600 mt-3 mb-12">
          Proven Expertise Across Industries — Explore Our Success Stories
        </p>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center mb-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-primary p-6 shadow-lg rounded-xl"
              whileHover={{ scale: 1.07 }}
            >
              <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-400 text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Clients Section with Carousel */}
        <h3 className="text-4xl font-bold text-gray-800 mb-8">Our Valued Clients</h3>
        <p className="text-lg text-gray-600 mb-12">
          Building Long-Lasting Partnerships
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Carousel 
            showArrows={false} 
            infiniteLoop 
            autoPlay 
            interval={2500} 
            showThumbs={false} 
            showStatus={false}
          >
            {[...Array(Math.ceil(brands.length / 6))].map((_, i) => (
              <div key={i} className="flex justify-center items-center gap-10">
                {brands.slice(i * 6, i * 6 + 6).map((logo, index) => (
                  <img 
                    key={index} 
                    src={logo} 
                    alt={`Brand Logo ${index + 1}`} 
                    className="w-24 h-24 object-contain transition-transform duration-300 hover:scale-110"
                  />
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