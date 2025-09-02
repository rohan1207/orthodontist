import React, { useState } from "react";

const VIEW_OPTIONS = [
  { label: "Flipcard", value: "flipcard" },
  { label: "Magazine", value: "magazine" },
  { label: "Mosaic", value: "mosaic" },
];

const blogs = [
  {
    title: "Invisible Aligners: The Discreet Revolution",
    description: "How clear aligners are changing orthodontics for adults and teens.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Smile Design: Digital Planning for Perfection",
    description: "Explore the technology behind modern smile makeovers.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Braces for Kids: Early Care Matters",
    description: "Why starting orthodontic care early can make a difference.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Luxury Orthodontics: Premium Care Experience",
    description: "Discover the comfort and elegance of high-end orthodontic clinics.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Fast-Track Braces: For Busy Professionals",
    description: "Accelerated treatment options for those on the go.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Care Tips: Keeping Your Braces Clean",
    description: "Simple daily habits for a healthy, beautiful smile.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "AI in Orthodontics: Smarter Planning",
    description: "How artificial intelligence is improving treatment outcomes.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Clinic News: New 3D Scanner Arrives",
    description: "Our latest tech investment for more comfortable, precise care.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Adult Braces: Luxury Meets Discretion",
    description: "Premium options for adults seeking a confident, discreet transformation.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Smile Gallery: Real Patient Transformations",
    description: "See before-and-after results from our premium orthodontic treatments.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
  },
];

function FlipcardView({ blogs }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
      {blogs.map((blog, idx) => (
        <div key={idx} className="relative group perspective">
          <div className="w-full h-80 transition-transform duration-500 group-hover:rotate-y-180" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center backface-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
              <h3 className="text-xl font-medium text-black mt-4 mb-2 px-4 text-center">{blog.title}</h3>
            </div>
            <div className="absolute inset-0 bg-black text-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center rotate-y-180 backface-hidden p-6">
              <p className="text-base font-light text-center">{blog.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MagazineView({ blogs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
      {blogs.map((blog, idx) => (
        <div key={idx} className="flex flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-48 h-48 object-cover" />
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-medium text-black mb-2">{blog.title}</h3>
            <p className="text-gray-600 text-base font-light">{blog.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MosaicView({ blogs }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
      {blogs.map((blog, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          <img src={blog.image} alt={blog.title} className="w-full h-32 object-cover" />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="text-lg font-medium text-black mb-1">{blog.title}</h3>
            <p className="text-gray-500 text-xs font-light">{blog.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const BlogPage = () => {
  const [view, setView] = useState("flipcard");

  return (
    <section className="min-h-screen bg-white px-8 py-16" style={{ fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif' }}>
      <h1 className="text-5xl font-light tracking-tight text-black mb-8">Blog</h1>
      <div className="flex flex-row gap-4 mb-10">
        {VIEW_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setView(opt.value)}
            className={`px-6 py-2 rounded-full border border-gray-300 text-lg font-medium transition-all duration-150 focus:outline-none ${
              view === opt.value
                ? "bg-black text-white shadow-md"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {view === "flipcard" && <FlipcardView blogs={blogs} />}
      {view === "magazine" && <MagazineView blogs={blogs} />}
      {view === "mosaic" && <MosaicView blogs={blogs} />}
    </section>
  );
};

export default BlogPage;
