import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mostReadBlogs = [
  {
    title: "Top 5 Orthodontic Myths Debunked",
    description: "Get the facts behind common misconceptions about braces and aligners.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "How to Care for Your Braces: Expert Tips",
    description: "Simple daily habits to keep your orthodontic appliances clean and effective.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Smile Gallery: Real Patient Transformations",
    description: "See before-and-after results from our premium orthodontic treatments.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Invisible Aligners vs. Traditional Braces",
    description: "Compare the benefits and lifestyle impact of modern orthodontic solutions.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "The Luxury of Personalized Orthodontic Care",
    description: "Discover how our clinic tailors every treatment for a premium experience.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "What to Expect: Your First Orthodontist Visit",
    description: "A step-by-step guide to your initial consultation and assessment.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
];

const MostRead = () => {
  const [visiblePosts, setVisiblePosts] = useState(4);

  const showMore = () => {
    setVisiblePosts(prev => Math.min(prev + 2, mostReadBlogs.length));
  };

  return (
    <section className="px-4 md:px-6 py-8 md:py-12 bg-white">
      <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-10 tracking-tight text-gray-900 px-2">Most Read</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
        <AnimatePresence>
          {mostReadBlogs.slice(0, visiblePosts).map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2 leading-snug line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm font-light line-clamp-2 md:line-clamp-3">
                  {blog.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {visiblePosts < mostReadBlogs.length && (
        <div className="flex justify-center mt-8 md:mt-12">
          <button
            onClick={showMore}
            className="px-8 py-3 border border-black rounded-full text-black hover:bg-black hover:text-white transition-colors duration-300 text-sm md:text-base font-medium"
          >
            View More Articles
          </button>
        </div>
      )}
    </section>
  );
};

export default MostRead;
