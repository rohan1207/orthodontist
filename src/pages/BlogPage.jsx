import React, { useState } from "react";
import { FiGrid, FiBookOpen, FiLayers, FiSearch } from "react-icons/fi";

// Image component with fallback to ensure broken URLs don't leave empty tiles
const SafeImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const fallback = "https://placehold.co/1200x800?text=Orthodontics";
  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
      className={className}
    />
  );
};

const blogPosts = [
  {
    title: "The Art of the Perfect Smile: A Guide to Cosmetic Orthodontics",
    description: "Discover how modern orthodontics blends science and artistry to create stunning, natural-looking smiles.",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
    category: "Cosmetic",
  },
  {
    title: "Invisible Aligners: Your Discreet Path to Straight Teeth",
    description: "Learn about the benefits of clear aligners, the nearly invisible way to improve your smile without traditional braces.",
    image: "https://placehold.co/1200x800?text=Invisible+Aligners",
    category: "Technology",
  },
  {
    title: "Orthodontics for Adults: It's Never Too Late for a Great Smile",
    description: "It's a common myth that braces are just for teens. Explore the advanced, subtle options available for adults.",
    image: "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&w=800&q=80",
    category: "Adults",
  },
  {
    title: "Caring for Your Braces: Tips for a Healthy Treatment Journey",
    description: "Maximize your treatment results with these essential tips for oral hygiene and brace care.",
    image: "https://placehold.co/1200x800?text=Braces+Care",
    category: "Care Tips",
  },
  {
    title: "The Role of Retainers: Protecting Your Investment",
    description: "Your orthodontic journey doesn't end when the braces come off. Understand the vital role of retainers.",
    image: "https://placehold.co/1200x800?text=Retainers",
    category: "Post-Treatment",
  },
  {
    title: "Early Orthodontic Treatment: A Foundation for Lifelong Health",
    description: "Learn why an early orthodontic evaluation for your child can prevent more significant problems later on.",
    image: "https://placehold.co/1200x800?text=Kids+Orthodontics",
    category: "Kids",
  },
  {
    title: "Digital Smile Design: Visualizing Your Future Smile",
    description: "Step into the future with Digital Smile Design, where you can see your new smile before treatment even begins.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
    category: "Technology",
  },
  {
    title: "Beyond Aesthetics: The Health Benefits of Straight Teeth",
    description: "A straight smile is more than just beautiful—it contributes to better oral and overall health. Here's how.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    category: "Health",
  },
  {
    title: "Choosing Your Orthodontist: A Premium Experience Matters",
    description: "What to look for in an orthodontic practice to ensure you receive the highest standard of care and luxury.",
    image: "https://placehold.co/1200x800?text=Orthodontist+Clinic",
    category: "Expertise",
  },
  {
    title: "The Lifecycle of a Smile: Orthodontics at Every Age",
    description: "From childhood to retirement, explore how orthodontic needs and treatments evolve throughout life.",
    image: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
  },
];

const ViewSwitcher = ({ view, setView }) => {
  const options = [
    { id: "magazine", label: "Magazine", icon: FiBookOpen },
    { id: "mosaic", label: "Mosaic", icon: FiGrid },
    { id: "flipcard", label: "Flipcard", icon: FiLayers },
  ];

  return (
    <div className="-mx-6 px-6">
      <div className="flex justify-start sm:justify-center items-center border border-gray-200 p-1 rounded-full mb-12 overflow-x-auto whitespace-nowrap no-scrollbar gap-1">
        {options.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none ${
              view === id
                ? "bg-black text-white shadow-md"
                : "bg-transparent text-gray-600 hover:text-black"
            }`}
            aria-pressed={view === id}
          >
            <Icon className="text-base sm:text-lg" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const MagazineView = ({ posts }) => (
  <div className="space-y-12 sm:space-y-16">
    {posts.map((post, idx) => (
      <div key={idx} className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
        <div className={`relative overflow-hidden rounded-lg shadow-xl ${idx % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
          <div className="w-full h-56 sm:h-72 md:h-full">
            <SafeImage
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
        <div className={idx % 2 === 0 ? "md:order-2" : "md:order-1"}>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{post.category}</span>
          <h3 className="text-2xl sm:text-3xl font-medium text-gray-900 mt-2 mb-3 sm:mb-4 leading-tight">{post.title}</h3>
          <p className="text-gray-600 text-sm sm:text-base font-light mb-5 sm:mb-6">{post.description}</p>
          <a href="#" className="font-semibold text-black hover:underline">Read More &rarr;</a>
        </div>
      </div>
    ))}
  </div>
);

const MosaicView = ({ posts }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 [grid-auto-rows:120px] sm:[grid-auto-rows:140px] md:[grid-auto-rows:180px] lg:[grid-auto-rows:200px]">
    {posts.map((post, idx) => {
      const isFeature = idx === 0 || idx === 5;
      const span = isFeature
        ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
        : "";
      return (
        <div key={idx} className={`relative rounded-lg shadow-lg overflow-hidden group ${span}`}>
          <SafeImage
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
          </div>
        </div>
      );
    })}
  </div>
);

const FlipcardView = ({ posts }) => {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 [perspective:1000px]">
      {posts.map((post, idx) => (
        <div
          key={idx}
          className="relative w-full h-80 sm:h-96 group cursor-pointer select-none"
          onClick={() => toggleFlip(idx)}
          role="button"
          aria-pressed={!!flipped[idx]}
        >
          <div
            className={`absolute w-full h-full transition-transform duration-700 [transform-style:preserve-3d] will-change-transform group-hover:[transform:rotateY(180deg)] ${
              flipped[idx] ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* Front */}
            <div className="absolute w-full h-full [backface-visibility:hidden]">
              <SafeImage
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg" />
              <h3 className="absolute bottom-4 left-4 text-lg sm:text-xl font-semibold text-white p-2 bg-black/50 rounded">
                {post.title}
              </h3>
            </div>
            {/* Back */}
            <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-800 text-white p-5 sm:p-6 rounded-lg shadow-xl flex flex-col justify-center items-center">
              <span className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">{post.category}</span>
              <h3 className="text-xl sm:text-2xl font-medium text-center my-2">{post.title}</h3>
              <p className="text-gray-300 text-center text-sm sm:text-base font-light">{post.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const BlogPage = () => {
  const [view, setView] = useState("magazine");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderView = () => {
    if (filteredPosts.length === 0) {
      return <p className="text-center text-gray-500">No articles found.</p>;
    }
    switch (view) {
      case "mosaic":
        return <MosaicView posts={filteredPosts} />;
      case "flipcard":
        return <FlipcardView posts={filteredPosts} />;
      case "magazine":
      default:
        return <MagazineView posts={filteredPosts} />;
    }
  };

  return (
    <section className="px-6 py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 mt-4 sm:mt-0">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tighter text-gray-900">Our Blog</h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Expert insights, tips, and the latest news in modern orthodontics.
          </p>
        </div>

        <div className="relative w-full max-w-lg mx-auto mb-10 sm:mb-12">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 pr-12 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          <FiSearch className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-400" />
        </div>

        <ViewSwitcher view={view} setView={setView} />
        <div>{renderView()}</div>
      </div>
    </section>
  );
};

export default BlogPage;
