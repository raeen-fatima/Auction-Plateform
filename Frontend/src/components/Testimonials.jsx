import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const testimonials = [
  {
    name: "Amit Sharma",
    review: "This platform made bidding so easy and transparent. Highly recommended!",
    image: "https://tse2.mm.bing.net/th?id=OIP.H9UYen-_zre2XDocB14GZQHaEK&pid=Api&P=0&h=180",
  },
  {
    name: "Priya Verma",
    review: "Amazing experience! The auction process was smooth and hassle-free.",
    image: "https://tse4.mm.bing.net/th?id=OIP.A5rbQInLYsk9WRWsSvVG4wHaLH&pid=Api&P=0&h=180",
  },
  {
    name: "Rahul Mehta",
    review: "Very professional service with great customer support. 5 stars!",
    image: "https://tse1.mm.bing.net/th?id=OIP.zAt6ZkO3ESiFNziEKh8LygHaHa&pid=Api&P=0&h=180",
  },
  {
    name: "Sneha Kapoor",
    review: "I love how simple and intuitive the platform is. Great work!",
    image: "https://tse3.mm.bing.net/th?id=OIP.CKeltWTDiPf4nNU3uHaxdQHaJ3&pid=Api&P=0&h=180",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
        <p className="text-lg text-gray-600 mb-10">Real feedback from our happy clients</p>
        
        <Carousel
          showArrows={false}
          infiniteLoop
          autoPlay
          interval={4000}
          showThumbs={false}
          showStatus={false}
          className="max-w-4xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-primary shadow-md rounded-lg flex flex-col md:flex-row items-center md:items-start text-left gap-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full rounded-full object-cover border-4 border-gray-300"
                />
              </div>
              <div className="flex flex-col max-w-lg">
                <p className="text-lg text-gray-700 italic bg-gray-100 p-4 rounded-lg relative before:content-['\201C'] before:text-5xl before:absolute before:-top-4 before:left-2 before:text-gray-400">
                  {testimonial.review}
                </p>
                <h4 className="mt-4 text-xl font-semibold text-white">- {testimonial.name}</h4>
              </div>
            </motion.div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
