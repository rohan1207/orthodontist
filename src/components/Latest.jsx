import React, { useState } from "react";

const categories = [
  "Everything",
  "Treatments",
  "Smile Design",
  "Kids",
  "Adults",
  "Technology",
  "Care Tips",
  "Clinic News",
];

const latestBlogs = [
  {
    title: "Clear Aligners: The Future of Orthodontics",
    description: "Explore how invisible aligners are changing smiles for adults and teens.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    category: "Treatments",
  },
  {
    title: "Braces for Kids: What Parents Should Know",
    description: "A parent's guide to early orthodontic care and gentle treatments.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    category: "Kids",
  },
  {
    title: "Smile Makeover: Digital Smile Design",
    description: "How technology helps us plan and perfect your new smile.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    category: "Smile Design",
  },
  {
    title: "Adult Braces: Luxury Meets Discretion",
    description: "Premium options for adults seeking a confident, discreet transformation.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    category: "Adults",
  },
  {
    title: "Clinic News: New 3D Scanner Arrives",
    description: "Our latest tech investment for more comfortable, precise care.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    category: "Clinic News",
  },
  {
    title: "Care Tips: Keeping Your Aligners Clean",
    description: "Simple daily habits for a healthy, beautiful smile.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    category: "Care Tips",
  },
  {
    title: "Technology: AI in Orthodontic Planning",
    description: "How artificial intelligence is improving treatment outcomes.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    category: "Technology",
  },
  {
    title: "Treatments: Fast-Track Braces",
    description: "Discover our accelerated options for busy professionals.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    category: "Treatments",
  },
];

const Latest = () => {
  const [selectedCategory, setSelectedCategory] = useState("Everything");

  const filteredBlogs =
    selectedCategory === "Everything"
      ? latestBlogs
      : latestBlogs.filter((blog) => blog.category === selectedCategory);

  const [visiblePosts, setVisiblePosts] = useState(4);

  const showMore = () => {
    setVisiblePosts(prev => Math.min(prev + 2, filteredBlogs.length));
  };

  return (
    <section className="px-4 md:px-6 py-8 md:py-12 bg-white">
      <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-8 tracking-tight text-gray-900">Latest</h2>
      
      {/* Scrollable category selector for mobile */}
      <div className="relative mb-8 md:mb-10">
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-3 md:gap-4 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisiblePosts(4); // Reset visible posts when category changes
              }}
              className={`flex-shrink-0 px-4 md:px-6 py-2 rounded-full border border-gray-300 text-base md:text-lg font-medium transition-all duration-150 focus:outline-none whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-md border-black"
                  : "bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {filteredBlogs.slice(0, visiblePosts).map((blog, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] ${
              idx === 0 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <div className="relative h-48 md:h-56 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {blog.category}
                </span>
              </div>
            </div>
            <div className="p-4 md:p-5 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2 leading-snug line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm font-light line-clamp-2 md:line-clamp-3">
                {blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {visiblePosts < filteredBlogs.length && (
        <div className="flex justify-center mt-8 md:mt-12">
          <button
            onClick={showMore}
            className="px-8 py-3 border border-black rounded-full text-black hover:bg-black hover:text-white transition-colors duration-300 text-sm md:text-base font-medium"
          >
            View More Articles
          </button>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Latest;
