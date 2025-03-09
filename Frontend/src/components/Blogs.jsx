import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "How to Win Online Auctions?",
    excerpt: "Learn expert strategies to increase your chances of winning online auctions.",
    image: "https://s3-us-east-2.amazonaws.com/website-tips-tutorials/WP+Media+Folder+-+Website+Tips+and+Tutorials/wp-content/uploads/2019/07/auction-website-how-to-build-create-wordpress-woocommerce-bluehost-696x522.png",
    date: "Feb 20, 2025",
    readMore: "https://www.auctionnews.com/tips-to-win-auctions"
  },
  {
    id: 2,
    title: "Top 5 Gadgets to Buy in 2025",
    excerpt: "A list of the best upcoming gadgets you can grab at amazing prices in auctions.",
    image: "https://tse3.mm.bing.net/th?id=OIP.jD4qomawq1CnqChzqGlzXwHaEE&pid=Api&P=0&h=180",
    date: "Feb 15, 2025",
    readMore: "https://www.technews.com/top-5-gadgets-2025"
  },
  {
    id: 3,
    title: "Bidding War: Tips & Tricks",
    excerpt: "Don't get caught in a bidding war! Learn how to bid smartly and save money.",
    image: "https://tse1.mm.bing.net/th?id=OIP.QShE3t_BYwfUQ9HQt8kRdgHaFP&pid=Api&P=0&h=180",
    date: "Feb 10, 2025",
    readMore: "https://www.bidstrategies.com/bidding-war-tips"
  }
];

const Blogs = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl text-primary text-center font-extrabold font-playfair mb-8">Our Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            className="border rounded-lg bg-white shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-3">{blog.excerpt}</p>
              <span className="text-sm text-gray-500 block mb-2">{blog.date}</span>
              <a 
                href={blog.readMore} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline font-semibold"
              >
                Read More →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
